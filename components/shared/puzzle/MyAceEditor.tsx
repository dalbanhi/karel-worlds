import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
const languages = ["javascript"];
const themes = ["textmate"];

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/javascript";

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

interface MyAceEditorProps {
  onAceChange: (value: string) => void;
  userJavaScriptCode: string;
}

const MyAceEditor: React.FC<MyAceEditorProps> = ({
  onAceChange,
  userJavaScriptCode,
}) => {
  // State to track when the component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  const { toast } = useToast();
  return (
    hasMounted && (
      <AceEditor
        mode="javascript"
        theme="textmate"
        name="userJavaScriptCodeOnAce"
        width="100%"
        height="100%"
        onChange={(value: string) => onAceChange(value)}
        onFocus={(e) => {
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
    )
  );
};

export default MyAceEditor;
