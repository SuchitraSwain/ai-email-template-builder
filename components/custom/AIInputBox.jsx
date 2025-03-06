"use client";

import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuid4 } from "uuid";
import { useUserDetail } from "@/app/provider";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const AIInputBox = () => {
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { userDetail } = useUserDetail();
  const router = useRouter();

  const SaveTemplate = useMutation(api.emailTemplates.SaveTemplates);

  const onGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    const tid = uuid4();
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-email-generate", {
        prompt: PROMPT,
      });
      //save the data in DB
      const response = await SaveTemplate({
        tid: tid,
        design: result.data,
        email: userDetail.email,
      });
      // Navigate user to editor screen

      router.push(`/editor/${tid}`);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p>Provide details about the email template you'd like to create</p>
      <Textarea
        placeholder="Start writing here"
        className="text-xl mt-3 h-40"
        rows={5}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button
        className="mt-7 w-full"
        disabled={userInput?.length === 0 || loading}
        onClick={onGenerate}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <Loader className="animate-spin" />
            Please wait
          </span>
        ) : (
          "GENERATE"
        )}
      </Button>
    </div>
  );
};

export default AIInputBox;
