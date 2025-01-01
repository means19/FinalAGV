import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import AgvList from "./components/agv-list";


export default function App({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <div className="w-full justify-center pt-14 h-1">
        <AgvList />
      </div>
    </SidebarProvider>
  );
}
