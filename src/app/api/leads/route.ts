import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { sendFonnteMessage } from "@/lib/fonnte";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, agentId, targetProduct } = body;

    if (!name || !phone || !agentId) {
      return NextResponse.json(
        { error: "Nama, nomor WA, dan ID Agen wajib diisi" },
        { status: 400 }
      );
    }

    // 1. Simpan Lead ke Database
    const newLead = await prisma.lead.create({
      data: {
        customerName: name,
        whatsappNumber: phone,
        targetProduct: targetProduct || "Konsultasi Promo",
        agentId: agentId,
      },
      include: {
        agent: true,
      }
    });

    // 1.5. Record Analytics
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    
    await prisma.analytic.upsert({
      where: {
        agentId_date: {
          agentId: agentId,
          date: today,
        },
      },
      update: {
        whatsappClicks: {
          increment: 1,
        },
      },
      create: {
        agentId: agentId,
        date: today,
        pageViews: 0,
        whatsappClicks: 1,
      },
    });

    // 2. Format pesan WA untuk Fonnte
    const waMessage = `Halo ${name}, salam kenal! 👋\n\nSaya ${newLead.agent.name}, Health Planner Resmi Coway.\nTerima kasih telah menghubungi kami mengenai ${newLead.targetProduct}.\n\nApakah ada pertanyaan spesifik tentang unit Coway atau ingin cek promo bulan ini? Silakan balas pesan ini ya!`;

    // 3. Kirim Pesan via Fonnte Gateway
    // (Ensure the phone number is correctly formatted for Fonnte, usually starting with 08 or 62)
    let formattedPhone = phone;
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "62" + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith("+62")) {
      formattedPhone = formattedPhone.substring(1);
    }

    const fonnteSuccess = await sendFonnteMessage(formattedPhone, waMessage);

    // 4. Siapkan format URL WhatsApp click-to-chat fallback
    // (in case Fonnte fails or to immediately open the app for the customer to send the first message to the agent)
    let agentWa = newLead.agent.whatsappNumber || "";
    if (agentWa.startsWith("0")) agentWa = "62" + agentWa.substring(1);
    else if (agentWa.startsWith("+62")) agentWa = agentWa.substring(1);
    
    const fallbackMessage = `Halo, saya ${name}. Saya ingin konsultasi mengenai promo pemurni air Coway (${newLead.targetProduct}).`;
    const waLink = `https://wa.me/${agentWa}?text=${encodeURIComponent(fallbackMessage)}`;

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      fonnteStatus: fonnteSuccess ? "Sent" : "Failed",
      redirectUrl: waLink
    });

  } catch (error: any) {
    console.error("[API Leads] Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses form", details: error.message },
      { status: 500 }
    );
  }
}
