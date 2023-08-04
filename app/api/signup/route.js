import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { connectToDB } from "@utils/database";

export async function POST(request) {
    await connectToDB()
    try {
        const { userName, email, password } = await request.json()
        const exitEmail = await User.findOne({ email: email })
        if (exitEmail) {
            return NextResponse.json({ message: "User Already Exist With This Email" }, { status: 404 })
        }
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = new User({
            userName,
            email,
            password: hashedPass,
        })
        const createUser = await newUser.save()
        return NextResponse.json(createUser, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}