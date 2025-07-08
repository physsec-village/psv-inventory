"use client"

import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../app/lib/utils"
import { Button } from "./ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { Package, BarChart3, Settings, Home } from "lucide-react"

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    name: "Manufacturing",
    href: "/manufacturing",
    icon: Settings,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Image
                src="/psv-logo.png"
                width={50}
                height={50}
                alt=""
                role="presentation"
            />
            <div className="text-3xl">PSV Inventory</div>
          </div>
        </div>

        <NavigationMenu className="ml-8">
          <NavigationMenuList>
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), isActive && "bg-accent text-accent-foreground")}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <SignedOut>
              <SignInButton />
          </SignedOut>
          <SignedIn>
              <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export function NavbarOld(){
    return (<>
        <div className="flex flex-col px-6 py-6 gap-2">
            <div id="navbar-top" className="flex justify-between">
                <div id="branding" className="flex gap-1 items-center">
                </div>
            <div>
            </div>
            </div>
            <div id="navbar-bottom">
                <nav>
                    <ul className="flex gap-2">
                    <li>
                        <Link href="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/inventory">Inventory</Link>
                    </li>
                    <li>
                        <Link href="/manufacturing">Manufacturing</Link>
                    </li>
                    <li>
                        <Link href="/reports">Reports</Link>
                    </li>
                    </ul>
                </nav>
            </div>
        </div>
    </>);
}