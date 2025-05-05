'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiChevronDown, FiBriefcase, FiImage, FiBookOpen, FiHelpCircle, FiFileText, FiDollarSign, FiUsers, FiAward } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

// Define menu structure
interface MenuItem {
  name: string;
  href: string;
  icon?: React.ElementType;
  highlight?: string; // Optional highlight text for dropdown items
}

interface NavItem {
  name: string;
  href?: string; // Optional for top-level items that are just dropdown triggers
  icon?: React.ElementType;
  dropdown?: MenuItem[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true)
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(true)
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  
  // Check if we're on the get-started page OR home page
  const isGetStartedPage = pathname === '/get-started'
  const isHomePage = pathname === '/home'
  const hideHeaderInitially = isGetStartedPage || isHomePage

  // Define Navigation Items using the new structure
  const navItems: NavItem[] = [
    { name: 'How it Works', href: '/how-it-works', icon: FiBriefcase },
    { name: 'Gallery', href: '/gallery', icon: FiImage },
    {
      name: 'Resources',
      icon: FiBookOpen,
      dropdown: [
        { name: 'Guide', href: '/guide', icon: FiFileText, highlight: 'Your renovation roadmap' },
        { name: 'FAQ', href: '/resources/faq', icon: FiHelpCircle, highlight: 'Answers to common questions' },
        { name: 'Blog', href: '/blog', icon: FiFileText, highlight: 'Tips, trends, and insights' },
        { name: 'Pricing Calculator', href: '/pricing', icon: FiDollarSign, highlight: 'Estimate your project cost' },
        { name: 'Referral Program', href: '/real-estate-referral', icon: FiUsers, highlight: 'Partner with us' },
      ]
    },
    { name: 'For Contractors', href: '/for-contractors', icon: FiAward },
  ];

  useEffect(() => {
    // Check if we're on mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Use lg breakpoint for desktop nav switch
    }
    
    // Run once on mount
    checkIsMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  useEffect(() => {
    // Initialize header visibility based on page type
    if (hideHeaderInitially) {
      setHeaderVisible(false)
      setMobileHeaderVisible(false)
    } else {
      setHeaderVisible(true)
      setMobileHeaderVisible(true)
    }
    
    // Handle scroll events
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Shrink effect
      if (currentScrollY > 10) {
        setIsHeaderShrunk(true);
      } else {
        setIsHeaderShrunk(false);
      }
      
      // Visibility logic
      if (hideHeaderInitially) { // Apply same logic for home and get-started
        if (currentScrollY < lastScrollY.current && currentScrollY < 300) {
          setHeaderVisible(true)
          setMobileHeaderVisible(true)
        } else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
          setHeaderVisible(false)
          setMobileHeaderVisible(false)
        }
      } else if (isMobile) { // Standard mobile logic
        if (currentScrollY < lastScrollY.current) {
          setMobileHeaderVisible(true)
        } else if (currentScrollY > 50 && currentScrollY > lastScrollY.current && !isMenuOpen) {
          setMobileHeaderVisible(false)
        }
      } else { // Standard desktop logic
        if (currentScrollY > 150 && currentScrollY > lastScrollY.current) {
           setHeaderVisible(false)
        } else {
           setHeaderVisible(true)
        }
      }
      
      lastScrollY.current = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hideHeaderInitially, isMobile, isMenuOpen]) // Added hideHeaderInitially to dependency array

  // Handle menu opening - ensure header is visible when menu is open
  const handleMenuToggle = () => {
    const newMenuState = !isMenuOpen
    setIsMenuOpen(newMenuState)
    if (newMenuState) {
      setMobileHeaderVisible(true)
      if (hideHeaderInitially) { // Ensure visibility on home/get-started when menu opens
        setHeaderVisible(true)
      }
    }
    // Close resources dropdown when main mobile menu closes
    if (!newMenuState) setIsResourcesOpen(false);
  }

