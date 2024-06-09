import { Flex, Image, NavLink } from "@mantine/core";
import { Link } from "react-router-dom";
import { NavLinks } from "../../../utils/Navlinks";
import { useState } from "react";
import SignOut from "../../../assets/imgs/SignOut.svg";
import useRouteTypeContext from "../../../context/RouteTypeContext";
import { currState } from "../../../utils/helpers";
import Cookies from "js-cookie";

function Navbar() {
  const [toogleNavbar, setToogleNavbar] = useState(true);
  const [navVal, setNavVal] = useState(NavLinks[0].label);
  const { setType } = useRouteTypeContext();
  const handleClick = (label: string) => {
    if (label === navVal) {
      setToogleNavbar(!toogleNavbar);
    } else {
      setNavVal(label);
    }
    return;
  };
  const handleLogout = () => {
    setType(currState.UNPROTECTED);
    Cookies.set("token", "");
  };
  return (
    <Flex
      className={`${
        toogleNavbar ? "w-[15%]" : "w-[5%]"
      } transition-all duration-150 ease-out px-3 py-3 h-[100%] flex-col items-center border-r-2 drop-shadow-sm`}
    >
      <Flex className="flex-col items-center gap-3">
        {NavLinks.map((navlink, i) =>
          navVal === navlink.label ? (
            <NavLink
              onClick={() => handleClick(navlink.label)}
              component={Link}
              label={toogleNavbar ? navlink.label : null}
              to={navlink.route}
              key={i}
              active={navVal === navlink.label}
              className="!p-0"
              leftSection={
                <Image
                  className={`${toogleNavbar ? "h-[50%]" : "h-[100%]"}`}
                  src={navlink.icon}
                />
              }
              color="orange"
            />
          ) : (
            <NavLink
              onClick={() => handleClick(navlink.label)}
              component={Link}
              label={toogleNavbar ? navlink.label : null}
              to={navlink.route}
              key={i}
              className="!p-0"
              leftSection={
                <Image
                  className={`${toogleNavbar ? "h-[50%]" : "h-[100%]"}`}
                  src={navlink.icon}
                />
              }
            />
          )
        )}
        <NavLink
          onClick={handleLogout}
          component={Link}
          label={toogleNavbar ? "Sign Out" : null}
          to={"/"}
          className="!p-0"
          leftSection={
            <Image
              className={`${toogleNavbar ? "h-[50%]" : "h-[100%]"}`}
              src={SignOut}
            />
          }
          color="orange"
        />
      </Flex>
    </Flex>
  );
}

export default Navbar;
