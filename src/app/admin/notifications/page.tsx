import { getServerSession } from "next-auth";
import { authOptions, prisma } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BellRing, Info, AlertTriangle, CheckCircle, Tag } from "lucide-react";
import NotificationForm from "./NotificationForm";
import DeleteButton from "./DeleteButton";

export default async function AdminNotificationsPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
    redirect('/login');
  }

  // To show recent broadcasts, we can group notifications by title and createdAt
  // Since Prisma doesn't have a simple DISTINCT for text fields without group by aggregating,
  // we can just fetch the latest 50 notifications and group them in JS
  const recentNotifications = await prisma.notification.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      user: { select: { id: true } }
    }
  });

  // Group by title
  const broadcastsMap = new Map();
  recentNotifications.forEach(n => {
    if (!broadcastsMap.has(n.title)) {
      broadcastsMap.set(n.title, {
        id: n.id,
        title: n.title,
        message: n.message,
        type: n.type,
        createdAt: n.createdAt,
        count: 0
      });
    }
    broadcastsMap.get(n.title).count++;
  });

  const broadcasts = Array.from(broadcastsMap.values()).slice(0, 10); // Show latest 10 broadcasts

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'WARNING': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'PROMO': return <Tag size={16} className="text-purple-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
          <BellRing size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">Broadcast Notifikasi</h1>
          <p className="text-slate-500">Kirim pemberitahuan langsung ke dashboard para agen.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            Buat Broadcast Baru
          </h2>
          <NotificationForm />
        </div>

        {/* Recent Broadcasts */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Riwayat Broadcast</h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {broadcasts.length === 0 ? (
              <p className="text-center text-slate-500 py-8 text-sm">Belum ada riwayat broadcast.</p>
            ) : (
              broadcasts.map((bc, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex gap-3 group relative">
                  <div className="mt-0.5 shrink-0">
                    {getTypeIcon(bc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm truncate pr-8">{bc.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{bc.message}</p>
                    <div className="flex items-center gap-3 mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>{bc.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>Terkirim ke {bc.count} Agen</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                    <DeleteButton title={bc.title} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
