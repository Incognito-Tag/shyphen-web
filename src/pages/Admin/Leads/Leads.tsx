import { FileInput, Flex, Table, Text } from "@mantine/core";
import {
  IconCsv,
  IconFileBarcode,
  IconFileExcel,
  IconUpload,
} from "@tabler/icons-react";
import { fetchAllLeads, saveLeadsFile } from "../../../utils/apiCalls";
import { useEffect, useState } from "react";

function Leads() {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    fetchAllLeads()
      .then((data) => {
        console.log(data);
        setLeads(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const saveFile = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const data = await saveLeadsFile(formData);
      console.log(data);
      setLeads(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Flex className="w-[100%] px-5 py-3 justify-center flex-col gap-3 bg-slate-50">
      <Flex className=" justify-between">
        <Flex className="w-[30%] h-[15vh] flex-col justify-around items-center bg-white rounded-lg py-2 drop-shadow-md">
          {" "}
          <Flex className="gap-4">
            <IconCsv size={35} />
            <IconFileBarcode size={35} />
            <IconFileExcel size={35} />
          </Flex>
          <FileInput
            onChange={saveFile}
            leftSection={<IconUpload size={20} />}
            placeholder="Input placeholder"
            accept=".csv, .xlsx"
          />
        </Flex>
        <Flex className="w-[40%] h-[15vh] flex-wrap flex-col justify-evenly items-center bg-white rounded-lg py-2 drop-shadow-md">
          <Flex className="w-[100%] justify-around">
            <Text>Total No. of Leads: {leads.length}</Text>
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
            {/* <Table.Th>Created At</Table.Th> */}
            <Table.Th>Property Type</Table.Th>
            <Table.Th>Lead Source</Table.Th>
            {/* <Table.Th>Lead Owner</Table.Th> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {leads.length !== 0
            ? leads.map((lead: any, i) => {
                return (
                  <Table.Tr key={i}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>{lead.name}</Table.Td>
                    <Table.Td>{lead.mobileNo}</Table.Td>
                    <Table.Td>{lead.email}</Table.Td>
                    {/* <Table.Td>{lead.createdAt}</Table.Td> */}
                    <Table.Td>{lead.propertyType}</Table.Td>
                    <Table.Td>{lead.leadSource}</Table.Td>
                    {/* <Table.Td>{lead.leadOwner}</Table.Td> */}
                  </Table.Tr>
                );
              })
            : null}
        </Table.Tbody>
      </Table>
    </Flex>
  );
}

export default Leads;
