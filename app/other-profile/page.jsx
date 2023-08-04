'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const OtherProfile = () => {
    const searchParams = useSearchParams()
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)

    const userId = searchParams.get('id')

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch (`/api/users/${userId}/posts`)
          const data = await response.json()
          setPosts(data)
        }

        const fetchUser = async () => {
            console.log(userId)
            const response = await fetch (`/api/users/${userId}`)
            const data = await response.json()
            
            setUser(data[0])
        }
        
        if (userId) {
            fetchPosts()
            fetchUser()
        }
    }, [])

    return (
        <>
            { user && 
                <Profile 
                name={user.username}
                profilePic={user.image}
                desc="Welcome to your friend's profile!"
                data={posts}/>  
            }
        </>
        
    )
}

export default OtherProfile