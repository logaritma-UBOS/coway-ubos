import prisma from "@/lib/prisma";

export default async function AdminLeads() {
  const leads = await prisma.lead.findMany({
    include: { agent: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-8">Rekap Keseluruhan Leads</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Tanggal Masuk</th>
              <th className="p-4 font-bold text-slate-700">Nama Lead</th>
              <th className="p-4 font-bold text-slate-700">No. HP</th>
              <th className="p-4 font-bold text-slate-700">Tujuan Agen</th>
              <th className="p-4 font-bold text-slate-700">Produk</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4 text-slate-600">{lead.createdAt.toLocaleDateString('id-ID')}</td>
                <td className="p-4 font-medium text-slate-900">{lead.customerName}</td>
                <td className="p-4 text-slate-600">{lead.whatsappNumber.replace(/(\d{4})\d{4}(\d{2})/, '$1****$2')}</td>
                <td className="p-4 font-medium text-[#00A3E0]">{lead.agent.name}</td>
                <td className="p-4 text-slate-600">{lead.targetProduct || '-'}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">Belum ada leads yang masuk</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
