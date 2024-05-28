import { FileInput, Flex, Table, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";

const elements = [
  {
    name: "",
    mobile: "",
    email: "",
    createdAt: "",
    propertyType: "",
    leadSource: "",
    leadOwner: "",
  },
  {
    name: "",
    mobile: "",
    email: "",
    createdAt: "",
    propertyType: "",
    leadSource: "",
    leadOwner: "",
  },
  {
    name: "",
    mobile: "",
    email: "",
    createdAt: "",
    propertyType: "",
    leadSource: "",
    leadOwner: "",
  },
  {
    name: "",
    mobile: "",
    email: "",
    createdAt: "",
    propertyType: "",
    leadSource: "",
    leadOwner: "",
  },
  {
    name: "",
    mobile: "",
    email: "",
    createdAt: "",
    propertyType: "",
    leadSource: "",
    leadOwner: "",
  },
  {
    name: "",
    mobile: "",
    email: "",
    createdAt: "",
    propertyType: "",
    leadSource: "",
    leadOwner: "",
  },
  {
    name: "",
    mobile: "",
    email: "",
    createdAt: "",
    propertyType: "",
    leadSource: "",
    leadOwner: "",
  },
  {
    name: "",
    mobile: "",
    email: "",
    createdAt: "",
    propertyType: "",
    leadSource: "",
    leadOwner: "",
  },
];

function Leads() {
  const rows = elements.map((element, i) => (
    <Table.Tr key={i}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.mobile}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
      <Table.Td>{element.propertyType}</Table.Td>
      <Table.Td>{element.leadSource}</Table.Td>
      <Table.Td>{element.leadOwner}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Flex className="w-[100%] px-5 py-3 justify-center flex-col gap-3 bg-slate-50">
      <Flex className=" justify-between">
        <Flex className="w-[30%] h-[15vh] justify-center items-end bg-white rounded-lg py-2 drop-shadow-md">
          {" "}
          <FileInput
            leftSection={<IconUpload size={20} />}
            placeholder="Input placeholder"
          />
        </Flex>
        <Flex className="w-[40%] h-[15vh] flex-wrap flex-col justify-evenly items-center bg-white rounded-lg py-2 drop-shadow-md">
          <Flex className="w-[100%] justify-around">
            <Text>Total No. of Leads: 600</Text>
            <Text>Hibernated Leads: 600</Text>
          </Flex>
          <Flex className="w-[100%] justify-around">
            <Text>Assigned Leads: 600</Text>
            <Text>Un-Assigned Leads: 600</Text>
          </Flex>
        </Flex>
      </Flex>
      <Table
        highlightOnHover
        withTableBorder
        withColumnBorders
        verticalSpacing="lg"
        className=" bg-white border-2 drop-shadow-md"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.No</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Mobile No.</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Property Type</Table.Th>
            <Table.Th>Lead Source</Table.Th>
            <Table.Th>Lead Owner</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Flex>
  );
}

export default Leads;
