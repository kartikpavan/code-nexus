import { Github, Link2, Linkedin, Mail, Twitter } from "lucide-react";
import { Suspense } from "react";
import AboutPageLoading from "./loading";

const AboutPage = () => {
  return (
    <>
      <Suspense fallback={<AboutPageLoading />}>
        <h1 className="text-3xl font-bold mb-4">About Code Nexus</h1>

        <p className="text-lg mb-6">
          Welcome to Code Nexus - a passion project crafted to hone my skills and explore the
          ever-evolving landscape of web development.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">What Drives Code Nexus?</h2>
          <p className="text-base">
            Code Nexus is born out of a desire to experiment, learn, and grow. As a developer, I
            strive to create a space where knowledge exchange is not just encouraged but celebrated.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
          <p className="text-base">
            Code Nexus is a testament to my proficiency with technologies such as NextJS, ReactJS,
            TypeScript, Tailwind CSS, Shadcn UI, and MongoDB. The journey of building this platform
            has been a continuous learning experience, and I'm excited to share it with you.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Connect with Me</h2>
          <ul className="space-y-5">
            <li className="flex gap-1 items-center">
              <Link2 className="text-gray-500" size={18} />
              <a
                href="https://code-nexus-zeta.vercel.app/"
                target="_blank"
                className="text-blue-500"
              >
                Visit Code Nexus
              </a>
            </li>
            <li className="flex gap-1 items-center">
              <Github className="text-gray-500" size={18} />
              <a
                href="https://github.com/kartikpavan/code-nexus"
                target="_blank"
                className="text-blue-500"
              >
                GitHub{" "}
              </a>
            </li>
            <li className="flex gap-1 items-center">
              <Twitter className="text-gray-500" size={18} />
              <a href="https://twitter.com/kartik_im" target="_blank" className="text-blue-500">
                Twitter{" "}
              </a>
            </li>
            <li className="flex gap-1 items-center">
              <Linkedin className="text-gray-500" size={18} />
              <a
                href="https://www.linkedin.com/in/kartikpavan/"
                target="_blank"
                className="text-blue-500"
              >
                LinkedIn Profile
              </a>
            </li>
            <li className="flex gap-1 items-center">
              <Mail className="text-gray-500" size={18} />
              <a href="mailto:kartikpavan2@gmail.com" target="_blank" className="text-blue-500">
                kartikpavan2@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <p className="text-sm mt-5">
          I'm always open to collaboration, feedback, and connecting with fellow enthusiasts. Feel
          free to reach out via email or connect with me on social media.
        </p>

        <p className="text-sm mt-4">
          Thank you for being part of this journey. Happy coding! 👩‍💻🚀👨‍💻
        </p>
      </Suspense>
    </>
  );
};

export default AboutPage;
