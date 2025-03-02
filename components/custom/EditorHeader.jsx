"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Code, Monitor, Smartphone } from "lucide-react";
import { useScreenSize } from "@/app/provider";

const EditorHeader = () => {
  const { screenSize, setScreenSize } = useScreenSize();
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
        <Button variant="ghost" className="hover:text-primary">
          <Code />
        </Button>
        <Button variant="outline">Sent Test Email</Button>
        <Button>Save Template</Button>
      </div>
    </div>
  );
};

export default EditorHeader;
