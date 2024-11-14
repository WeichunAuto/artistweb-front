import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenuList, setSelectedMenuIndex } from "../../store/modules/menuSlice";
import { AppDispatch, RootState } from "../../store/index";
import { MenuItem } from "../../type/customTypes";
import eventBus from "../../token/event.js";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Tooltip,
} from "@nextui-org/react";
import Logo from "./logo";
import ForegroundImage from "./foregroundImage";
import PArt from "../paintingArt/index";
import Contact from "../contact/index";
import AboutMe from "../aboutMe/index";
import Footer from "../footer/index.js";
import { SnailIcon } from "./icons.js";

export default function WebBody() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [shouldHideOnScroll, setShouldHideOnScroll] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [logoSrc, setLogoSrc] = useState("");
  const [foregroundImageSrc, setForegroundImageSrc] = useState("");

  // capture current window size
  useEffect(() => {
    const handleWindowSizeChange = () => {
      const currentWindowWidth = window.innerWidth;
      if (currentWindowWidth > 640) {
        // stick on top if it is not a small screen.
        setShouldHideOnScroll(false);
        setIsSmallScreen(false);
      } else {
        setShouldHideOnScroll(true);
        setIsSmallScreen(true);
      }
    };
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [isMenuOpen]);

  // Function to scroll to the Contact section
  const scrollToComponent = (menuId: number) => {
    if (isMenuOpen === true) {
      setShouldHideOnScroll(false); // If the side menu is open, then stick on scroll.
      setIsMenuOpen(!isMenuOpen); // close the menu after clicking.
    } else if (isSmallScreen === true) {
      setShouldHideOnScroll(true);
    }

    dispatch(setSelectedMenuIndex(menuId))
  };

  

  const { selectedMenuIndex, menuList } = useSelector((state: RootState) => state.menus);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    eventBus.addListener("synToken", handleTokenEvent);

    return () => {
      eventBus.removeListener("synToken", handleTokenEvent);
    };
  });

  const handleTokenEvent = (jwtToken: string) => {
    dispatch(fetchMenuList(jwtToken));
  };

  // const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0)
  const menuChosenStyle = 'rounded-sm border-b-[3px] border-pink-400'

  return (
    <>
      {/* Top header for the large screen. */}
      <div className="w-full lg:min-w-[1200px] h-auto pt-4 z-10 flex-col hidden lg:block">
        <div className="w-screen flex justify-center">
          <div className="size-32">
            <Logo logoSrc={logoSrc} setLogoSrc={setLogoSrc} />
          </div>
        </div>

        <div className="w-screen text-center font-sans mt-4 mb-8">
          <span className="border-t-1 border-slate-500 pt-2 text-base word-spacing-wider tracking-widest">
            the urban art portfolio
          </span>
        </div>
      </div>

      <Navbar
        shouldHideOnScroll={shouldHideOnScroll}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="w-screen lg:min-w-[1200px] drop-shadow-sm lg:drop-shadow-none flex items-center bg-white bg-opacity-96"
      >
        <NavbarContent className="flex justify-between lg:hidden ">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden sm:block md:block w-12"
          />
          <NavbarBrand className="block lg:hidden flex flex-row gap-1 justify-center pr-20">
            <div className="size-10">
              <Logo logoSrc={logoSrc} setLogoSrc={setLogoSrc} />
            </div>

            <p className="font-bold text-inherit">GOLNAZ</p>
          </NavbarBrand>
        </NavbarContent>

        {/* menus for large screen */}
        <NavbarContent className="hidden lg:flex flex-row justify-items-center">
          {(menuList as MenuItem[]).map((item, index) => {
            const navbarItem = (
              <NavbarItem
                key={`${item}-${index}`}
                className="basis-1/4 text-center"
              >
                <Link
                  color="foreground"
                  isDisabled={item.disable}
                  className={`text-2xl font-georgian ${item.id === selectedMenuIndex ? menuChosenStyle : ''}`}
                  href={'#'+item.href}
                  onClick={()=>scrollToComponent(item.id)}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            );
            if (item.disable) {
              return (
                <Tooltip
                  key={index}
                  color="secondary"
                  showArrow={true}
                  content={
                    <div className="px-1 py-2 flex flex-row gap-2">
                      <SnailIcon className="w-7" />
                      <div className="text-tiny content-end">Hatching...</div>
                    </div>
                  }
                >
                  {navbarItem}
                </Tooltip>
              );
            } else {
              return navbarItem
            }
          })}
        </NavbarContent>

        {/* menus for mobile phone screen */}
        <NavbarMenu className="bg-white bg-opacity-90">
          {(menuList as MenuItem[]).map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                className="w-full text-lg"
                href={"#" + item.href}
                size="lg"
                isDisabled={item.disable}
                onClick={()=>scrollToComponent(item.id)}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      {/* </div> */}
      <div className="w-screen lg:min-w-[1200px] h-auto flex justify-center">
        <ForegroundImage
          foregroundImageSrc={foregroundImageSrc}
          setForegroundImageSrc={setForegroundImageSrc}
        />
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
