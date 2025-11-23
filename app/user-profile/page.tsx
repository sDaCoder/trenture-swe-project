"use client"

import axios from "axios"
import { useEffect } from "react"

const page = () => {

    useEffect(() => {
        const getUserInfo = async () => {
            const res = await axios.get('/api/users/profile')
            console.log(res.data);
        }
        getUserInfo()
    }, [])

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <h1>User Profile</h1>
        </div>
    )
}

export default page