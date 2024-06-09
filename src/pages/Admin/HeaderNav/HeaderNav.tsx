import { Flex, Image, Indicator, Text } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import TempImg from "../../../assets/imgs/tempImg.png";
import Logo from "../../../assets/imgs/Logo.svg";
import useRouteTypeContext from "../../../context/RouteTypeContext";
import { currState } from "../../../utils/helpers";
import useAuthAdmin from "../../../context/AdminAuthContext";
import useAuthUser from "../../../context/UserAuthContext";

function HeaderNav() {
  const { type } = useRouteTypeContext();
  let user: ADMIN | USER | undefined = undefined;
  if (type === currState.ADMIN) {
    const { admin } = useAuthAdmin();
    user = admin;
  } else {
    const User = useAuthUser();
    user = User.user;
  }
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
              {user?.name}
            </Text>
            <Text size="sm" fw={300}>
              {type === currState.ADMIN ? "Admin" : "User"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default HeaderNav;
