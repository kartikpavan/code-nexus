import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl">Hey ! </h1>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
