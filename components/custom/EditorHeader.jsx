"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Code, Monitor, Smartphone } from "lucide-react";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const EditorHeader = ({ viewHTMLCode }) => {
  const { screenSize, setScreenSize } = useScreenSize();
  const { templateId } = useParams();
  const { emailTemplate } = useEmailTemplate();
  const UpdateTemplateDesign = useMutation(
    api.emailTemplates.UpdateTemplateDesign
  );

  const onSaveTemplate = async () => {
    await UpdateTemplateDesign({
      tid: templateId,
      design: emailTemplate,
    });
    toast("Email Template Updated Successfully");
  };
  return (
    <div className="p-4 shadow-sm flex justify-between items-center">
      <Image src={"/logo.svg"} alt="logo" width={160} height={150} />
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className={`${screenSize === "desktop" && "bg-purple-100 text-primary"}`}
          onClick={() => setScreenSize("desktop")}
        >
          <Monitor /> Desktop
        </Button>
        <Button
          variant="ghost"
          className={`${screenSize === "mobile" && "bg-purple-100 text-primary"}`}
          onClick={() => setScreenSize("mobile")}
        >
          <Smartphone /> Mobile
        </Button>
      </div>
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className="hover:text-primary"
          onClick={() => viewHTMLCode(true)}
        >
          <Code />
        </Button>
        <Button variant="outline">Sent Test Email</Button>
        <Button onClick={onSaveTemplate}>Save Template</Button>
      </div>
    </div>
  );
};

export default EditorHeader;
