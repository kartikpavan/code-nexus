import { SignedIn, UserButton } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import GlobalSearch from "../searchBar/GlobalSearch";

const Navbar = () => {
  return (
    <nav className="flex items-center bg-white justify-between fixed z-50 w-full gap-5 px-6 py-2 shadow-md sm:px-12">
      <Link href="/">
        {/* Mobile Logo */}
        <div className="flex lg:hidden">
          <Image src={"/images/logoImg.png"} alt="Query-Hive" width={30} height={30} />
        </div>
        {/* Desktop Logo */}
        <div className="hidden lg:flex">
          <Image src={"/images/LOGO.png"} alt="Query-Hive" width={150} height={150} />
        </div>
      </Link>
      {/* Global Search */}
      <GlobalSearch />
      {/* Profile */}
      <div className="flex items-center justify-between gap-5">
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
