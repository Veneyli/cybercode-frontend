"use client";

import React, { createContext, useContext, useState } from "react";

type LectureProgressContextType = {
  refreshProgress: () => void;
  setRefreshProgress: (fn: () => void) => void;
};

const LectureProgressContext = createContext<LectureProgressContextType | null>(
  null
);

export const useLectureProgress = () => {
  const context = useContext(LectureProgressContext);
  if (!context) {
    throw new Error(
      "useLectureProgress must be used within LectureProgressProvider"
    );
  }
  return context;
};

export const LectureProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [refreshProgressFn, setRefreshProgressFn] = useState<() => void>(
    () => () => {}
  );

  return (
    <LectureProgressContext.Provider
      value={{
        refreshProgress: refreshProgressFn,
        setRefreshProgress: setRefreshProgressFn,
      }}
    >
      {children}
    </LectureProgressContext.Provider>
  );
};
