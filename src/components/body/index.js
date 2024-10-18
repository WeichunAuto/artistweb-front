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

} from "@nextui-org/react";
import { Logo } from "./logo.js";
import PArt from "../paintingArt/index.js";
import Contact from '../contact/index.js'
import AboutMe from "../aboutMe/index.js";
import Footer from "../footer/index.js";
import Bg from '../../imgs/bg.png'


export default function WebBody() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
  }, [isMenuOpen])

  // Function to scroll to the Contact section
  const scrollToComponent = (e) => {
    if (isMenuOpen === true) {
      setShouldHideOnScroll(false) // If the side menu is open, then stick on scroll.
      setIsMenuOpen(!isMenuOpen) // close the menu after clicking.
    } else if(isSmallScreen === true) {
      setShouldHideOnScroll(true)
    }
  };

  const menuItems = [
    {
      name: "PAINTING ART.",
      href: "#target-paint",
      isDisabled: false
    },
    {
      name: "ABOUT ME.",
      href: "#target-about",
      isDisabled: false
    },
    {
      name: "CONTACT.",
      href: "#target-contact",
      isDisabled: false
    }, {
      name: "SERVICES.",
      href: "#target-services",
      isDisabled: true
    }
  ];
  
  return (
    <>
      {/* Top header for the large screen. */}
      <div className="w-full lg:min-w-[1200px] h-auto pt-8 z-10 flex-col hidden lg:block">
        <div className='w-screen flex justify-center'>
          <Logo width='w-30' height='w-30'/>
        </div>
        
        <div className='w-screen text-center font-sans mt-8 mb-8'>
          <span className="border-t-1 border-slate-500 pt-2 text-base word-spacing-wider tracking-widest">the urban art portfolio</span>
        </div>
      </div>

        <Navbar shouldHideOnScroll={shouldHideOnScroll} 
          isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}
          className="w-screen lg:min-w-[1200px] drop-shadow-sm lg:drop-shadow-none flex items-center bg-white bg-opacity-96"
        >
          <NavbarContent className="flex justify-between lg:hidden ">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden sm:block md:block w-12"
            />
            <NavbarBrand className="block lg:hidden flex flex-row gap-1 justify-center pr-20">
              <Logo width='w-9' height='w-9'/>
              <p className="font-bold text-inherit">GOLNAZ</p>
            </NavbarBrand>
          </NavbarContent>

          {/* menus for large screen */}
          <NavbarContent className="hidden lg:flex flex-row justify-items-center">
            {
              menuItems.map((item, index) => {
                
                return(
                  <NavbarItem key={`${item}-${index}`} className="basis-1/4 text-center">
                    <Link color="foreground" isDisabled={item.isDisabled} className="text-2xl font-georgian" href={item.href}  onClick={scrollToComponent}>
                      {item.name}
                    </Link>
                  </NavbarItem>
                )
              })
            }
          </NavbarContent>

          {/* menus for mobile phone screen */}
          <NavbarMenu className="bg-white bg-opacity-90">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color='foreground'
                  className="w-full text-lg"
                  href={item.href}
                  size="lg"
                  isDisabled={item.isDisabled}
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

        <img src={Bg} alt=''/>
      </div>
      
      <div id="target-paint" className="w-screen lg:min-w-[1200px] h-auto">
        <PArt />
      </div>
            
      <div id="target-about" className="w-screen lg:min-w-[1200px] h-auto">
        <AboutMe />
      </div>
            
      <div id="target-contact" className="w-screen lg:min-w-[1200px] h-auto">
        <Contact />
      </div>

      <div id="target-contact" className="w-screen lg:min-w-[1200px] h-auto">
        <Footer />
      </div>
     
    </>
  );
}