import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.coway.logaritma.id`, '')
      : hostname.replace(`.localhost:3000`, '');

  // Affiliate Referral Tracking
  let response = NextResponse.next();
  const ref = req.nextUrl.searchParams.get('ref');

  // Jika URL memiliki parameter ?ref= (contoh: coway.logaritma.id/register?ref=budisantoso)
  if (ref) {
    // Simpan di cookie dengan masa berlaku 30 hari
    response.cookies.set({
      name: 'affiliate_ref',
      value: ref,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 hari dalam detik
      sameSite: 'lax',
    });
  }

  // Subdomain Mapping
  // Contoh: budi.coway.logaritma.id -> rewrite ke /budi
  if (currentHost !== 'coway.logaritma.id' && currentHost !== 'localhost:3000') {
    url.pathname = `/${currentHost}${url.pathname}`;
    // Jika ada ref cookie yang diset, gabungkan response-nya
    const rewriteResponse = NextResponse.rewrite(url);
    if (ref) {
      rewriteResponse.cookies.set({
        name: 'affiliate_ref',
        value: ref,
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
      });
    }
    return rewriteResponse;
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
