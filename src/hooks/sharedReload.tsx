import React, { createContext, useContext, useState } from "react";

interface ReloadContextType {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReloadCtx = createContext<ReloadContextType | null>(null);

export const useReloadState = (): ReloadContextType => {
  const context = useContext(ReloadCtx);
  if (!context) {
    throw new Error(
      "useReloadState must be used within a SharedReloadProvider"
    );
  }
  return context;
};

export const SharedReloadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reload, setReload] = React.useState<boolean>(false);

  return (
    <ReloadCtx.Provider value={{ reload, setReload }}>
      {children}
    </ReloadCtx.Provider>
  );
};
