import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./TextEditor.module.scss";

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  return (
    <div className={styles["text-editor"]}>
      <Editor
        apiKey="bq8p7ems2hsizrjyi9jfg2yxf03k0r2medapminv87m8knxz"
        value={value}
        onEditorChange={(content) => onChange(content)}
        init={{
          min_height: 520,
          content_style: `
            html, body {
              background: transparent !important;
              color: inherit !important;
            }
            body.mce-content-body {
              background: transparent !important;
              color: inherit !important;
            }
            .tox-tinymce, .tox-editor-container, .tox-toolbar, .tox-statusbar {
              background-color: transparent !important;
            }
          `,
          promotion: false,
          onboarding: false,
          plugins: [
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "checklist",
            "mediaembed",
            "casechange",
            "formatpainter",
            "pageembed",
            "a11ychecker",
            "tinymcespellchecker",
            "permanentpen",
            "powerpaste",
            "advtable",
            "advcode",
            "editimage",
            "mentions",
            "tinycomments",
            "tableofcontents",
            "footnotes",
            "mergetags",
            "autocorrect",
            "typography",
            "inlinecss",
            "markdown",
            "importword",
            "exportword",
            "exportpdf",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
        }}
      />
    </div>
  );
}
