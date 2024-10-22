import { cn } from '@/utils/cn'

type Props = {
  isOpen: boolean
  toggleMenu: () => void
}
const genericHamburgerLine =
  'h-1 my-1 rounded-full bg-black transition ease transform duration-300 opacity-50 group-hover:opacity-100 w-full dark:bg-gray-100'

export default function NavButton({ isOpen, toggleMenu }: Props) {
  return (
    <button
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-controls="menuNav"
      aria-expanded={isOpen}
      title={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-haspopup="true"
      type="button"
      id="openIcon"
      className={cn(
        'fixed md:w-12 top-2 right-0 flex flex-col z-50 items-center justify-center w-5 h-32 group bg-slate-600 rounded-l-md dark:border-gray-100 mt-5 p-2 hover:scale-x-110',
        {
          'w-8 h-10 mr-2 p-0 mt-2 mb-0 bg-transparent': isOpen,
        }
      )}
      onClick={toggleMenu}
    >
      <span
        className={cn(
          genericHamburgerLine,
          { 'md:w-0': !isOpen },
          {
            'rotate-45 translate-y-3 bg-white': isOpen,
          }
        )}
      />
      <span
        className={cn(
          genericHamburgerLine,
          { 'md:w-0': !isOpen },
          {
            'opacity-0 group-hover:opacity-0 bg-white': isOpen,
          }
        )}
      />
      <span
        className={cn(
          genericHamburgerLine,
          { 'md:w-0': !isOpen },
          {
            '-rotate-45 -translate-y-3 bg-white': isOpen,
          }
        )}
      />
      <span
        className={cn('hidden text-gray-200', { 'md:block h-full': !isOpen })}
      >
        ☰ القائمة
      </span>
    </button>
  )
}
