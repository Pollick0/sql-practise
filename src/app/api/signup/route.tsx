import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt')
const validator = require('validator')

export async function POST(req: NextRequest, res: NextResponse) {

   try {
    const formData = await req.formData();
    const password = formData.get("password");
    const email = formData.get("email");

    if (!validator.isEmail(email)) {
        return NextResponse.json({ error: "Not a valid email address "}, { status: 400 })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

    return NextResponse.json({ message: "Signup successful" }, { status: 200 })
   } catch(error) {
    console.log("Error during signup", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
   }
}