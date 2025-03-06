"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Code, Monitor, Smartphone } from "lucide-react";
import { useEmailTemplate, useScreenSize, useUserDetail } from "@/app/provider";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const EditorHeader = ({ viewHTMLCode }) => {
  const { screenSize, setScreenSize } = useScreenSize();
  const { templateId } = useParams();
  const { emailTemplate } = useEmailTemplate();
  const { userDetail } = useUserDetail();
  const UpdateTemplateDesign = useMutation(
    api.emailTemplates.UpdateTemplateDesign
  );
  const convex = useConvex();

  const SaveTemplate = useMutation(api.emailTemplates.SaveTemplates);

  const GetTemplatesDesign = useMutation(api.emailTemplates.GetTemplatesDesign);

  // const onSaveTemplate = async () => {
  //   await UpdateTemplateDesign({
  //     tid: templateId,
  //     design: emailTemplate,
  //   });
  //   toast("Email Template Updated Successfully");
  // };

  const onSaveTemplate = async () => {
    try {
      // Create a sanitized version of the template without React metadata
      const sanitizedTemplate = JSON.parse(JSON.stringify(emailTemplate));
      
      const existingTemplate = await convex.query(
        api.emailTemplates.GetTemplatesDesign,
        {
          email: userDetail?.email,
          tid: templateId,
        }
      );
  
      if (existingTemplate) {
        // If template exists, update it
        await convex.mutation(api.emailTemplates.UpdateTemplateDesign, {
          tid: templateId,
          design: sanitizedTemplate, // Using sanitized version
        });
  
        toast.success("Template updated successfully");
      } else {
        // If template doesn't exist, create new one
        await convex.mutation(api.emailTemplates.SaveTemplates, {
          tid: templateId,
          design: sanitizedTemplate, // Using sanitized version
          email: userDetail?.email,
          description: "New template",
        });
  
        toast.success("Template saved successfully");
      }
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template");
    }
  };
  return (
    <div className="p-4 shadow-sm flex justify-between items-center">
      <Link href="/">
        <Image src={"/logo.svg"} alt="logo" width={160} height={150} />
      </Link>

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
