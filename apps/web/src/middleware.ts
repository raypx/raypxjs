import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  console.log(">> middleware start, pathname", nextUrl.pathname);

  console.log("<< middleware end");
  return NextResponse.next();
}

/**
 * Next.js internationalized routing
 * specify the routes the middleware applies to
 *
 * https://next-intl.dev/docs/routing#base-path
 */
export const config = {
  // The `matcher` is relative to the `basePath`
  matcher: [
    // Match all pathnames except for
    // - if they start with `/api`, `/_next` or `/_vercel`
    // - if they contain a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
