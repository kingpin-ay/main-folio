import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Youtube } from "lucide-react";

export function getCorrectSocialLinkIcon(
  type: "GITHUB" | "YOUTUBE" | "X" | "MAIL" | "LINKEDLN"
) {
  switch (type) {
    case "GITHUB":
      return <Github className="h-5 w-5" />;
    case "YOUTUBE":
      return <Youtube className="h-5 w-5" />;
    case "X":
      return <Twitter className="h-5 w-5" />;
    case "MAIL":
      return <Mail className="h-5 w-5" />;
    case "LINKEDLN":
      return <Linkedin className="h-5 w-5" />;
    default:
      return null;
  }
}

export default function Footer({
  fullName,
  socialLinks,
}: {
  fullName: string;
  socialLinks: {
    linkType: "GITHUB" | "YOUTUBE" | "X" | "MAIL" | "LINKEDLN";
    link: string;
  }[];
}) {
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link href="#home" className="text-xl font-bold">
            Portfolio
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {fullName}. All rights reserved.
          </p>
        </div>

        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <Link
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label={link.linkType}
              key={link.link}
            >
              {getCorrectSocialLinkIcon(link.linkType)}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
