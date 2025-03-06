"use client";

import React, { useEffect, useMemo, useState, useContext } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "@/context/userDetailContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { DragDropLayoutElementContext } from "@/context/DragDropLayoutElementContext";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { SelectedElementContext } from "@/context/SelectedElementContext";

const Provider = ({ children }) => {
  const convex = useMemo(
    () => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL),
    []
  );

  const [userDetail, setUserDetail] = useState(null);
  const [screenSize, setScreenSize] = useState("desktop");
  const [dragLayoutElement, setDragLayoutElement] = useState(null);
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  // Load data from localStorage efficiently
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));
      const storedEmailTemplate =
        JSON.parse(localStorage.getItem("emailTemplate")) || [];

      if (storedUserDetail?.email) setUserDetail(storedUserDetail);
      setEmailTemplate(storedEmailTemplate.filter(Boolean));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  // Ensure selectedElement updates the email template correctly
  useEffect(() => {
    if (selectedElement) {
      setEmailTemplate((prevTemplate) => {
        return prevTemplate?.map((item) =>
          item?.id === selectedElement?.layout?.id
            ? selectedElement?.layout
            : item
        );
      });
    }
  }, [selectedElement]);

  const userDetailValue = useMemo(
    () => ({ userDetail, setUserDetail }),
    [userDetail]
  );
  const screenSizeValue = useMemo(
    () => ({ screenSize, setScreenSize }),
    [screenSize]
  );
  const dragLayoutElementValue = useMemo(
    () => ({ dragLayoutElement, setDragLayoutElement }),
    [dragLayoutElement]
  );
  const emailTemplateValue = useMemo(
    () => ({ emailTemplate, setEmailTemplate }),
    [emailTemplate]
  );
  const selectedElementValue = useMemo(
    () => ({ selectedElement, setSelectedElement }),
    [selectedElement]
  );

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={userDetailValue}>
          <ScreenSizeContext.Provider value={screenSizeValue}>
            <DragDropLayoutElementContext.Provider
              value={dragLayoutElementValue}
            >
              <EmailTemplateContext.Provider value={emailTemplateValue}>
                <SelectedElementContext.Provider value={selectedElementValue}>
                  {children}
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElementContext.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
};

export default Provider;

// Custom hooks for context access
export const useUserDetail = () => useContext(UserDetailContext);
export const useScreenSize = () => useContext(ScreenSizeContext);
export const useDragLayoutElement = () =>
  useContext(DragDropLayoutElementContext);
export const useEmailTemplate = () => useContext(EmailTemplateContext);
export const useSelectedElement = () => useContext(SelectedElementContext);
