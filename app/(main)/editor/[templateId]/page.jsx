"use client";
import EditorHeader from "@/components/ui/custom/EditorHeader";
import React, { useEffect, useState } from "react";
import ElementsSideBar from "@/components/ui/custom/ElementsSideBar";
import Canvas from "@/components/ui/custom/Canvas";
import Settings from "@/components/ui/custom/Settings";
import { useParams } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserDetail } from "@/app/Provider";
import { useEmailTemplate } from "@/app/Provider";

function Editor() {
  const [viewHTMLCode, setViewHTMLCode] = useState();
   const [htmlCode, setHtmlCode] = useState("");
  const { templateId } = useParams();
  const { userDetail, setUserDetail } = useUserDetail();
  const convex = useConvex();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (userDetail) {
      GetTemplateData();
    }
  }, [userDetail]);
  const GetTemplateData = async () => {
    setLoading(true)
    const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
      tid: templateId,
      email: userDetail?.email,
    });
    console.log("Fetched from convex",result)
    // if (result && result.length > 0) {
    //   try {
    //     const parsedDesign = JSON.parse(result.design);
    //     setEmailTemplate(parsedDesign); // ⬅️ This sets the canvas content
    //   } catch (e) {
    //     console.error("Error parsing template design:", e);
    //   }
    // }

    console.log(result);
    // testing the result in console
    // setEmailTemplate(JSON.parse(result?.design))

    let parsedDesign = [];
    try {
      parsedDesign =
        typeof result.design === "string"
          ? JSON.parse(result.design)
          : result.design;
    } catch (e) {
      console.error("Failed to parse design:", e);
    }

    setEmailTemplate(parsedDesign);
    // try {
    //   if (result?.design) {
    //     setEmailTemplate(JSON.parse(result.design));
    //   } else {
    //     console.warn("Template design is undefined or empty.");
    //     setEmailTemplate([]); // or set to some default/fallback design
    //   }
    // } catch (error) {
    //   console.error("Failed to parse template design JSON:", error);
    //   setEmailTemplate([]); // or show error UI
    // }
    setLoading(false)
  };

  const getHTMLCode = () => {
    const htmlContent = document.querySelector("#canvas-area")?.innerHTML;
    setHtmlCode(htmlContent); // Updates state if needed elsewhere
    return htmlContent;
  };
  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} 
      htmlCode={htmlCode}
      getLatestHtml={getHTMLCode}
      />
      {!loading ? (
        <div className="grid grid-cols-5">
          <ElementsSideBar />
          <div className="col-span-3 bg-gray-100">
            <Canvas
              viewHTMLCode={viewHTMLCode}
              closeDialog={() => setViewHTMLCode(false)}
              htmlCode={htmlCode}
              setHtmlCode={setHtmlCode}
            />
          </div>
          <Settings />
        </div>
      ) : (
        <div>
          <h2>please wait..</h2>
        </div>
      )}
    </div>
  );
}

export default Editor;
