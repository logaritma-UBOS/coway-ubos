import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  // Daftar host utama platform (bukan subdomain agen)
  const isPlatformDomain =
    hostname === 'coway.logaritma.id' ||
    hostname.endsWith('.netlify.app') ||
    hostname.endsWith('.vercel.app') ||
    hostname === 'localhost:3000' ||
    hostname.startsWith('localhost:');

  let agentSubdomain: string | null = null;

  if (!isPlatformDomain) {
    if (hostname.endsWith('.coway.logaritma.id')) {
      agentSubdomain = hostname.replace('.coway.logaritma.id', '');
    } else if (hostname.endsWith('.localhost:3000')) {
      agentSubdomain = hostname.replace('.localhost:3000', '');
    }
  }

  // Affiliate Referral Tracking
  let response = NextResponse.next();
  const ref = req.nextUrl.searchParams.get('ref');

  if (ref) {
    response.cookies.set({
      name: 'affiliate_ref',
      value: ref,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 hari dalam detik
      sameSite: 'lax',
    });
  }

  // Subdomain Mapping jika memang ada subdomain agen (contoh: budi.coway.logaritma.id -> /budi)
  if (agentSubdomain) {
    url.pathname = `/${agentSubdomain}${url.pathname}`;
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
