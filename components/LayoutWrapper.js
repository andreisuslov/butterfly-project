import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import Dropdown from './Dropdown'
import { useState, useRef, useEffect } from 'react'

const LayoutWrapper = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(null)
  const timeoutRef = useRef(null)
  const lastHoveredDropdown = useRef(null)

  const handleDropdownMouseEnter = (dropdownTitle) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    lastHoveredDropdown.current = dropdownTitle
  }

  const handleDropdownMouseLeave = () => {
    if (lastHoveredDropdown.current === openDropdown) {
      timeoutRef.current = setTimeout(() => {
        setOpenDropdown(null)
      }, 500)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-4">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>

          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => {
                if (link.title === 'ABOUT US') {
                  return (
                    <Dropdown
                      key={link.title}
                      title={link.title}
                      links={[
                        { title: 'OUR MISSION', href: '/our-mission' },
                        { title: 'FINANCIALS', href: '/financials' },
                        { title: 'LEADERSHIP', href: '/leadership' },
                      ]}
                      isOpen={openDropdown === 'ABOUT US'}
                      onToggle={setOpenDropdown}
                      onMouseEnter={() => handleDropdownMouseEnter('ABOUT US')}
                      onMouseLeave={handleDropdownMouseLeave}
                    />
                  )
                }
                if (link.title === 'WHY EB') {
                  return (
                    <Dropdown
                      key={link.title}
                      title={link.title}
                      links={[
                        { title: 'WHAT IS EB', href: '/what-is-eb' },
                        { title: 'BLOG', href: '/blog' },
                      ]}
                      isOpen={openDropdown === 'WHY EB'}
                      onToggle={setOpenDropdown}
                      onMouseEnter={() => handleDropdownMouseEnter('WHY EB')}
                      onMouseLeave={handleDropdownMouseLeave}
                    />
                  )
                }
                if (link.title === 'GET INVOLVED') {
                  return (
                    <Dropdown
                      key={link.title}
                      title={link.title}
                      links={[
                        { title: 'SPONSOR A PROJECT', href: '/sponsor' },
                        { title: 'FUNDRAISE', href: '/funcdraise' },
                        { title: 'DONATE ONLINE', href: '/donate-online' },
                        { title: 'DONATE BY MAIL', href: '/donate-by-mail' },
                        { title: 'SHOP OUR STORE', href: '/store' },
                      ]}
                      isOpen={openDropdown === 'GET INVOLVED'}
                      onToggle={setOpenDropdown}
                      onMouseEnter={() => handleDropdownMouseEnter('GET INVOLVED')}
                      onMouseLeave={handleDropdownMouseLeave}
                    />
                  )
                }
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="font-small p-3 text-gray-900 dark:text-gray-100 sm:p-2"
                  >
                    {link.title}
                  </Link>
                )
              })}
            </div>
            <MobileNav />
          </div>
        </header>

        <main className="mb-auto">{children}</main>

        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
