"use client";

import React, { useContext, useEffect } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "@/context/userDetailContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";

const Provider = ({ children }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  const [userDetail, setUserDetail] = React.useState();
  const [screenSize, setScreenSize] = React.useState('desktop');

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
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            {children}
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
};

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};
