"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AceEditor from "react-ace-builds";

import "react-ace-builds/webpack-resolver-min";

// Dynamically import AceEditor only on the client side
// const AceEditor = dynamic(() => import("react-ace-builds"), { ssr: false });

// Utility to load Ace builds and attach to global `window` object
// const loadAceBuilds = async () => {
//   try {
//     // Load core Ace library and necessary extensions
//     await Promise.all([
//       import("ace-builds/src-noconflict/ace"),
//       import("ace-builds/src-noconflict/ext-language_tools"),
//     ]);

//     // Load languages and themes
//     await Promise.all([
//       import("ace-builds/src-noconflict/mode-javascript"),
//       import("ace-builds/src-noconflict/theme-textmate"),
//     ]);

//     // Attach `ace` to global object
//     if (typeof window !== "undefined") {
//       window.ace = window.ace || {};
//       window.ace.require = window.ace.require || (() => {});
//     }
//   } catch (error) {
//     console.error("Failed to load ace builds: ", error);
//   }
// };

interface MyAceEditorProps {
  onAceChange: (value: string) => void;
  userJavaScriptCode: string;
}

const MyAceEditor: React.FC<MyAceEditorProps> = ({
  onAceChange,
  userJavaScriptCode,
}) => {
  const [hasMounted, setHasMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <div>Loading editor...</div>;

  return (
    <AceEditor
      mode="javascript"
      theme="textmate"
      name="userJavaScriptCodeOnAce"
      width="100%"
      height="100%"
      onChange={(value: string) => onAceChange(value)}
      onFocus={() => {
        toast({
          variant: "destructive",
          title: "Coming soon",
          description: "Text to block conversion is coming soon",
        });
      }}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      readOnly={true}
      value={userJavaScriptCode}
      enableLiveAutocompletion={true}
      enableBasicAutocompletion={true}
      enableSnippets={true}
      setOptions={{
        showLineNumbers: true,
        tabSize: 5,
      }}
    />
  );
};

export default MyAceEditor;
