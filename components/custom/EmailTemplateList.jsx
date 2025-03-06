import Image from "next/image";
import React, { use, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useConvex } from "convex/react";
import { useUserDetail } from "@/app/provider";
import { api } from "@/convex/_generated/api";

const EmailTemplateList = () => {
  const [emailList, setEmailList] = React.useState([]);
  const convex = useConvex();
  const { userDetail } = useUserDetail();

  useEffect(() => {
    if (userDetail) {
      GetTemplateList();
    }
  }, [userDetail]);

  const GetTemplateList = async () => {
    const result = await convex.query(api.emailTemplates.GetAllUserTemplate, {
      email: userDetail?.email,
    });
    setEmailList(result);
  };

  return (
    <div>
      <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>
      {emailList?.length === 0 ? (
        <div className="flex justify-center items-center mt-7 flex-col">
          <Image src={"/email.png"} width={250} height={250} alt="Empty" />
          <Link href={"/dashboard/create"}>
            <Button className="mt-10">+ Create New</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
          {emailList?.map((item, index) => (
            <div key={index} className="p-4 rounded-lg shadow-md border">
              <Image
                src={"/emailbox.png"}
                alt="email"
                width={200}
                height={200}
                className="w-full"
              />

              <h2 className="mt-2">{item?.description}</h2>
              <Link href={"/editor/" + item?.tid}>
                <Button className="mt-2 w-full">View/Edit</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;
