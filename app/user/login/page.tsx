'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import React, { useState } from 'react'
import { createUser, getUserById, getUserByUserPass } from "@/actions/user"
import { useRouter } from "next/navigation"

const UserLogin = () => {
    const router = useRouter();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)

    const submit = async ()=> {
        if(username !== "" && password !== ""){

            const valid = await getUserByUserPass(username, password);
            router.replace("/")
        }

        else{
          setLoginError (true)
        }
    }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>
          Enter your information to Login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={submit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
        
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
             id="password" type="password" 
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
      {
        loginError &&
        <p>Unable to Login</p>
      }
      <p>
        Don't have any account? <Link className="text-blue-700" href={'/user/signup'}>Sign Up</Link>
      </p>
      </CardFooter>
    </Card>
  )
}

export default UserLogin