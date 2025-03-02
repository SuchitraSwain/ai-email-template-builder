import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import SignInButton from "./SignInButton";

const Hero = () => {
  return (
    <div className="px-10 md-px-28 lg:px-44 xl:px-56 flex flex-col justify-center items-center mt-24">
      <h2 className="font-extrabold text-5xl text-center">
        AI-Powered <span className="text-primary">Email Templates</span>
      </h2>
      <p className="text-center mt-4">
        Get started with our AI-powered email templates and start sending
        beautiful emails in minutes.
      </p>
      <div className="flex gap-6 mt-6">
        <Button variant="outline">Try Demo</Button>
        <SignInButton />
      </div>
      <Image
        src={"/landing.png"}
        alt="landing"
        width={1000}
        height={800}
        className="mt-12 rounded-2xl"
      />
    </div>
  );
};

export default Hero;
