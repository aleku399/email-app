import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  const allowedOrigin = 'https://www.henkmininglogistics.com';
  const origin = req.headers.get('origin');

  if (origin === allowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  }

  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Vary', 'Origin');

  // For OPTIONS request, respond immediately with a 204 status
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204 });
  }

  return response;
}

// Apply middleware only to specific paths if needed
export const config = {
  matcher: '/api/:path*',
};
