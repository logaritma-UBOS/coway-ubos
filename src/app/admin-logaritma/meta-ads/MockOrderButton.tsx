'use client';
import { useTransition } from 'react';
import { createMockOrder } from './actions';
import { Plus, Loader2 } from 'lucide-react';

export default function MockOrderButton() {
  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    startTransition(async () => {
      await createMockOrder();
    });
  };

  return (
    <button 
      onClick={handleCreate}
      disabled={isPending}
      className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition disabled:opacity-75"
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16}/>}
      Simulasi Order (Dev Mode)
    </button>
  );
}
