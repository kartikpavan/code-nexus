import LeftSidebar from "@/components/shared/navbar/LeftSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import RightSidebar from "@/components/shared/navbar/RightSidebar";
import React, { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative">
      {/* Navbar */}
      <Navbar />
      <section className="flex">
        {/* Left Sidebar */}
        <LeftSidebar />
        {/* Main Section */}
        <section className="flex  min-h-screen flex-1 flex-col px-6 pb-6 pt-32 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        {/* Right sidebar */}
        <RightSidebar />
      </section>
    </main>
  );
};

export default RootLayout;
