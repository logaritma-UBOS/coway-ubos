import prisma from "@/lib/prisma";

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: { agent: true, service: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-8">Data Transaksi</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Tanggal</th>
              <th className="p-4 font-bold text-slate-700">Agen</th>
              <th className="p-4 font-bold text-slate-700">Layanan</th>
              <th className="p-4 font-bold text-slate-700">Nominal</th>
              <th className="p-4 font-bold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4 text-slate-600">{order.createdAt.toLocaleDateString('id-ID')}</td>
                <td className="p-4 font-medium text-slate-900">{order.agent.name}</td>
                <td className="p-4 text-slate-600">{order.service.title}</td>
                <td className="p-4 font-bold text-slate-900">Rp {Number(order.amount).toLocaleString('id-ID')}</td>
                <td className="p-4">
                  <span className={px-3 py-1 rounded-full text-xs font-bold }>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">Belum ada transaksi</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
