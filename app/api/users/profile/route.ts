import { NextRequest } from "next/server";
import { getInfoFromToken } from "@/helpers/getInfoFromToken";
import { drizzle } from "drizzle-orm/neon-http";
import { usersTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request:NextRequest) {
    try {
        const userId = await getInfoFromToken(request)

        const db = drizzle(process.env.DATABASE_URL!);
        const user = await db
            .select({
                userId: usersTable.userId,
                name: usersTable.name,
                email: usersTable.email,
                createdAt: usersTable.createdAt,
                emailVerified: usersTable.emailVerified,
                isAdmin: usersTable.isAdmin
            })
            .from(usersTable)
            .where(eq(usersTable.userId, userId))
            .limit(1);

        return NextResponse.json({
            user: user[0],
            message: "User profile fetched successfully"
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}