export async function POST() {
    const cookie = serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
        maxAge: -1
    });

    return new NextResponse(JSON.stringify({ message: "Logout Successful" }), {
        status: 200,
        headers: { "Set-Cookie": cookie },
    });
}