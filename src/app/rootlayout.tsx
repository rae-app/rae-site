import React, { ReactNode } from "react";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
}
