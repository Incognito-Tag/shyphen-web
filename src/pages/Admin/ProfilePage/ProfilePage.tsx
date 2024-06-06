import { Flex, Image, Text } from "@mantine/core";
import UserManagement from "../../../assets/imgs/UserManagement.svg";

function ProfilePage({ profile }: any) {
  console.log(profile);
  return (
    <Flex className="w-full h-[100vh] p-4 bg-slate-100 flex-col justify-center">
      <Flex className="w-full bg-white pl-10 pt-10 flex-col justify-center rounded-xl drop-shadow-xl h-[50%]">
        <Flex className=" w-full h-[25%] items-center gap-3">
          <Image
            className="h-[5rem] bg-slate-200 rounded-full drop-shadow-lg p-2"
            src={UserManagement}
          />
          <Text fw={700} className="pl-2 text-3xl">
            {profile.name}
          </Text>
        </Flex>
        <Flex className="w-full h-[75%] ml-[5.5rem] flex-wrap justify-start gap-6 flex-col">
          <Text className="w-[15rem] pl-5 text-sm text-[#1C1C1C] py-2 text-left drop-shadow-xl rounded-3xl bg-[#0c4f8552]">
            {profile.mobileNo}
          </Text>
          <Text className="w-[15rem] pl-5 text-sm text-[#1C1C1C] py-2 text-left drop-shadow-xl rounded-3xl bg-[#0c4f8552]">
            {profile.email}
          </Text>
          <Text className="w-[15rem] pl-5 text-sm text-[#1C1C1C] py-2 text-left drop-shadow-xl rounded-3xl bg-[#0c4f8552]">
            {profile.propertyType}
          </Text>
          <Text className="w-[15rem] pl-5 text-sm text-[#1C1C1C] py-2 text-left drop-shadow-xl rounded-3xl bg-[#0c4f8552]">
            {profile.leadSource}
          </Text>
          <Text className="w-[15rem] pl-5 text-sm text-[#1C1C1C] py-2 text-left drop-shadow-xl rounded-3xl bg-[#0c4f8552]">
            {profile.location === undefined ? "Location..." : profile.location}
          </Text>
        </Flex>
      </Flex>
      <Flex className="w-full h-[50%]"></Flex>
    </Flex>
  );
}

export default ProfilePage;
