import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt')
const validator = require('validator')


const saltRounds = 5

export async function POST(req: NextRequest, res: NextResponse) {

   try {
    const formData = await req.formData();
    const password = formData.get("password");
    const email = formData.get("email");

    if (!validator.isEmail(email)) {
        return NextResponse.json({ error: "Not a valid email address "}, { status: 400 })
    }
    
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt);

    pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

    return NextResponse.json({ "message": "Signed up successfully" }, { status: 200 })
   } catch(error) {
    console.log("Error in signup API", error)
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 })
   }
}