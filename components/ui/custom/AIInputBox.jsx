"use client";
import React, { useState } from "react";
import { Textarea } from "../textarea";
import { Button } from "../button";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";
import { useUserDetail } from "@/app/Provider";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function AIInputBox() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const SaveTemplate = useMutation(api.emailTemplate.saveTemplate);
  const router=useRouter()
  const { userDetail, setUserDetail } = useUserDetail();
  const OnGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    const tid = uuidv4();
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-email-generate", {
        prompt: PROMPT,
      });
      //   console.log(result);

      console.log(result.data);
      const resp=await SaveTemplate({
        tid: tid,
        design: result.data,
        email: userDetail?.email,
        description:userInput
      });
      console.log(resp)
      // navigate user to editor/ screen page
      router.push('/editor/'+tid)
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p className="mb-2 ">
        Provide details about the email template you would like to create
      </p>
      <Textarea
        placeholder="Start Writing Here"
        rows="5"
        className="text-xl"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        className="w-full mt-7"
        disabled={userInput?.length == 0 || loading}
        onClick={OnGenerate}
      > {loading?<span className="flex gap-2"><Loader2 className="animate-spin"/>Please wait...</span>:'Generate'}
      </Button>
    </div>
  );
}

export default AIInputBox;
