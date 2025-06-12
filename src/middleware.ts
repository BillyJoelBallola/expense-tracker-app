import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJwtSecretKey, TOKEN_NAME } from "./lib/auth";

const protectedRoutes = ["/wallet", "/transactions", "/account"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next(); // Not protected, continue as normal
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    await jwtVerify(token, getJwtSecretKey());
    return NextResponse.next(); // Valid token, proceed
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
