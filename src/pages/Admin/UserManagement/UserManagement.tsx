import {
  Button,
  Checkbox,
  Flex,
  Modal,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPlus, IconTrash, IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  assignLeadsToUser,
  fetchUsers,
  getAvaibleLeadsByDates,
  saveUser,
} from "../../../utils/apiCalls";
import { useDisclosure } from "@mantine/hooks";
import { showNotification, usersTypes } from "../../../utils/helpers";
import { DateInput } from "@mantine/dates";

export type userData = {
  name: string;
  employeeId: string;
  employeeType: string;
  mobileNo: string;
  email: string;
  joiningDate: Date;
};

function UserManagement() {
  const [usersList, setUserslist] = useState<userData[] | null>(null);
  const [newUser, setNewUser] = useState<userData[] | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [leadsStartDate, setLeadsStartDate] = useState<Date | null>(null);
  const [leadsEndDate, setLeadsEndDate] = useState<Date | null>(null);
  const [employeeStarts, setEmployeeStarts] = useState<any>(null);
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUserslist(() => {
          const value = [] as userData[];
          data.data.forEach((usr: any) => {
            const newData: userData = {
              name: "",
              employeeId: "",
              employeeType: "",
              mobileNo: "",
              email: "",
              joiningDate: new Date(),
            };
            const filteredData: userData = Object.fromEntries(
              Object.entries(usr).filter(([k]) => k in newData)
            ) as userData;
            value.push(filteredData);
          });
          setUserslist(value);
          return value;
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [newUser]);
  useEffect(() => {
    console.log(usersList);
  }, [usersList]);
  const addNewRowToTable = () => {
    if (newUser !== null && newUser.length === 1) {
      showNotification("Error", "Please fill the existing new user", "error");
      return;
    }
    const newData: userData = {
      name: "",
      employeeId: "",
      employeeType: "",
      joiningDate: new Date(),
      mobileNo: "",
      email: "",
    };
    if (newUser !== null) {
      setNewUser([...newUser, newData]);
    } else {
      setNewUser([newData]);
    }
  };
  const updateUserValue = (
    value: string,
    index: number,
    property: keyof userData
  ) => {
    console.log(value, index, property);
    if (newUser !== null) {
      const data = newUser;
      const temp = Object.keys(data[index]);
      temp.forEach((e) => {
        if (e === property) {
          data[index][property] = value as string & Date;
        }
      });
      setNewUser([...data]);
    }
  };
  const addUser = (i: number) => {
    if (newUser !== null) {
      let flag = 0;
      Object.values(newUser[i]).map((val) => (val === "" ? (flag += 1) : null));
      if (flag) {
        showNotification(
          "Error",
          "Please fill all the new user fields",
          "error"
        );
        return;
      }
      setNewUser(() => newUser.filter((_, index) => index !== i));
      saveUser(newUser[i]);
      if (usersList !== null) {
        setUserslist([...usersList, newUser[i]]);
      } else {
        setUserslist([newUser[i]]);
      }
    }
  };
  const selectLeads = () => {
    open();
  };
  const removeNewUser = () => {
    setNewUser([]);
  };
  const getAvaiableLeads = () => {
    getAvaibleLeadsByDates({ startDate: leadsStartDate, endDate: leadsEndDate })
      .then((d) => {
        console.log(d);
        setEmployeeStarts(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const setAvailableLeadsValue = (): number => {
    if (selectedUser === null) {
      return 0;
    } else if (selectedUser === 0) {
      return employeeStarts.unassignedLead / employeeStarts.telecallerCount;
    } else if (selectedUser === 1) {
      return employeeStarts.unassignedLead / employeeStarts.employeeCount;
    } else if (selectedUser === 2) {
      return employeeStarts.unassignedLead / employeeStarts.brokerCount;
    }
    return 0;
  };
  const assignLeads = async () => {
    try {
      if (selectedUser !== undefined) {
        const response = await assignLeadsToUser({
          userType: usersTypes[selectedUser],
          startDate: leadsStartDate,
          endDate: leadsEndDate,
          userCount: setAvailableLeadsValue(),
        });
        console.log(response);
        if (response.status === 200) {
          showNotification("Success", response.data.message, "success");
        } else {
          showNotification("Error", response.data.error, "error");
        }
        close();
      } else {
        showNotification("info", "please select a user", "info");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Flex className="w-[100%] px-5 py-3 justify-center items-center flex-col gap-3 bg-slate-50">
      <Flex className="w-full gap-4 justify-start">
        <Flex className="w-[100%] justify-end gap-4">
          <Button onClick={selectLeads} color="black" variant="outline">
            <IconUpload className="pr-2" size={25} /> Assign
          </Button>
          <Button onClick={addNewRowToTable} color="black" variant="outline">
            <IconPlus className="pr-2" size={25} /> Add user
          </Button>
        </Flex>
      </Flex>
      <Modal size="50%" opened={opened} onClose={close} title="Assign Leads">
        <Flex className="justify-center gap-4">
          <DateInput
            color="orange"
            clearable
            value={leadsStartDate}
            maxDate={new Date()}
            onChange={(val) => {
              setLeadsStartDate(val);
              setSelectedUser(undefined);
              setEmployeeStarts(null);
            }}
            placeholder="from date"
          />
          <DateInput
            color="orange"
            clearable
            value={leadsEndDate}
            minDate={leadsStartDate ? leadsStartDate : undefined}
            disabled={leadsStartDate === null ? true : false}
            maxDate={new Date()}
            onChange={(val) => {
              setLeadsEndDate(val);
              setSelectedUser(undefined);
              setEmployeeStarts(null);
            }}
            placeholder="to date"
          />
          <Button
            color="orange"
            onClick={getAvaiableLeads}
            disabled={
              leadsStartDate && leadsEndDate && leadsStartDate >= leadsEndDate
                ? true
                : false
            }
          >
            Get available leads
          </Button>
        </Flex>
        {employeeStarts !== null ? (
          <Flex className="w-full flex-col items-center pt-6 gap-4">
            <Flex className="w-full justify-evenly">
              <Checkbox
                disabled={employeeStarts.telecallerCount === 0 ? true : false}
                checked={selectedUser === 0}
                onChange={() => setSelectedUser(0)}
                color="orange"
                description={
                  employeeStarts.telecallerCount === 0
                    ? `No ${usersTypes[0]} available`
                    : ""
                }
                label={usersTypes[0]}
              />
              <Checkbox
                disabled={employeeStarts.employeeCount === 0 ? true : false}
                checked={selectedUser === 1}
                onChange={() => setSelectedUser(1)}
                description={
                  employeeStarts.employeeCount === 0
                    ? `No ${usersTypes[1]} available`
                    : ""
                }
                color="orange"
                label={usersTypes[1]}
              />
              <Checkbox
                disabled={employeeStarts.brokerCount === 0 ? true : false}
                checked={selectedUser === 2}
                onChange={() => setSelectedUser(2)}
                description={
                  employeeStarts.brokerCount === 0
                    ? `No ${usersTypes[2]} available`
                    : ""
                }
                color="orange"
                label={usersTypes[2]}
              />
            </Flex>
            <Flex className="w-full justify-evenly items-center">
              <Text fw={400} size="md">
                Available Leads are {setAvailableLeadsValue()}
              </Text>
              <Button onClick={assignLeads} color="orange">
                Assign Leads
              </Button>
            </Flex>
          </Flex>
        ) : null}
      </Modal>
      <Table
        highlightOnHover
        withTableBorder
        withColumnBorders
        verticalSpacing="lg"
        className=" bg-white border-2 drop-shadow-md"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Employee Id</Table.Th>
            <Table.Th>Employee Type</Table.Th>
            <Table.Th>Joining Date</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Mobile No.</Table.Th>
            <Table.Th>Add/Delete/Modify/View Activity</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {usersList?.map((user, i) => {
            console.log(user);
            return (
              <Table.Tr key={i}>
                <Table.Td>{user.name}</Table.Td>
                <Table.Td>{user.employeeId}</Table.Td>
                <Table.Td>{user.employeeType}</Table.Td>
                <Table.Td>
                  {new Date(user.joiningDate).getFullYear() +
                    "-" +
                    (new Date(user.joiningDate).getMonth() + 1) +
                    "-" +
                    new Date(user.joiningDate).getDate()}
                </Table.Td>
                <Table.Td>{user.email}</Table.Td>
                <Table.Td>{user.mobileNo}</Table.Td>
                <Table.Td>
                  <Flex className="w-full justify-center gap-3">
                    <IconPlus onClick={() => addUser(i)} />
                    <IconTrash />
                  </Flex>
                </Table.Td>
              </Table.Tr>
            );
          })}
          {newUser?.map((user: userData, i) => {
            return (
              <Table.Tr key={i}>
                {Object.keys(user).map((K, j) => {
                  console.log(user);
                  return (
                    <Table.Td key={j}>
                      {K === "joiningDate" ? (
                        <Table.Td>
                          {new Date(user.joiningDate).getFullYear() +
                            "-" +
                            (new Date(user.joiningDate).getMonth() + 1) +
                            "-" +
                            new Date(user.joiningDate).getDate()}
                        </Table.Td>
                      ) : (
                        <TextInput
                          required
                          onChange={(e) =>
                            updateUserValue(
                              e.target.value,
                              i,
                              K as keyof userData
                            )
                          }
                          value={user[K as keyof userData].toString()}
                        />
                      )}
                    </Table.Td>
                  );
                })}
                <Table.Td>
                  <Flex className="w-full justify-center gap-3">
                    <IconPlus onClick={() => addUser(i)} />
                    <IconTrash onClick={removeNewUser} />
                  </Flex>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Flex>
  );
}

export default UserManagement;
