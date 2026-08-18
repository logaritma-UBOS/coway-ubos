import LandingPageUI from '@/components/LandingPageUI';

export default function PreviewPage() {
  // Dummy data agen untuk keperluan preview tanpa koneksi database
  const dummyAgent = {
    id: 'agent-123',
    fullName: 'Budi Santoso',
    whatsappNumber: '081234567890',
    profileImageUrl: null, // Ganti dengan URL gambar jika ada
    bio: 'Saya Health Planner Coway resmi yang siap membantu Anda menemukan produk pemurni air dan udara terbaik untuk rumah Anda.',
  };

  return <LandingPageUI agent={dummyAgent} />;
}
