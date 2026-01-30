import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  
  // Detect if the user is using curl, wget, or httpie
 const isCLI = /curl|wget|httpie|powershell/i.test(userAgent)

  

  if (isCLI) {
    // Rewrite the URL to your special API route
    // The user won't see the URL change in their terminal
    return NextResponse.rewrite(new URL('/api/cli', request.url))
  }

  // Otherwise, continue as normal
  return NextResponse.next()
}

export const config = {
  // Apply this to all routes except static files (images, favicon, etc.)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}