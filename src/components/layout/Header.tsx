'use client'

import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiChevronDown, FiBriefcase, FiImage, FiBookOpen, FiHelpCircle, FiFileText, FiDollarSign, FiUsers, FiAward } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import MenuButton from '../ui/MenuButton'
import CloseButton from '../ui/CloseButton'

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
  const [menuVisible, setMenuVisible] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  
  // Refs for click-outside and scroll logic
  const desktopNavRef = useRef<HTMLElement>(null); // For desktop nav items container
  const mobileMenuContainerRef = useRef<HTMLDivElement>(null); // For the mobile menu dropdown panel
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null); // For the mobile menu toggle button
  
  // ---> DECLARE VARIABLES NEEDED BY HOOKS FIRST <---
  const isGetStartedPage = pathname === '/get-started'

  // Moved handleMenuToggle definition earlier as it's used by useEffect hooks
  const handleMenuToggle = useCallback(() => {
    const newMenuState = !isMenuOpen
    
    if (newMenuState) {
      setMenuVisible(true)
      setTimeout(() => {
        setIsMenuOpen(true)
      }, 10)
      setMobileHeaderVisible(true) 
    } else {
      setIsMenuOpen(false)
      setTimeout(() => {
        setMenuVisible(false)
      }, 300) 
      setIsResourcesOpen(false);
    }
  }, [isMenuOpen, setMenuVisible, setIsMenuOpen, setMobileHeaderVisible, setIsResourcesOpen]);

  // ---> HOOKS MOVED HERE <--- (or rather, hooks using handleMenuToggle come after its definition)
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

  // Effect for Click-Outside functionality
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Mobile menu click-outside
      if (isMobile && isMenuOpen) {
        if (
          mobileMenuContainerRef.current &&
          !mobileMenuContainerRef.current.contains(event.target as Node) &&
          mobileMenuButtonRef.current &&
          !mobileMenuButtonRef.current.contains(event.target as Node)
        ) {
          if (isMenuOpen) { // Ensure menu is still open before toggling
             handleMenuToggle();
          }
        }
      }

      // Desktop dropdown click-outside
      if (!isMobile && activeDropdown) {
        if (
          desktopNavRef.current &&
          !desktopNavRef.current.contains(event.target as Node)
        ) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isMenuOpen, activeDropdown, handleMenuToggle, desktopNavRef, mobileMenuContainerRef, mobileMenuButtonRef]);

  useEffect(() => {
    // Initialize header visibility
    setHeaderVisible(true)
    setMobileHeaderVisible(true)

    // Handle scroll events
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      // Shrink effect
      if (currentScrollY > 10) {
        setIsHeaderShrunk(true);
      } else {
        setIsHeaderShrunk(false);
      }

      // Mobile visibility logic
      if (isMobile) {
        if (!scrollingDown) { // Scrolling up or stationary
          setMobileHeaderVisible(true);
        } else { // Scrolling down
          if (currentScrollY > 50) { // Past threshold
            if (isMenuOpen) {
              // If menu is open and we're scrolling down, close the menu.
              // The header will remain visible during this scroll event.
              handleMenuToggle();
            } else {
              // Menu is closed, and we're scrolling down past threshold. Hide header.
              setMobileHeaderVisible(false);
            }
          }
        }
      }

      // Desktop visibility logic
      if (!isMobile) {
        if (currentScrollY > 150 && scrollingDown) {
          if (activeDropdown) {
            setActiveDropdown(null); // Close desktop dropdown before hiding header
          }
          setHeaderVisible(false);
        } else {
          setHeaderVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, isMenuOpen, activeDropdown, handleMenuToggle]);
  // ---> END HOOKS MOVED HERE <---

  // If on get-started page, don't render header at all
  if (isGetStartedPage) {
    return null
  }

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
      <div className="container-custom relative">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group" onClick={handleMobileLinkClick}>
            <div className="flex items-center justify-center">
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
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-grow justify-center" ref={desktopNavRef}>
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

          {/* CTA Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link href="/get-started" className={`cta-btn transform hover:scale-105 transition-all duration-300 whitespace-nowrap ${
              isHeaderShrunk
                ? 'px-4 py-1.5 text-sm'
                : 'px-5 py-2 text-sm'
            }`}>
              GET STARTED
            </Link>
          </div>

          {/* Mobile Menu Button Container */}
          <div className="relative flex-shrink-0 ml-auto flex items-center lg:hidden">
            {/* Button */}
            <button
              ref={mobileMenuButtonRef}
              className="text-gray-500 hover:text-gray-700 focus:outline-none z-50 flex items-center justify-center"
              onClick={handleMenuToggle}
            >
              {/* Use MenuButton for both open and closed states, switching icon with 'open' prop */}
              <MenuButton size={24} open={isMenuOpen} />
            </button>
            
            {/* Dropdown Menu */}
            <div 
              ref={mobileMenuContainerRef}
              className={`absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg px-6 pt-3 pb-4 w-64 z-40 border border-gray-200 transition-all duration-300 ease-in-out origin-top-right ${
                isMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
              }`}
              style={{ display: isMenuOpen || menuVisible ? 'block' : 'none' }}
            >
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
                          <div className="pl-5 ml-3 space-y-1 border-l-2 border-primary/30 overflow-hidden transition-all duration-300 ease-in-out transform origin-top">
                            {item.dropdown.map((subItem, index) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`flex items-center py-2 text-gray-700 hover:text-primary transition-all duration-200 transform translate-x-0 hover:translate-x-1 opacity-0 animate-fade-slide-in`}
                                onClick={handleMobileLinkClick}
                                style={{ animationDelay: `${index * 50}ms` }}
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
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 