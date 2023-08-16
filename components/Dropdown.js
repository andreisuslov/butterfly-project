import { useState, useRef, useEffect } from 'react'
import Link from './Link'

const Dropdown = ({ title, links, isOpen, onToggle, onMouseEnter, onMouseLeave }) => {
  const handleButtonClick = () => {
    onToggle(isOpen ? null : title)
  }

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={handleButtonClick}
        className="font-small p-3 text-gray-900 dark:text-gray-100 sm:p-2"
      >
        {title}{' '}
        <span
          className={`${isOpen ? 'rotate-180 transform' : ''} inline-block transition-transform`}
          style={{ fontSize: '0.5em' }}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 w-56 origin-top-left rounded-md bg-white shadow-lg">
          <div className="rounded-md ring-1 ring-black ring-opacity-5">
            {links.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
