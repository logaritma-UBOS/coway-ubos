export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Profile & Link Setup</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <p className="text-slate-600 mb-4">Set up your Coway dynamic landing page details here.</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input type="text" className="mt-1 w-full border border-slate-300 rounded-lg px-4 py-2" placeholder="e.g. Budi Santoso" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Custom Slug (Link URL)</label>
            <div className="flex items-center mt-1">
              <span className="bg-slate-100 border border-slate-300 border-r-0 rounded-l-lg px-4 py-2 text-slate-500 text-sm">coway.logaritma.id/</span>
              <input type="text" className="w-full border border-slate-300 rounded-r-lg px-4 py-2" placeholder="budi-santoso" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">WhatsApp Number</label>
            <input type="text" className="mt-1 w-full border border-slate-300 rounded-lg px-4 py-2" placeholder="e.g. 081234567890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Meta Pixel ID (Optional)</label>
            <input type="text" className="mt-1 w-full border border-slate-300 rounded-lg px-4 py-2" placeholder="e.g. 123456789012345" />
          </div>
          <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition mt-4">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
