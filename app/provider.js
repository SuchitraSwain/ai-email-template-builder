"use client";

import React, { useContext, useEffect } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "@/context/userDetailContext";

const Provider = ({ children }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  const [userDetail, setUserDetail] = React.useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = window.localStorage.getItem("userDetail");
      const parsedStorage = storage ? JSON.parse(storage) : null;

      if (parsedStorage?.email) {
        setUserDetail(parsedStorage);
      }
    }
  }, []);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          {children}
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
};

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};
