import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
const bcrypt = require("bcrypt")

export async function GET(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    const queryEmail = await pool.query('SELECT * FROM users WHERE email=(?)', email);
    const hashedPassword = await pool.query('SELECT * FROM users WHERE password=(?)', password);

    if (email !== queryEmail) {return NextResponse.json({ message: "Account not found" }, { status: 400 })}
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (isPasswordMatch) {return NextResponse.json({ message: "Success" }, { status: 200 })} 
    else {return NextResponse.json({ message: "Password does not match" }, { status: 401 })}
}