  const handleMouseEnter = (itemName: string) => {
    if (!isMobile) {
      setActiveDropdown(itemName);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  // Close mobile menu and dropdowns on link click
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${ 
      // Use combined logic for initial visibility
      isMobile ? (mobileHeaderVisible ? 'translate-y-0' : '-translate-y-full') : 
      (headerVisible ? 'translate-y-0' : '-translate-y-full')
    } ${ 
      // Shrink effect styling
      isHeaderShrunk ? 'bg-white shadow-md py-2' : 'bg-white py-4'
    }`}> 
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group" onClick={handleMobileLinkClick}>
            <Image 
              src="/images/logos/logo.png"
              alt="Renovation Bridge Logo" 
              width={180} 
              height={40}
              className={`transition-all duration-300 ${
                isHeaderShrunk 
                  ? 'w-[140px] lg:w-[160px]'
                  : 'w-[160px] lg:w-[180px]'
              }`}
              style={{ height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Navigation - Hidden on get-started page AND home page */}
          {!hideHeaderInitially && (
            <nav className="hidden lg:flex items-center space-x-1 flex-grow justify-center">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative px-1"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.dropdown && handleMouseLeave()}
                >
                  {item.href ? (
                     <Link
                       href={item.href}
                       className={`group relative px-3 py-2 font-semibold text-sm rounded-md transition-all duration-200 flex items-center text-gray-700 hover:text-primary hover:bg-primary/10 ${
                         activeDropdown === item.name ? 'text-primary bg-primary/10' : ''
                       }`}
                     >
                       {item.icon && <item.icon className={`mr-1.5 h-4 w-4 text-primary/80 group-hover:text-primary transition-colors duration-200 ${activeDropdown === item.name ? 'text-primary' : ''}`} />}
                       <span>{item.name}</span>
                     </Link>
                  ) : (
                    <button
                      className={`group relative px-3 py-2 font-semibold text-sm rounded-md transition-all duration-200 flex items-center text-gray-700 hover:text-primary hover:bg-primary/10 ${
                         activeDropdown === item.name ? 'text-primary bg-primary/10' : ''
                      }`}
                       onClick={(e) => e.preventDefault()}
                     >
                       {item.icon && <item.icon className={`mr-1.5 h-4 w-4 text-primary/80 group-hover:text-primary transition-colors duration-200 ${activeDropdown === item.name ? 'text-primary' : ''}`} />}
                       <span>{item.name}</span>
                       {item.dropdown && (
                         <FiChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180 text-primary' : 'text-gray-500 group-hover:text-primary'}`} />
                       )}
                     </button>
                  )}

                  {/* Desktop Dropdown Panel */}
                  {item.dropdown && (
                    <div
                      className={`
                        absolute left-0 w-64 rounded-md
                        bg-white ring-1 ring-gray-200 shadow-lg shadow-gray-300/20
                        transition-all duration-200 ease-out origin-top
                        ${activeDropdown === item.name
                          ? 'opacity-100 scale-100 visible'
                          : 'opacity-0 scale-95 invisible pointer-events-none'}
                      `}
                    >
                      <div className="p-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="group flex flex-col rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-primary/5"
                          >
                            <div className="flex items-center">
                               {subItem.icon && <subItem.icon className="mr-2 h-4 w-4 text-primary/70 group-hover:text-primary transition-colors duration-150" />}
                              <span className="font-medium text-sm text-gray-800 group-hover:text-primary transition-colors duration-150">
                                {subItem.name}
                              </span>
                            </div>
                            {subItem.highlight && (
                              <span className="ml-6 text-xs text-gray-500 group-hover:text-gray-600 mt-0.5 transition-colors duration-150">
                                {subItem.highlight}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* CTA Button - Hidden on get-started page AND home page */}
          {!hideHeaderInitially && (
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link href="/get-started" className={`cta-btn transform hover:scale-105 transition-all duration-300 whitespace-nowrap ${
                isHeaderShrunk
                  ? 'px-4 py-1.5 text-sm'
                  : 'px-5 py-2 text-sm'
              }`}>
                GET STARTED
              </Link>
            </div>
          )}

          {/* Spacer on get-started AND home page for mobile */}
          {hideHeaderInitially && <div className="flex-grow lg:hidden"></div>}

          {/* Mobile Menu Button - Always visible on mobile, AND on desktop for get-started/home */}
          <button
            className={`text-gray-500 hover:text-gray-700 focus:outline-none ${hideHeaderInitially ? 'lg:block' : 'lg:hidden'} flex-shrink-0 ml-auto`}
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Hidden on get-started/home page, but shown when menu is open */} 
      {isMenuOpen && ( 
        <div className={`bg-white px-4 pt-2 pb-4 shadow-inner lg:hidden ${hideHeaderInitially ? 'block' : 'block'}`}> {/* Simplified logic, always block when isMenuOpen */}
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.href && !item.dropdown ? (
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-800 hover:text-primary py-2.5 transition-colors"
                    onClick={handleMobileLinkClick}
                  >
                     {item.icon && <item.icon className="mr-3 h-5 w-5 text-primary/80" />}
                    {item.name}
                  </Link>
                ) : item.dropdown ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full text-gray-800 hover:text-primary py-2.5 transition-colors"
                      onClick={() => setIsResourcesOpen(item.name === 'Resources' ? !isResourcesOpen : false)}
                    >
                      <span className="flex items-center">
                         {item.icon && <item.icon className="mr-3 h-5 w-5 text-primary/80" />}
                        {item.name}
                      </span>
                      <FiChevronDown className={`h-4 w-4 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isResourcesOpen && item.name === 'Resources' && (
                      <div className="pl-5 ml-3 space-y-1 border-l-2 border-primary/30 animate-slideDown overflow-hidden">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center py-2 text-gray-700 hover:text-primary transition-all duration-200 transform translate-x-0 hover:translate-x-1"
                            onClick={handleMobileLinkClick}
                          >
                             {subItem.icon && <subItem.icon className="mr-3 h-4 w-4 text-primary/70" />}
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="flex items-center text-gray-800 hover:text-primary py-2.5 transition-colors"
                    onClick={handleMobileLinkClick}
                  >
                     {item.icon && <item.icon className="mr-3 h-5 w-5 text-primary/80" />}
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="pt-3 flex flex-col space-y-3 border-t border-gray-200 mt-3">
               <Link
                 href="/get-started" 
                 className="cta-btn text-center transform hover:scale-105 transition-transform duration-200 px-3 py-2" 
                 onClick={handleMobileLinkClick}
               > 
                 GET STARTED
               </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header 