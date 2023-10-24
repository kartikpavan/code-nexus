"use client";

import { BiMenu } from "react-icons/bi";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Link from "next/link";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {/* //! Add a hidden class later */}
          <BiMenu size={24} className="cursor-pointer " />
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/">
            <Image src={"/images/LOGO.png"} alt="Query-Hive" width={150} height={150} />
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
  const currentPath = usePathname();
  return (
    <div className="flex h-full flex-col gap-4 pt-16">
      {sidebarLinks.map((item) => {
        let isActive =
          (currentPath.length > 1 && currentPath.includes(item.route)) ||
          currentPath === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={`${item.route}`}
              className={`${
                isActive ? "rounded-lg font-semibold bg-zinc-200" : ""
              } flex items-center gap-3 justify-start bg-transparent p-4 hover:bg-zinc-100/70 transition-colors duration-200 ease-in-out hover:rounded-lg`}
            >
              <Image src={item.imgURL} alt={item.label} height={23} width={23} />

              <p>{item.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </div>
  );
};

export default MobileNav;
