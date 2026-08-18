import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, whatsappNumber, cowayId, slug } = body;

    if (!name || !email || !password || !slug) {
      return NextResponse.json({ error: "Kolom wajib belum diisi" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
    }

    // Check if slug is taken
    const existingSlug = await prisma.user.findUnique({
      where: { slug }
    });

    if (existingSlug) {
      return NextResponse.json({ error: "Username (URL) sudah digunakan, pilih yang lain" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Read affiliate referral cookie if exists
    const cookieStore = await cookies();
    const affiliateRef = cookieStore.get('affiliate_ref')?.value;

    let referredById = null;
    if (affiliateRef) {
      const referrer = await prisma.user.findUnique({
        where: { slug: affiliateRef }
      });
      if (referrer) {
        referredById = referrer.id;
      }
    }

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        whatsappNumber,
        cowayId: cowayId && cowayId.trim() !== '' ? cowayId : null,
        slug,
        isActive: true, // Langsung aktif
        referredById
      }
    });

    return NextResponse.json({
      success: true,
      message: "Registrasi berhasil",
      userId: newUser.id
    });

  } catch (error: any) {
    console.error("[API Register] Error:", error);
    // Kembalikan detail error agar terlihat di frontend
    return NextResponse.json({ error: error.message || "Terjadi kesalahan sistem" }, { status: 500 });
  }
}
