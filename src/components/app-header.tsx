'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterButton, WalletButton } from '@/components/solana/solana-provider'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header className="relative z-50 px-4 py-3 bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-800 dark:to-violet-800 text-white shadow-lg">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-3 hover:opacity-80 transition-opacity" href="/">
            <Image
              src="/third-time-icon-tiny-white.png"
              alt="Third Time"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-xl font-bold">Third Time</span>
          </Link>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-6 flex-nowrap items-center">
              {links.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className={`hover:text-purple-200 transition-colors ${isActive(path) ? 'text-purple-200 font-semibold' : 'text-white'}`}
                    href={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-purple-700"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className="hidden md:flex items-center gap-4">
          <WalletButton size="sm" />
          <ClusterButton size="sm" />
          <ThemeSelect />
        </div>

        {showMenu && (
          <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-purple-600/95 dark:bg-purple-800/95 backdrop-blur-sm">
            <div className="flex flex-col p-4 gap-4 border-t border-purple-500 dark:border-purple-700">
              <ul className="flex flex-col gap-4">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      className={`hover:text-purple-200 transition-colors block text-lg py-2 ${isActive(path) ? 'text-purple-200 font-semibold' : 'text-white'}`}
                      href={path}
                      onClick={() => setShowMenu(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <WalletButton />
                <ClusterButton />
                <ThemeSelect />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
