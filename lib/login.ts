'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSingleGuest } from './guest';

const secretKey = process.env.ENCRIPT_KEY
const key = new TextEncoder().encode(secretKey);
const cookieName = 'halloween-freitas-email'

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1 day from now")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function login(formData: FormData) {
    const user = { email: formData.get("email"), name: "John" };

    if (!user.email) return;

    const guest = await getSingleGuest(user.email?.toString())

    if (guest.status === 'success') {
        const expires = new Date(Date.now() + 10 * 1000);
        const session = await encrypt({ user, expires });

        cookies().set(cookieName, session, { expires, httpOnly: true });
    }
    return guest
}

export async function logout() {
    cookies().set(cookieName, "", { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get(cookieName)?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get(cookieName)?.value;

    if (!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: cookieName,
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}
