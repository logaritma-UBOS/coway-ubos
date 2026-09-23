import prisma from "@/lib/prisma";
import AssetClientManager from "./AssetClientManager";

export default async function CreativeAssetsAdmin() {
  const assets = await prisma.creativeAsset.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Manajemen Creative Assets</h1>
        <p className="text-slate-500">Atur katalog materi promosi yang bisa dilihat dan dipesan oleh agen di dashboard mereka.</p>
      </div>
      <AssetClientManager initialAssets={assets} />
    </div>
  );
}
