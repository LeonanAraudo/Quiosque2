// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // -----------------------------
  // ROTAS PÚBLICAS (permitir sem autenticação)
  // -----------------------------
  const publicPaths = [
    "/Telas/Login",
    "/api/login",
    "/api/Posts/login"
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

  // -----------------------------
  // LÊ O TOKEN
  // -----------------------------
  const token =
    request.cookies.get("auth_token")?.value ||
    request.cookies.get("token")?.value;

  if (!token) {
    // Se for API, retorna 401
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Se for página, redireciona para login
    const loginUrl = new URL("/Telas/Login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // -----------------------------
  // VALIDA JWT
  // -----------------------------
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  try {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);
    const { payload } = await jwtVerify(token, secretKey, { algorithms: ["HS256"] });

    // Adiciona dados do usuário aos headers para uso nas rotas
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.userId as string || '');
    response.headers.set('x-user-email', payload.email as string || '');
    
    return response;
  } catch (err) {
    // Remove o cookie inválido
    const response = pathname.startsWith("/api")
      ? NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
      : NextResponse.redirect(new URL("/Telas/Login?error=session_expired", request.url));
    
    response.cookies.delete("auth_token");
    response.cookies.delete("token");
    
    return response;
  }
}

// -----------------------------
// CONFIGURAÇÃO DO MIDDLEWARE
// -----------------------------
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