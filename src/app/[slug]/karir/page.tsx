import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import RekrutmenLP from '@/components/RekrutmenLP';
import PageViewTracker from '@/components/PageViewTracker';
import { Metadata } from 'next';
import { Lock } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const agent = await (prisma.user as any).findUnique({ where: { slug }, select: { name: true, hasRecruitLp: true } });
  
  if (!agent?.hasRecruitLp) {
    return { title: 'Halaman Belum Aktif - Coway Logaritma' };
  }
  
  const agentName = agent?.name || 'Agen Resmi';
  const title = `Peluang Karir Agen Coway - Bersama ${agentName}`;
  const description = `Bergabunglah menjadi tim mandiri Coway bersama ${agentName}. Dapatkan penghasilan jutaan rupiah tanpa modal stok barang!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    }
  };
}

export default async function RecruitmentPage(props: { params: Promise<{ slug: string }>, searchParams: Promise<{ preview?: string }> }) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const isPreview = searchParams?.preview === 'true';
  
  const agentData = await (prisma.user as any).findUnique({
    where: { slug }
  });

  if (!agentData) {
    notFound();
  }

  const hasRecruitLp = (agentData as any).hasRecruitLp;

  if (!hasRecruitLp && !isPreview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 font-sans antialiased">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Halaman Rekrutmen Belum Aktif</h1>
          <p className="text-slate-500 mb-8 font-medium leading-relaxed">Pemilik Landing Page ini belum mengaktifkan lisensi Landing Page Rekrutmen. Silakan hubungi agen yang bersangkutan.</p>
          <a href="/" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl w-full">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageViewTracker agentId={agentData.id} />
      {(!hasRecruitLp && isPreview) && (
        <div className="fixed inset-0 z-[10000] pointer-events-none flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'24\' font-family=\'sans-serif\' font-weight=\'bold\' fill=\'%23000\' text-anchor=\'middle\' transform=\'rotate(-45 100 100)\'%3EPREVIEW%3C/text%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}></div>
          <div className="bg-white/95 backdrop-blur-md px-6 py-4 md:px-10 md:py-6 rounded-3xl border-2 border-rose-500 shadow-2xl transform -rotate-12 pointer-events-auto max-w-[85vw] mx-auto text-center">
            <h2 className="text-2xl md:text-5xl font-black text-rose-600 tracking-widest uppercase mb-1 md:mb-2">PREVIEW DESAIN</h2>
            <p className="text-slate-800 font-bold text-sm md:text-lg">Silakan lakukan aktivasi untuk menggunakan fitur ini</p>
          </div>
        </div>
      )}

      {/* Back to Dashboard Button when Previewing */}
      {isPreview && (
        <a 
          href="/dashboard/landingpage" 
          className="fixed top-4 left-4 z-[20000] bg-slate-900/90 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:bg-slate-800 transition-colors pointer-events-auto"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span className="hidden sm:inline">Kembali ke Dashboard</span>
          <span className="sm:hidden">Kembali</span>
        </a>
      )}
      <RekrutmenLP 
        agent={{
          id: agentData.id,
          fullName: agentData.name || 'Agen Coway',
          whatsappNumber: agentData.whatsappNumber || '081234567890',
          profileImageUrl: agentData.image || null,
          cowayId: (agentData as any).cowayId || null,
          phone: agentData.whatsappNumber || '081234567890'
        }}
      />
    </>
  );
}
