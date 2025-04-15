"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { SelectedElementContext } from "@/context/SelectedElementContext";
function Provider({ children }) {
  const [userDetail, setUserDetail] = useState();
  const [screenSize, setScreenSize] = useState("Desktop");
  const [dragElementLayout, setDragElementLayout] = useState();
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState();

  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  useEffect(() => {
    if (typeof window !== undefined) {
      const storage = JSON.parse(localStorage.getItem("userDetail"));
      // const emailTemplateStorage = 
      //   localStorage.getItem("emailTemplate")? 
      //   JSON.parse(localStorage.getItem("emailTemplate")):[]
      // setEmailTemplate(emailTemplateStorage ?? []);
      const emailTemplateRaw = localStorage.getItem("emailTemplate");
      let emailTemplateStorage = [];
      try {
        emailTemplateStorage = emailTemplateRaw
          ? JSON.parse(emailTemplateRaw)
          : [];
      } catch (error) {
        console.error("Invalid emailTemplate JSON in localStorage:", error);
        emailTemplateStorage = [];
      }

       setEmailTemplate(emailTemplateStorage ?? []);
      if (!storage?.email || !storage) {
        // redirect to homescreen
      } else {
        setUserDetail(storage);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  useEffect(() => {
    if (selectedElement) {
      // let updatedEmailTemplates = [];
      // emailTemplate.forEach((item, index) => {
      //   if (item.id === selectedElement?.layout?.id) {
      //     updatedEmailTemplates?.push(selectedElement?.layout);
      //   }
      //   else{
      //     updatedEmailTemplates=[item]
      //   }
      // }
      const updatedEmailTemplates = emailTemplate.map((item) => {
      if (item.id === selectedElement.layout.id) {
        return selectedElement.layout;
      }
      return item;
    });
      
      setEmailTemplate(updatedEmailTemplates)
    }
  }, [selectedElement]);

  useEffect(() => {
    const loadUserDetail = () => {
      const storage = JSON.parse(localStorage.getItem("userDetail"));
      if (!storage?.email || !storage) {
        setUserDetail(null);
      } else {
        setUserDetail(storage);
      }
    };

    loadUserDetail(); // Initial load

    const handleStorageChange = (event) => {
      if (event.key === "userDetail") {
        loadUserDetail();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropLayoutElement.Provider
              value={{ dragElementLayout, setDragElementLayout }}
            >
              <EmailTemplateContext.Provider
                value={{ emailTemplate, setEmailTemplate }}
              >
                <SelectedElementContext.Provider
                  value={{ selectedElement, setSelectedElement }}
                >
                  <div>{children}</div>
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export default Provider;
export const useUserDetail = () => {
  return useContext(UserDetailContext);
};
export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};
export const useDragElementLayout = () => {
  return useContext(DragDropLayoutElement);
};
export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext);
};
export const useSelectedElement = () => {
  return useContext(SelectedElementContext);
};
