"use client";

import { useUserDetail } from "@/app/provider";
import EmailTemplateList from "@/components/custom/EmailTemplateList";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { use } from "react";

const Dashboard = () => {
  const { userDetail } = useUserDetail();

  return (
    <div>
      <div className="p-10 md:px-28 lg:px-40 xl:px-56 mt-16">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl">Hello, {userDetail?.name}</h2>
          <Link href={"/dashbaord/create"}>
            <Button>+ Create New Email Template</Button>
          </Link>
        </div>
        <EmailTemplateList />
      </div>
    </div>
  );
};

export default Dashboard;
