// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas que não requerem autenticação
  const publicPaths = [
    "/Telas/Login",
    "/api/login",
    "/api/Posts/login",
    "/api/Gets/GetTrueShakes/getTruesShakes",
    
  ];

  // Verifica se é exatamente a rota de login ou suas variações de API
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Ignora arquivos estáticos e internos do Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes("/favicon.ico") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("auth_token")?.value ||
    request.cookies.get("token")?.value;

  if (!token) {
    
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const loginUrl = new URL("/Telas/Login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

 
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("⚠️ JWT_SECRET não configurada!");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  try {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);
    const { payload } = await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
    
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.userId as string || '');
    response.headers.set('x-user-email', payload.email as string || '');
    
    return response;
  } catch (err) {
    
    const response = pathname.startsWith("/api")
      ? NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
      : NextResponse.redirect(new URL("/Telas/Login?error=session_expired", request.url));
    
    response.cookies.delete("auth_token");
    response.cookies.delete("token");
    
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};