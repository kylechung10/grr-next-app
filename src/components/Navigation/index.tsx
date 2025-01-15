import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import NavigationAccount from "./navigation-account";

export default function Navigation() {
  const menuData = [
    {
      href: "/",
      text: "Home",
    },
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

  const menuItem = (href: string, text: string, key: number) => {
    return (
      <NavigationMenuItem key={key}>
        <Link href={href} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {text}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  };

  return (
    <div className="bg-primary-green w-screen flex justify-center">
      <NavigationMenu className="max-w-screen-lg mx-4">
        <NavigationMenuList className="w-full">
          <NavigationMenuItem>
            <Link href="/" className="block items-center">
              <Image
                src="/images/grr-white-nobg.png"
                width={100}
                height={100}
                alt="Grass Roots Racing"
              />
            </Link>
          </NavigationMenuItem>
          {menuData.map((item, key) => {
            return menuItem(item.href, item.text, key);
          })}
        </NavigationMenuList>
        <NavigationAccount />
      </NavigationMenu>
    </div>
  );
}
