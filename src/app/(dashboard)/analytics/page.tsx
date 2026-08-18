export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Lead Analytics & Performance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase">Total Page Views</h3>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">1,245</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase">WhatsApp Clicks</h3>
          <p className="text-4xl font-extrabold text-green-500 mt-2">87</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Leads</h3>
        <p className="text-slate-500 text-sm">Leads data will be displayed here once connected to the Lead Capture Form.</p>
      </div>
    </div>
  );
}
