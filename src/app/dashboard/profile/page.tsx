import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/ProfileForm';

export const metadata = {
  title: 'Profile Setup - Coway UBOS',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !(session.user as any).id) {
    redirect('/login');
  }

  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      slug: true,
      whatsappNumber: true,
      bio: true,
      image: true,
    }
  });

  if (!user) {
    redirect('/login');
  }

  const initialData = {
    name: user.name || '',
    slug: user.slug || '',
    whatsappNumber: user.whatsappNumber || '',
    bio: user.bio,
    image: user.image,
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Profile & Link Setup</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <p className="text-slate-600 mb-8">
          Data ini akan ditampilkan langsung di Landing Page Anda. Pastikan foto dan nomor kontak Anda valid dan profesional.
        </p>
        
        <ProfileForm initialData={initialData} />
      </div>
    </div>
  );
}
