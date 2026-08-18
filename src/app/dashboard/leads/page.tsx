import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Users, Search, Download, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Manajemen Leads - Coway UBOS',
};

export default async function LeadsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !(session.user as any).id) {
    redirect('/login');
  }

  const userId = (session.user as any).id;

  // Fetch leads for this agent, ordered by newest first
  const leads = await prisma.lead.findMany({
    where: { agentId: userId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">Manajemen Leads</h1>
            <p className="text-sm md:text-base text-slate-500 mt-1 font-medium">Pantau dan hubungi calon pelanggan Anda.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <a href="/api/leads/export" download className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl shadow-sm transition flex items-center gap-2">
            <Download size={18} /> Export CSV
          </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau nomor WA..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] transition font-medium"
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
            <span>Total:</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-900">{leads.length} Leads</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 md:px-6 font-bold uppercase tracking-wider">Tanggal</th>
                <th className="p-4 md:px-6 font-bold uppercase tracking-wider">Nama Calon</th>
                <th className="p-4 md:px-6 font-bold uppercase tracking-wider">Nomor WA</th>
                <th className="p-4 md:px-6 font-bold uppercase tracking-wider">Produk</th>
                <th className="p-4 md:px-6 font-bold uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                    Belum ada leads yang masuk. Pastikan Landing Page Anda sudah aktif dan sebar link Anda!
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 md:px-6 text-sm text-slate-600 font-medium whitespace-nowrap">
                      {new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(lead.createdAt))}
                    </td>
                    <td className="p-4 md:px-6">
                      <p className="font-bold text-slate-900">{lead.customerName}</p>
                      {lead.city && <p className="text-xs text-slate-500">{lead.city}</p>}
                    </td>
                    <td className="p-4 md:px-6">
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-lg text-sm font-bold border border-green-100">
                        {lead.whatsappNumber}
                      </span>
                    </td>
                    <td className="p-4 md:px-6">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-sm font-bold border border-slate-200">
                        {lead.targetProduct || 'Umum'}
                      </span>
                    </td>
                    <td className="p-4 md:px-6">
                      <a 
                        href={`https://wa.me/${lead.whatsappNumber.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(lead.customerName)},%20saya%20agen%20Coway.%20Ada%20yang%20bisa%20saya%20bantu%20terkait%20produk%20${encodeURIComponent(lead.targetProduct || 'Coway')}?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm"
                      >
                        <MessageCircle size={16} /> Hubungi
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
