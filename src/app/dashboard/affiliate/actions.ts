'use server';

import { getServerSession } from "next-auth";
import { authOptions, prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function requestWithdrawal(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const userId = (session.user as any).id;
    const amount = Number(formData.get("amount"));
    const bankName = formData.get("bankName") as string;
    const accountNo = formData.get("accountNo") as string;
    const accountName = formData.get("accountName") as string;

    if (!amount || amount < 100000) {
      throw new Error("Minimal penarikan adalah Rp 100.000");
    }

    if (!bankName || !accountNo || !accountName) {
      throw new Error("Data rekening tidak lengkap");
    }

    // Verify Balance
    const commissions = await prisma.commission.findMany({
      where: { earnerId: userId }
    });
    const withdrawals = await prisma.withdrawal.findMany({
      where: { agentId: userId }
    });

    const totalEarned = commissions.reduce((sum, c) => sum + Number(c.amount), 0);
    const totalWithdrawn = withdrawals.reduce((sum, w) => sum + Number(w.amount), 0);
    const activeBalance = totalEarned - totalWithdrawn;

    if (amount > activeBalance) {
      throw new Error("Saldo tidak mencukupi");
    }

    // Attempt to call Mayar if API key exists
    let status = "PENDING";
    let mayarRefId = null;
    const mayarApiKey = process.env.MAYAR_API_KEY;

    if (mayarApiKey) {
      try {
        const response = await fetch("https://api.mayar.id/v1/payouts", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${mayarApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            amount: amount,
            bankCode: bankName, // Assuming the UI sends valid bank codes
            accountNumber: accountNo,
            accountName: accountName,
            description: `Penarikan Komisi UBOS - Agent ${userId}`
          })
        });

        const data = await response.json();
        
        if (response.ok && data.status === "SUCCESS") { // Depending on Mayar's actual success criteria
          status = "PROCESSING"; // Usually payouts are processed asynchronously
          mayarRefId = data.id || data.reference_id;
        } else {
          // If Mayar fails, we still record it but mark as PENDING for manual review
          console.error("Mayar Payout Error:", data);
          status = "PENDING"; 
        }
      } catch (mayarErr) {
        console.error("Failed to connect to Mayar API", mayarErr);
        status = "PENDING";
      }
    }

    // Create the record
    await prisma.withdrawal.create({
      data: {
        agentId: userId,
        amount: amount,
        bankName,
        accountNo,
        accountName,
        status,
        mayarRefId
      }
    });

    revalidatePath('/dashboard/affiliate');
    return { success: true, status };

  } catch (error: any) {
    return { success: false, error: error.message || "Gagal memproses penarikan dana" };
  }
}
