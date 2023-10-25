import { SignedIn, UserButton } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import GlobalSearch from "../searchBar/GlobalSearch";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between fixed bg-white border dark:bg-[#020817] z-50 w-full gap-5 px-6 py-4 md:py-4 shadow-sm sm:px-12">
      <Link href="/">
        <div className="text-2xl font-bold text-spaceGrotesk flex gap-2 items-center">
          Code
          <Image src={"/images/site-logo.svg"} alt="code-nexus" width={23} height={23} />
          <span className="text-primary">Nexus</span>
        </div>
      </Link>
      {/* Global Search */}
      <GlobalSearch />
      {/* Profile */}
      <div className="flex items-center justify-between gap-3">
        <ThemeSwitch />

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        {/* Mobile Nav Hamburger */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
