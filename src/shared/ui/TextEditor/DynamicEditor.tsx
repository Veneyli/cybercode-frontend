"use client";

import dynamic from "next/dynamic";

const DynamicTextEditor = dynamic(() => import("./TextEditor"), {
  ssr: false,
});

export default DynamicTextEditor;
