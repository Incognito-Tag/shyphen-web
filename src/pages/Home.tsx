import { Flex } from "@mantine/core";
import HeaderNav from "./Admin/HeaderNav/HeaderNav";
import Navbar from "./Admin/Navbar/Navbar";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

function Home({ children }: Props) {
  return (
    <Flex className=" w-full h-[100vh] flex-col">
      <HeaderNav />
      <Flex className="h-[100%]">
        <Navbar />
        <Flex className="w-[100%]">{children}</Flex>
      </Flex>
    </Flex>
  );
}

export default Home;
