import { GenerateEmailTemplateAIModel } from "@/config/AiModel"
import { NextResponse } from "next/server"

export async function POST(req) {
    const {prompt}=await req.json()
    try{
        const result=await GenerateEmailTemplateAIModel.sendMessage(prompt)
        const aiResp= result.response.text()
        // return NextResponse.json(aiResp)
        console.log(aiResp)
        return NextResponse.json(aiResp);

    }
    catch(e){
console.error("API Error:", e);
return NextResponse.json({error:e});
    }
    
}