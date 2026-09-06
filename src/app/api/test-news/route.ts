import { NextResponse } from 'next/server';
import { getNewsPage } from '@/app/actions/news';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const data = await getNewsPage(page);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, stack: error.stack });
  }
}
