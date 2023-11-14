"use client";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const { userId } = useAuth();
  //   if (!userId) return null;
  const currentPath = usePathname();
  return (
    <div className="sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-6 border shadow-sm pt-32 max-sm:hidden lg:w-[270px]">
      <div className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((item) => {
          const isActive =
            (currentPath.includes(item.route) && item.route.length > 1) ||
            currentPath === item.route;
          // getting the userID to navigate to profile detail page
          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            }
          }
          return (
            <Link
              key={item.label}
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
              <p className="max-lg:hidden">{item.label}</p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3 mt-10">
          <Link href="/sign-in">
            <Button variant="default" className="w-full">
              <Image
                src={"/icons/user.svg"}
                alt="login"
                width={23}
                height={23}
                className="lg:hidden"
              />
              <span className="max-lg:hidden">Log In</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button variant="secondary" className="w-full">
              <Image
                src={"/icons/account.svg"}
                alt="login"
                width={23}
                height={23}
                className="lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default LeftSidebar;
