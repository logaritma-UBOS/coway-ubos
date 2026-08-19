'use client';

import { useTransition } from 'react';
import { deleteNotificationByTitle } from './actions';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteButton({ title }: { title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Hapus broadcast "${title}" dari semua agen?`)) {
      startTransition(async () => {
        await deleteNotificationByTitle(title);
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition disabled:opacity-50"
      title="Hapus Broadcast"
    >
      {isPending ? <Loader2 size={16} className="animate-spin"/> : <Trash2 size={16}/>}
    </button>
  );
}
