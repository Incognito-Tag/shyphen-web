import { Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchAllLeads, fetchUsers } from "../../../utils/apiCalls";
import { IconClock, IconFileDots, IconTrash } from "@tabler/icons-react";
import ProfilePage from "../ProfilePage/ProfilePage";

function Followup() {
  const [leadsList, setLeadsList] = useState([]);
  const [usersList, setUsersList] = useState<any>({});
  const [profileId, setProfileId] = useState<number | null>(null);
  useEffect(() => {
    fetchUsers()
      .then((d) => {
        console.log(d);
        const data: any = {};
        d.data.forEach((usr: any) => {
          data[usr.employeeId] = usr;
        });
        console.log(data);
        setUsersList(data);
      })
      .catch((e) => {
        console.log(e);
      });
    fetchAllLeads()
      .then((d) => {
        console.log(d);
        setLeadsList(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return profileId === null ? (
    <Flex className="w-[100%] h-full p-4 flex-col justify-start items-center">
      <Flex className="w-[100%] p-2 justify-around bg-slate-100 rounded-lg">
        <Text className="w-1/6 text-center" fw={700} size="sm">
          Client Name
        </Text>
        <Text className="w-1/6 text-center" fw={700} size="sm">
          Project/Camp
        </Text>
        <Text className="w-1/6 text-center" fw={700} size="sm">
          Follow up
        </Text>
        <Text className="w-1/6 text-center" fw={700} size="sm">
          Follow up Type
        </Text>
        <Text className="w-1/6 text-center" fw={700} size="sm">
          Employee
        </Text>
        <Text className="w-1/6 text-center" fw={700} size="sm">
          Action
        </Text>
      </Flex>
      <Flex className="w-[100%] mt-2 gap-2 flex-col">
        {leadsList.map((lead: any, i) => {
          return (
            <Flex className="w-[100%] h-10 items-center justify-around hover:bg-slate-100">
              <Text
                onClick={() => setProfileId(i)}
                className="w-1/6 hover:underline hover:cursor-pointer hover:text-lg transition-all text-center"
              >
                {lead.name}
              </Text>
              <Text className="w-1/6 text-center">-</Text>
              <Text className="w-1/6 text-center">-</Text>
              <Text className="w-1/6 text-center">-</Text>
              {lead.assignedTo !== undefined &&
              usersList[lead.assignedTo] !== undefined ? (
                <Flex className=" w-1/6 flex-col justify-center">
                  <Text className="w-1/1 text-center">
                    {usersList[lead.assignedTo].name}
                  </Text>
                  <Text fw={100} size="xs" className="w-1/1 text-center">
                    {usersList[lead.assignedTo].employeeType}
                  </Text>
                </Flex>
              ) : (
                <Text className="w-1/6 text-center">To be assigned</Text>
              )}
              <Flex className="w-1/6 justify-center gap-4">
                <IconFileDots />
                <IconClock />
                <IconTrash />
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  ) : (
    <ProfilePage profile={leadsList[profileId]} />
  );
}

export default Followup;
