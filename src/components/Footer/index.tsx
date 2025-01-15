import React from "react";
import Link from "next/link";
import discordIcon from "../../../public/discord-icon.svg";
import twitchIcon from "../../../public/twitch-icon.svg";
import Image from "next/image";

function Footer() {
  const footerData = [
    {
      href: "/series",
      text: "Series",
    },
    {
      href: "/schedule",
      text: "Schedule",
    },
    {
      href: "/results",
      text: "Results",
    },
  ];

  const footerItem = (href: string, text: string, key: number) => {
    return (
      <li key={key}>
        <Link href={href} className="text-slate-50">
          {text}
        </Link>
      </li>
    );
  };

  return (
    <footer className="flex justify-center bg-gray-800 p-4">
      <div className="w-full max-w-screen-lg flex justify-between">
        <div>
          <b className="text-slate-50">Grass Roots Racing</b>
          <ul>
            {footerData.map((item, key) => {
              return footerItem(item.href, item.text, key);
            })}
          </ul>
        </div>
        <div>
          <ul className="flex gap-4">
            <li>
              <Link
                href="https://discord.com/invite/grassrootsracing"
                target="_blank"
              >
                <Image
                  src={discordIcon}
                  alt="Discord Icon"
                  width={24}
                  height={24}
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.twitch.tv/grassrootsracing"
                target="_blank"
              >
                <Image
                  src={twitchIcon}
                  alt="Twitch Icon"
                  width={24}
                  height={24}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
