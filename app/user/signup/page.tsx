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
import { createUser } from "@/actions/user"
import { useRouter } from "next/navigation"

const UserSignUp = () => {
    const router = useRouter();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")

    const submit = async ()=> {
        if(username !== "" && email !== "" && password !== ""){

            await createUser(username, email, address, password);
            router.replace("/")
        }
    }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="address"
              placeholder="Your Address"
              required
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
             id="password" type="password" 
             value={password}
             placeholder="xxxxxxxx"
             onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
      <p>
        Aready Registered? <Link className="text-blue-700"  href={'/user/login'}> Sign In</Link>
      </p>
      </CardFooter>
    </Card>
  )
}

export default UserSignUp