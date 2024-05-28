import { Flex, Image, Indicator, Text } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import TempImg from "../../../assets/imgs/tempImg.png";
import Logo from "../../../assets/imgs/Logo.svg";

function HeaderNav() {
  return (
    <Flex className="w-[100%] h-[9%] bg-white items-center px-[3rem] justify-between drop-shadow-md">
      <Flex>
        <Image src={Logo} radius="md" className="w-[50%]" />
      </Flex>
      <Flex className="items-center gap-4">
        <Indicator color="orange">
          <IconBell
            color="orange"
            className=" bg-orange-100 p-1 rounded-md"
            size={30}
          />
        </Indicator>
        <Flex className="gap-3">
          <Image src={TempImg} className="w-[3rem]" />
          <Flex className="flex-col justify-center items-around">
            <Text size="md" fw={500}>
              Ashish
            </Text>
            <Text size="sm" fw={300}>
              Admin
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default HeaderNav;
