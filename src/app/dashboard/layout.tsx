import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: { image: true, name: true, cowayId: true }
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar session={session} userDb={user} />
        <main className="flex-1 p-4 pb-28 md:p-10 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
