import {
  Button,
  Checkbox,
  Flex,
  Modal,
  ScrollArea,
  Select,
  Table,
  Tabs,
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

function UserManagement() {
  const [usersList, setUserslist] = useState<USER[] | null>(null);
  const [newUser, setNewUser] = useState<USER | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [toggleAddUserModal, setToggleAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [leadsStartDate, setLeadsStartDate] = useState<Date | null>(null);
  const [leadsEndDate, setLeadsEndDate] = useState<Date | null>(null);
  const [employeeStarts, setEmployeeStarts] = useState<any>(null);
  const [password, setPassword] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string | null>(usersTypes[0]);
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUserslist(() => {
          const value = [] as USER[];
          data.data.forEach((usr: any) => {
            const newData: USER = {
              _id: "",
              name: "",
              employeeId: "",
              employeeType: "",
              mobileNo: "",
              email: "",
              joiningDate: new Date(),
              leads: [],
            };
            const filteredData: USER = Object.fromEntries(
              Object.entries(usr).filter(([k]) => k in newData)
            ) as USER;
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
    if (newUser !== null) {
      showNotification("Error", "Please fill the existing new user", "error");
      return;
    }
    const newData: USER = {
      _id: "",
      name: "",
      employeeId: "",
      employeeType: "",
      joiningDate: new Date(),
      mobileNo: "",
      email: "",
      leads: [],
    };
    setNewUser(newData);
    setToggleAddUserModal(true);
  };
  const updateUserValue = (value: string, property: keyof USER) => {
    console.log(value, property);
    if (newUser !== null) {
      const data = newUser;
      const temp = Object.keys(data);
      temp.forEach((e) => {
        if (e === property) {
          console.log(e, value);
          data[property] = value as string & Date & string[];
        }
      });
      console.log(data);
      setNewUser({ ...data });
    }
  };
  const addUser = async () => {
    if (newUser !== null) {
      let flag = -1;
      Object.values(newUser).map((val) => (val === "" ? (flag += 1) : null));
      if (flag) {
        showNotification(
          "Error",
          "Please fill all the new user fields",
          "error"
        );
        return;
      }
      setNewUser(null);
      setToggleAddUserModal(false);
      setPassword("");
      const response = await saveUser({ newUser, password });
      if (response.status === 200) {
        if (usersList !== null) {
          setUserslist([...usersList, newUser]);
        } else {
          setUserslist([newUser]);
        }
        showNotification("Success", "user saved successfully", "success");
      } else {
        showNotification("Error", response.data.error, "error");
      }
    }
  };
  const selectLeads = () => {
    open();
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

  const assignLeads = async () => {
    try {
      if (selectedUser !== undefined && selectedUser.length !== 0) {
        console.log({
          startDate: leadsStartDate,
          endDate: leadsEndDate,
          userIds: selectedUser,
        });
        const response = await assignLeadsToUser({
          startDate: leadsStartDate,
          endDate: leadsEndDate,
          userIds: selectedUser,
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
      <Modal size="70%" opened={opened} onClose={close} title="Assign Leads">
        <Flex className="justify-center gap-4">
          <DateInput
            color="orange"
            clearable
            value={leadsStartDate}
            maxDate={new Date()}
            onChange={(val) => {
              setLeadsStartDate(val);
              setSelectedUser([]);
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
              setSelectedUser([]);
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
          <Flex className="w-full flex-col items-center pt-6 px-10 gap-4">
            {/* <Flex className="w-full justify-evenly">
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
            </Flex> */}
            <Tabs
              color="orange"
              className="w-full"
              value={activeTab}
              onChange={(val) => {
                setActiveTab(val);
                setSelectedUser([]);
              }}
            >
              <Tabs.List justify="center">
                {usersTypes.map((type) => {
                  return (
                    <Tabs.Tab value={type}>
                      <Text tt="capitalize">{type}</Text>
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>
              {usersTypes.map((type) => {
                return (
                  <Tabs.Panel value={type}>
                    <Table
                      highlightOnHover
                      withTableBorder
                      withColumnBorders
                      verticalSpacing="lg"
                      className=" w-full bg-white border-2 drop-shadow-md"
                    >
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Select User</Table.Th>
                          <Table.Th>Name</Table.Th>
                          <Table.Th>Employee Id</Table.Th>
                          <Table.Th>Employee Type</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {usersList?.map((user, i) => {
                          if (user.employeeType === type) {
                            return (
                              <Table.Tr key={i}>
                                <Table.Td>
                                  <Checkbox
                                    color="orange"
                                    checked={
                                      selectedUser.includes(user._id)
                                        ? true
                                        : false
                                    }
                                    onClick={(v) => {
                                      (v.target as HTMLInputElement).checked ===
                                      true
                                        ? setSelectedUser([
                                            ...selectedUser,
                                            user._id,
                                          ])
                                        : setSelectedUser((prev) =>
                                            prev.filter((e) => e != user._id)
                                          );
                                    }}
                                  />
                                </Table.Td>
                                <Table.Td>{user.name}</Table.Td>
                                <Table.Td>{user.employeeId}</Table.Td>
                                <Table.Td>{user.employeeType}</Table.Td>
                              </Table.Tr>
                            );
                          }
                        })}
                      </Table.Tbody>
                    </Table>
                  </Tabs.Panel>
                );
              })}
            </Tabs>
            <Flex className="w-full justify-evenly items-center">
              <Text fw={400} size="md">
                Available Leads are{" "}
                {selectedUser.length === 0
                  ? 0
                  : employeeStarts.unassignedLead / selectedUser.length}{" "}
                per employee
              </Text>
              <Button onClick={assignLeads} color="orange">
                Assign Leads
              </Button>
            </Flex>
          </Flex>
        ) : null}
      </Modal>
      <Modal
        size="50%"
        opened={toggleAddUserModal}
        onClose={() => {
          setToggleAddUserModal(false);
          setNewUser(null);
        }}
        title="Add User"
      >
        {newUser && (
          <Flex className="gap-4 flex-col px-4">
            <TextInput
              required
              placeholder="name"
              value={newUser.name}
              onChange={(e) => updateUserValue(e.target.value, "name")}
            />
            <TextInput
              required
              placeholder="employeeId"
              value={newUser.employeeId}
              onChange={(e) => updateUserValue(e.target.value, "employeeId")}
            />
            <Select
              data={usersTypes}
              placeholder="employeeType"
              value={newUser.employeeType}
              onChange={(val) =>
                val !== null ? updateUserValue(val, "employeeType") : null
              }
            />
            <TextInput
              required
              placeholder="email"
              type="email"
              value={newUser.email}
              onChange={(e) => updateUserValue(e.target.value, "email")}
            />
            <TextInput
              required
              placeholder="mobileNo"
              value={newUser.mobileNo}
              onChange={(e) => updateUserValue(e.target.value, "mobileNo")}
            />
            <TextInput
              required
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Flex onClick={addUser} className="w-full justify-center gap-3">
              <IconPlus className="hover:bg-orange-400 border-black rounded-md hover:cursor-pointer" />{" "}
              Add user
            </Flex>
          </Flex>
        )}
      </Modal>
      <ScrollArea className="w-full" h={700}>
        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          verticalSpacing="lg"
          className=" w-full bg-white border-2 drop-shadow-md"
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
                      <IconPlus />
                      <IconTrash />
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Flex>
  );
}

export default UserManagement;
