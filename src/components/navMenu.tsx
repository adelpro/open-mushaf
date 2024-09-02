'use client'
import { useState } from 'react'

import Link from 'next/link'

import useLocalStorage from '@/hooks/useLocalStorage'
import { cn } from '@/utils/cn'

// eslint-disable-next-line prettier/prettier
import NavButton from './navButton'
// eslint-disable-next-line prettier/prettier
import packageJson from '../../package.json'

export default function NavMenu() {
  console.log('packageJson', packageJson.version)
  const [isOpen, setIsOpen] = useState(false)
  const [index, _] = useLocalStorage<string>('index', '1')
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION

  return (
    <div>
      <div className="fixed flex items-end top-0 right-0 w-1 h-full bg-slate-600 z-30" />
      {/* Menu button */}
      <NavButton isOpen={isOpen} toggleMenu={toggleMenu} />

      {/* Overlay */}
      <div
        className={cn('fixed hidden bg-gray-800 opacity-50', {
          'block inset-0 h-full': isOpen,
        })}
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(false)
          }
        }}
        role="button"
        tabIndex={0}
        aria-hidden={!isOpen}
      />

      {/* Menu */}
      <nav
        className={cn(
          'fixed top-0 right-0 h-full rounded-l-xl w-64 bg-gray-800 text-white transform translate-x-full transition-transform duration-300 ease-in-out z-30 pt-16 mt-2',
          { 'translate-x-0': isOpen }
        )}
        aria-label="Navigation"
        id="nav"
        role="navigation"
      >
        <ul className="flex flex-col mt-1 space-y-4 px-4">
          <li>
            <Link
              href={`/mushaf/${index}`}
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              المصحف
            </Link>
          </li>
          <li>
            <Link
              href="/suras"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              فهرس السور
            </Link>
          </li>
          <li>
            <Link
              href="/chapters"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              فهرس الأجزاء
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              إتصل بنا
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              حول الموقع
            </Link>
          </li>
          {/*  <li>
            <Link
              href="/download-offline"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              تنزيل المعطيات
            </Link>
          </li> */}
        </ul>
        <span className="fixed bottom-0 right-0 p-2 bg-gray-700 text-sm text-gray-400 rounded-tl-md shadow-lg z-30">
          الإصدار: {packageJson.version}
        </span>
      </nav>
    </div>
  )
}
