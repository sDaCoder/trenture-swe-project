import { usersTable } from "@/lib/db/schema";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

config()
export async function POST(request: Request) {

    try {
        const db = drizzle(process.env.DATABASE_URL!);
        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        if (!name || !email || !password) {
            return NextResponse.json({
                error: "Missing required fields"
            }, { status: 400 })
        }

        // Check if user already exists
        const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (existingUser.length > 0) {
            return NextResponse.json({
                error: "User already exists"
            }, { status: 400 })
        }

        // Hash the password
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);
        console.log(name, email, hashedPassword);

        // Insert the user into the database
        const newUser = await db.insert(usersTable).values({
            name,
            email,
            password: hashedPassword
        }).returning();
        
        return NextResponse.json({
            message: "Signed in successfully, please login now",
            newUser
        }, { status: 201 })


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 })
    }
}   