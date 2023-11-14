"use client";

import { CgMenuRight } from "react-icons/cg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import Image from "next/image";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {/* //! Add a hidden class later */}
          <CgMenuRight size={28} className="cursor-pointer md:hidden" />
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/">
            <div className="text-2xl font-bold text-spaceGrotesk flex gap-2 items-center">
              Code
              <Image
                src={"/images/site-logo.svg"}
                alt="code-nexus"
                width={23}
                height={23}
              />
              <span className="text-primary">Nexus</span>
            </div>
          </Link>
          <div className="flex flex-col h-[calc(100%-4rem)]">
            <SheetClose asChild>
              <NavContent />
            </SheetClose>
            {/* Clerk Component */}
            <SignedOut>
              <div className="flex flex-col gap-3 mt-10">
                <SheetClose asChild>
                  <Link href="/sign-in">
                    <Button variant="default" size="lg" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/sign-up">
                    <Button variant="secondary" size="lg" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const NavContent = () => {
  const { userId } = useAuth();
  // if (!userId) return null;
  const currentPath = usePathname();
  return (
    <div className="flex h-full flex-col gap-4 pt-16">
      {sidebarLinks.map((item) => {
        let isActive =
          (currentPath.length > 1 && currentPath.includes(item.route)) ||
          currentPath === item.route;
        // getting the userID to navigate to profile detail page
        if (item.route === "/profile") {
          if (userId) {
            item.route = `${item.route}/${userId}`;
          }
        }
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={`${item.route}`}
              className={`${
                isActive
                  ? "rounded-lg font-semibold bg-blue-100 dark:bg-blue-900/30 text-primary "
                  : ""
              } flex items-center gap-3 justify-start bg-transparent p-3 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 ease-in-out rounded-lg hover:rounded-lg cursor-pointer`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                height={23}
                width={23}
              />

              <p>{item.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </div>
  );
};

export default MobileNav;
