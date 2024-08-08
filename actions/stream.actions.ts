"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apisecret = process.env.STREAM_API_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();
    if(!user)  throw new Error("user not authenticated");       

    if(!apiKey)  throw new Error("NO API KEYS :)");
    if(!apisecret)  throw new Error("NO API secret :)");
    
    const client = new StreamClient(apiKey,apisecret)

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor(Date.now() / 1000) - 60;
    const token = client.createToken(user.id,exp,issued);
    return token;
}