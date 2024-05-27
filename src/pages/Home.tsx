import { Flex, Image, Text, NavLink } from "@mantine/core";
import Logo from "../assets/imgs/logo.svg";
import { NavLinks } from "../utils/Navlinks";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Flex className=" w-full h-[100%] flex-col">
      <Flex className=" w-[17%] px-3 py-1 flex-col items-center">
        <Image src={Logo} radius="md" className="w-[75%]" />
        <Flex className="flex-col items-center gap-3">
          {NavLinks.map((navlink) => (
            <NavLink
              component={Link}
              label={navlink.label}
              to={navlink.route}
              leftSection={<Image className="h-[50%]" src={navlink.icon} />}
            />
          ))}
        </Flex>
      </Flex>
      <Flex className=""></Flex>
    </Flex>
  );
}

export default Home;
