import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { connectToDB } from "@utils/database";

export async function POST(request) {
    await connectToDB()
    try {
        const { email, password } = await request.json()

        const user = await User.findOne({ email: email })
        if (!user) {
            return NextResponse.json({ message: "No User Found" }, { status: 404 })
        }
        const isVerify = await bcrypt.compare(password, user.password)
        if (!isVerify) {
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 404 })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        return NextResponse.json(token, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}