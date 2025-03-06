'use client'

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import AIInputBox from "@/components/custom/AIInputBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { v4 as uuid4 } from "uuid";

const CreateNew = () => {
  const router = useRouter();

  const handleStartFromScratch = () => {
    const tid = uuid4();
    router.push(`/editor/${tid}`);
  };

  return (
    <div className="px-10 md:px-28 lg:px-64 xl:px-72 mt-20">
      <div className="flex items-center flex-col">
        <h2 className="uppercase font-bold text-3xl text-primary">
          Create new email template
        </h2>
        <p className="text-lg">
          Effortlessly design and customize professional AI-powered email
          templates with ease
        </p>

        <Tabs defaultValue="AI" className="w-[500px] mt-10">
          <TabsList>
            <TabsTrigger value="AI">
              Create with AI <Sparkles className="h-5 w-5 ml-2" />
            </TabsTrigger>
            <TabsTrigger value="SCRATCH">Start from Scratch</TabsTrigger>
          </TabsList>
          <TabsContent value="AI">
            <AIInputBox />
          </TabsContent>
          <TabsContent value="SCRATCH">
            <div className="flex flex-col items-center mt-5">
              <p>
                Start fresh by creating your own email template from scratch.
              </p>
              <Button className="mt-5" onClick={handleStartFromScratch}>
                Start from Scratch
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateNew;
