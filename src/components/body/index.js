import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  Button

} from "@nextui-org/react";
import { Logo } from "./logo.js";
import {ChevronDown} from './icons'
import PArt from "../paintingArt/index.js";
import Contact from '../contact/index.js'
import AboutMe from "../aboutMe/index.js";
import Bg from '../../imgs/bg.png'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [isPaintLine, setIsPaintLine] = useState('none')
  const [isAboutLine, setIsAboutLine] = useState('none')
  const [isContactLine, setIsContactLine] = useState('none')
  const [isServicesLine, setIsServicesLine] = useState('none')

  const [shouldHideOnScroll, setShouldHideOnScroll] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // capture current window size
  useEffect(() => {
    const handleWindowSizeChange = () => {
      const currentWindowWidth = window.innerWidth
      if (currentWindowWidth > 640) { // stick on top if it is not a small screen.
        setShouldHideOnScroll(false)
        setIsSmallScreen(false)
      } else {
        setShouldHideOnScroll(true)
        setIsSmallScreen(true)
      }
    }
    window.addEventListener('resize', handleWindowSizeChange)
    return ()=> {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  // Function to scroll to the Contact section
  const scrollToComponent = (e) => {
    console.log(isMenuOpen)
    if (isMenuOpen === true) {
      setShouldHideOnScroll(false) // If the side menu is open, then stick on scroll.
    } else if(isSmallScreen === true) {
      setShouldHideOnScroll(true)
    }
    const targetHref = e.target.href
    // console.log(e.target.href)
    if (targetHref.endsWith('#target-paint')) {
      setIsPaintLine('always')
      setIsAboutLine('none')
      setIsContactLine('none')
      setIsServicesLine('none')
    } else if(targetHref.endsWith('#target-about')) {
      setIsPaintLine('none')
      setIsAboutLine('always')
      setIsContactLine('none')
      setIsServicesLine('none')
    } else if(targetHref.endsWith('#target-contact')) {
      setIsPaintLine('none')
      setIsAboutLine('none')
      setIsContactLine('always')
      setIsServicesLine('none')
    } else if(targetHref.endsWith('#target-services')) {
      setIsPaintLine('none')
      setIsAboutLine('none')
      setIsContactLine('none')
      setIsServicesLine('always')
    } 
  };

  const menuItems = [
    {
      name: "PAINTING ART.",
      href: "#target-paint",
      underline: {isPaintLine}
    },
    {
      name: "ABOUT ME.",
      href: "#target-about",
      underline: {isAboutLine}
    },
    {
      name: "CONTACT.",
      href: "#target-contact",
      underline: {isContactLine}
    }, {
      name: "SERVICES.",
      href: "#target-services",
      underline: {isServicesLine}
    }
  ];

  return (
    <>
      {/* Top header for the large screen. */}
      <div className="w-full h-auto pt-8 z-10 flex-col hidden lg:block">
        <div className='w-screen flex justify-center'>
          <Logo width='w-30' height='w-30'/>
        </div>
        
        <div className='w-screen text-center font-sans mt-8 mb-8'>
          <span className="border-t-1 border-slate-500 pt-2 text-base word-spacing-wider tracking-widest">the urban art portfolio</span>
        </div>
      </div>

        <Navbar shouldHideOnScroll={shouldHideOnScroll} 
          onMenuOpenChange={setIsMenuOpen} 
          className="drop-shadow-sm lg:drop-shadow-none flex items-center bg-white bg-opacity-96"
        >
          <NavbarContent className="flex justify-between lg:hidden ">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand className="block lg:hidden flex flex-row gap-1 justify-center pr-20">
              <Logo width='w-9' height='w-9'/>
              <p className="font-bold text-inherit">GOLNAZ</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden lg:flex flex-row justify-items-center">
            
            <NavbarItem className="basis-1/4 text-center">
              <Link color="foreground" underline={isPaintLine} className="text-2xl font-georgian" href="#target-paint"  onClick={scrollToComponent}>
              PAINTING ART.
              </Link>
            </NavbarItem>
            <NavbarItem className="basis-1/4 text-center">
              <Link color="foreground" underline={isAboutLine} className="text-2xl font-georgian"  href="#target-about" onClick={scrollToComponent}>
              ABOUT ME.
              </Link>
            </NavbarItem>
            <NavbarItem className="basis-1/4 text-center">
              <Link color="foreground" underline={isContactLine} className="text-2xl font-georgian" href="#target-contact" onClick={scrollToComponent}>
              CONTACT.
              </Link>
            </NavbarItem>
            
            <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  isDisabled
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-2xl font-georgian"
                  radius="sm"
                  variant="light"
                  endContent={<ChevronDown fill="currentColor" size={18} />}
                >
                  SERVICES.
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            {/* <DropdownMenu className="w-[140px]" itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem key="Services">
                SERVICES
              </DropdownItem>
              <DropdownItem key="ABOUT_ME">
                ABOUT ME
              </DropdownItem>
              <DropdownItem key="CONTACT">
                CONTACT
              </DropdownItem>
                
            </DropdownMenu> */}
            </Dropdown>
            
          </NavbarContent>

          <NavbarMenu className="bg-white bg-opacity-95">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color='foreground'
                  className="w-full"
                  href={item.href}
                  underline={item.underline}
                  size="lg"
                  onClick={scrollToComponent}
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      {/* </div> */}
      <div className="w-screen lg:min-w-[1200px] h-auto bg-blue-100 ">

        <img src={Bg} alt='this is'/>
      </div>
      
      <div id="target-paint">
        <PArt/>
      </div>
            
      <div id="target-about">
        <AboutMe />
      </div>
            
      <div id="target-contact" className="w-full h-[1000px] bg-purple-200">
        <Contact />
      </div>

      
    </>
  );
}