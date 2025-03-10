"use client";

import React from "react";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const SignInButton = () => {
  const CreateUser = useMutation(api.users.CreateUsers);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer" + tokenResponse.access_token } }
      );

      const user = userInfo?.data;
      //Save user info in database
      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      });

      const userDetail = {
        ...user,
        _id: result?.id ?? result,
      };

      if (typeof window !== "undefined") {
        window.localStorage.setItem("userDetail", JSON.stringify(userDetail));
        window.location.href = "/dashboard";
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div>
      <Button onClick={googleLogin}>Get Started</Button>
    </div>
  );
};

export default SignInButton;
