import { usersTable } from "@/lib/db/schema";
import bcryptjs from "bcryptjs";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

config()
export async function POST(req: Request) {
    try {
        const db = drizzle(process.env.DATABASE_URL!);
        const reqBody = await req.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({
                error: "Missing required fields"
            }, { status: 400 })
        }

        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);

        console.log(user);

        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 })
        }

        const isPasswordValid = await bcryptjs.compare(password, user[0].password);

        if (!isPasswordValid) {
            return NextResponse.json({
                error: "Invalid password"
            }, { status: 401 })
        }

        // Creating the token data
        const tokenData = {
            id: user[0].userId,
            name: user[0].name,
            email
        }

        // Creating the token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
            expiresIn: "1h"
        });

        // Creating the response
        const response = NextResponse.json({
            message: "Login successful",
            user
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 })
    }    
}   