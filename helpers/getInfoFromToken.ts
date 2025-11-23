import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from "dotenv";

// Define the shape of your JWT payload
interface TokenPayload extends JwtPayload {
    id: string;
    email: string;
}

config()
export const getInfoFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
        return decodedToken.id
    } catch (error: any) {
        throw new Error(error?.message)
    }
}