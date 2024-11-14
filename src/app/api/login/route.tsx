import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt")
    
export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    console.log("------------------------------------------------------------------------")
    const queryResult = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log(queryResult)

    if (queryResult.length === 0) {
        return NextResponse.json({ message: "Account not found" }, { status: 400 });
    }

    const queryEmail = queryResult[0];
    const hashedPassword = queryEmail.password

    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (isPasswordMatch) {
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Password does not match" }, { status: 401 });
    }
}