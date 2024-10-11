import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/login';

export async function middleware(req: NextRequest) {
    const data = await getSession()

    if (!data) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/votacao/:path*'],
};
