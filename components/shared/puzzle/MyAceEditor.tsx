"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AceEditor from "react-ace-builds";

import "react-ace-builds/webpack-resolver-min";

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
      setOptions={{
        showLineNumbers: true,
        tabSize: 5,
      }}
    />
  );
};

export default MyAceEditor;
