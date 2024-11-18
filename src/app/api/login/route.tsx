import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
const bcrypt = require("bcrypt")

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const formData = await req.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        //@ts-ignore
        if (!user) {
            return NextResponse.json({ message: "Account not found" }, { status: 400 });
        }
        
        //@ts-ignore
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid Password or Email "}, { status: 400 })
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" })

        const cookie = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60,
        });

        return new NextResponse(JSON.stringify({ message: "Login successful" }), {
            status: 200,
            headers: { "Set-Cookie": cookie },
        });
        
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}