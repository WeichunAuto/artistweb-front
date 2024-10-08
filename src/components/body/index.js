import React, { useRef } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button


} from "@nextui-org/react";
import { Logo } from "./logo.js";
import {ChevronDown} from './icons'
import PArt from "../paintingArt/index.js";
import Contact from '../contact/index.js'
import Prices from "../prices/index.js";
import Bg from '../../imgs/bg.png'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Create a ref for the Contact component
  const contactRef = useRef(null);
  const priceRef = useRef(null);

  // Function to scroll to the Contact section
  const scrollToComponent = (e) => {
    const targetMenu = e.target.innerText
    if (targetMenu === 'Features') {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if(targetMenu === 'Customers') {
      if (priceRef.current) {
        priceRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        
      }
    }    
  };

  

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
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

        <Navbar
          onMenuOpenChange={setIsMenuOpen} 
          className="drop-shadow-sm lg:drop-shadow-none flex items-center"
        >
          <NavbarContent className="flex justify-between lg:hidden">
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
              <Link color="foreground" className="text-2xl font-georgian" href="#target-part"  onClick={scrollToComponent}>
              PAINTING ART.
              </Link>
            </NavbarItem>
            <NavbarItem isActive  className="basis-1/4 text-center">
              <Link href="#target-prices" className="text-2xl font-georgian" aria-current="page"  onClick={scrollToComponent}>
              FACE ART.
              </Link>
            </NavbarItem>
            <NavbarItem  className="basis-1/4 text-center">
              <Link color="foreground" className="text-2xl font-georgian" href="#">
              WALL ART.
              </Link>
            </NavbarItem>
            
            <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-2xl font-georgian"
                  radius="sm"
                  variant="light"
                  endContent={<ChevronDown fill="currentColor" size={18} />}
                >
                  MORE.
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu className="w-[140px]" itemClasses={{
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
                
            </DropdownMenu>
            </Dropdown>
            
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  className="w-full"
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      {/* </div> */}
      <div className="w-screen lg:min-w-[1200px] h-auto bg-blue-100 ">

        <img src={Bg} alt='this is'/>
      </div>
      
      <div id="target-part border-1">
        <PArt/>
      </div>
            
            
      <div id="target-section" className="w-full h-[1000px] bg-purple-200"  ref={contactRef}>
        <Contact />
      </div>

      <div id="target-prices" ref={priceRef}>
        <Prices />
      </div>
    </>
  );
}