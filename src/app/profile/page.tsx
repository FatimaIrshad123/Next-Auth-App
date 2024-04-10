'use client'

import axios from "axios"
import { error } from "console"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"


export default function ProfilePage(){
    const router = useRouter()
    const [data,setData] = useState('')

    const getUserDetail = async () => {
        const res = await axios.post('/api/users/me')
        console.log(res.data.data._id)
        setData(res.data.data._id)
    }
    const logout = async() => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout success')
            router.push('/login')

        }catch (error:any){
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr/>
            <h2>{data === ''? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button onClick={getUserDetail}
            className="bg-red-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Profile</button>
        </div>
    )
}