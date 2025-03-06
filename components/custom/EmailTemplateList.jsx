import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmailTemplateList = () => {
  const [emailList, setEmailList] = React.useState([]);

  return (
    <div>
      <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>
      {emailList.length === 0 && (
        <div className="flex justify-center items-center mt-7 flex-col">
          <Image src={"/email.png"} width={250} height={250} alt="Empty" />
          <Link href={"/dashboard/create"}>
            <Button className="mt-10">+ Create New</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;
