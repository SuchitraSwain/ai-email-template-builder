"use client";

import { useEmailTemplate, useUserDetail } from "@/app/provider";
import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSidebar from "@/components/custom/ElementsSidebar";
import Settings from "@/components/custom/Settings";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { use, useEffect } from "react";

const Editor = () => {
  const [viewHTMLCode, setViewHTMLCode] = React.useState();
  const { userDetail } = useUserDetail();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [loading, setLoading] = React.useState(false);

  const { templateId } = useParams();

  const convex = useConvex();

  useEffect(() => {
    if (userDetail) {
      GetTemplateData();
    }
  }, [userDetail]);

  const GetTemplateData = async () => {
    setLoading(true);
    const result = await convex.query(api.emailTemplates.GetTemplatesDesign, {
      tid: templateId,
      email: userDetail.email,
    });
    setEmailTemplate(result?.design);
    setLoading(false);
  };

  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} />
      {!loading ? (
        <div className="grid grid-cols-5">
          <ElementsSidebar />
          <div className="col-span-3 bg-gray-100">
            <Canvas
              viewHTMLCode={viewHTMLCode}
              closeDialog={() => setViewHTMLCode(false)}
            />
          </div>
          <Settings />
        </div>
      ) : (
        <div>
          <h2>Please wait...</h2>
        </div>
      )}
    </div>
  );
};

export default Editor;
