'use client'
import { navItems, tw } from '@/shared/lib'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'

function Navbar() {
  const [mainMenuOpen, setMainMenuOpen] = useState<string | null>(null)
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null)

  const toggleMainMenu = (label: string) => {
    setMainMenuOpen(prev => (prev === label ? null : label))
    setSubMenuOpen(null)
  }
  const toggleSubMenu = (label: string) => {
    setSubMenuOpen(prev => (prev === label ? null : label))
  }

  return (
    <ul className="flex flex-col gap-2 p-4 cursor-pointer">
      <Image
        src="/zoopzoop.png"
        alt="logo"
        width={100}
        height={40}
        className="mb-2 hidden sm:block"
      />
      <h1 className="text-green-normal font-bold text-2xl text-center p-1 w-10 h-10 rounded-md border sm:hidden">
        쯉
      </h1>
      <li className="flex items-center gap-2 px-1 py-1 sm:rounded-md sm:bg-green-light sm:px-3 sm:py-2 ">
        {/* TODO: 사용자 이미지 연동*/}
        <div className="w-7 h-7 overflow-hidden rounded-full border-1">
          <Image
            src="/zoopzoop.png"
            alt="user image"
            width={30}
            height={30}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-base hidden sm:block">안녕하세요. 사용자님</p>
      </li>

      {navItems.map((item, index) => {
        const Icon = item.icon
        const isMainMenuOpen = mainMenuOpen === item.label
        return (
          <Fragment key={index}>
            <li
              key={index}
              onClick={() => toggleMainMenu(item.label)}>
              <Link
                href={item.href}
                className={tw(
                  'flex items-center justify-center sm:justify-start px-2.5 py-2 rounded-md font-bold text-base hover:bg-orange-accent  sm:px-3 sm:gap-4',
                  !isMainMenuOpen
                    ? 'bg-white text-black'
                    : 'bg-green-normal text-white',
                  'w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:gap-4 px-2.5 py-2'
                )}>
                {Icon && (
                  <span title={item.label}>
                    <Icon
                      size={20}
                      className={tw(
                        !isMainMenuOpen ? 'text-darker' : 'text-white'
                      )}
                    />
                  </span>
                )}
                <p className="hidden sm:block flex-1">{item.label}</p>
                {item.count && (
                  <span className="hidden sm:block">{item.count}</span>
                )}
              </Link>
            </li>

            {isMainMenuOpen && item.children && (
              <ul className="flex flex-col gap-1 border-l-2 ml-4 border-green-normal">
                {item.children.map((child, idx) => {
                  const ChildIcon = child.icon
                  const isSubMenuOpen = subMenuOpen === child.label
                  return (
                    <Fragment key={idx}>
                      <li onClick={() => toggleSubMenu(child.label)}>
                        <Link
                          href={child.href}
                          className={tw(
                            'flex items-center gap-4 px-3 py-2 rounded-r-md rounded-br-md  text-base  hover:bg-gray-100',
                            !isSubMenuOpen
                              ? 'bg-white text-dark'
                              : 'bg-green-light-active font-bold text-black'
                          )}>
                          {ChildIcon && (
                            <ChildIcon
                              size={20}
                              className={tw(
                                !isSubMenuOpen ? 'text-dark' : 'text-black'
                              )}
                            />
                          )}
                          <p className="hidden sm:block">{child.label}</p>
                        </Link>
                      </li>
                    </Fragment>
                  )
                })}
              </ul>
            )}
          </Fragment>
        )
      })}
    </ul>
  )
}
export default Navbar
