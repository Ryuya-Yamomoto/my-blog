import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const basicAuth = req.headers.get("authorization");

  // Production環境のみ適用
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");

    if (
      user === process.env.BASIC_AUTH_USER &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
