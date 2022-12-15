import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextServer } from 'next/dist/server/next';

export function middleware(req: NextRequest) {
    console.log('Hello World NEXT!');
    return NextResponse.next();
}
