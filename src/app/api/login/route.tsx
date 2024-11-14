import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt")
    
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const formData = await req.formData();

        const email = formData.get("email");
        const password = formData.get("password");

        const queryResult = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log(queryResult)

        const user = queryResult[0];
    
        if (queryResult.length === 0) {
            return NextResponse.json({ message: "Account not found" }, { status: 400 });
        }
        
        console.log(user)
        const hashedPassword = user.password;

        const passwordsMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordsMatch) {
            return NextResponse.json({ message: "Success" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Password does not match" }, { status: 401 });
        }
    } catch (error) {
        console.error("Error processing login request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}