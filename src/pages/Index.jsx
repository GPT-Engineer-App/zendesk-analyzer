import React, { useState } from "react";
import { Container, Text, VStack, HStack, Box, Stat, StatLabel, StatNumber, StatHelpText, IconButton, Table, Thead, Tbody, Tr, Th, Td, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select } from "@chakra-ui/react";
import { FaSmile, FaClock, FaTag, FaCheckCircle } from "react-icons/fa";

const mockTickets = [
  { id: 1, customer: "John Doe", csat: 4, firstResponseTime: "2h", category: "Billing", timeToResolution: "5h" },
  { id: 2, customer: "Jane Smith", csat: 5, firstResponseTime: "1h", category: "Technical", timeToResolution: "3h" },
  { id: 3, customer: "Alice Johnson", csat: 3, firstResponseTime: "4h", category: "General", timeToResolution: "8h" },
];

const Index = () => {
  const [tickets, setTickets] = useState(mockTickets);

  const averageCSAT = tickets.reduce((acc, ticket) => acc + ticket.csat, 0) / tickets.length;
  const averageFirstResponseTime = tickets.reduce((acc, ticket) => acc + parseInt(ticket.firstResponseTime), 0) / tickets.length;
  const averageTimeToResolution = tickets.reduce((acc, ticket) => acc + parseInt(ticket.timeToResolution), 0) / tickets.length;

  const [showFileInput, setShowFileInput] = useState(false);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [columnMappings, setColumnMappings] = useState({
    customer: "",
    csat: "",
    firstResponseTime: "",
    category: "",
    timeToResolution: "",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      setCsvData(lines);
      setShowMappingModal(true);
    };
    reader.readAsText(file);
  };

  const handleMappingChange = (field, value) => {
    setColumnMappings((prev) => ({ ...prev, [field]: value }));
  };

  const handleMappingSubmit = () => {
    const data = parseCSV(csvData, columnMappings);
    setTickets(data);
    setShowMappingModal(false);
  };

  const parseCSV = (lines, mappings) => {
    const headers = lines[0].split(",");
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].split(",");
      if (line.length === headers.length) {
        result.push({
          id: i,
          customer: line[headers.indexOf(mappings.customer)],
          csat: parseInt(line[headers.indexOf(mappings.csat)]),
          firstResponseTime: line[headers.indexOf(mappings.firstResponseTime)],
          category: line[headers.indexOf(mappings.category)],
          timeToResolution: line[headers.indexOf(mappings.timeToResolution)],
        });
      }
    }
    return result;
  };

  const handleFileUploadClick = () => {
    setShowFileInput(true);
  };

  return (
    <Container centerContent maxW="container.lg" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={8} width="100%">
        <Text fontSize="3xl" fontWeight="bold">
          Zendesk Ticket Analysis
        </Text>
        <HStack spacing={8} width="100%" justifyContent="space-around">
          <Stat>
            <StatLabel>Average CSAT</StatLabel>
            <StatNumber>{averageCSAT.toFixed(1)}</StatNumber>
            <StatHelpText>Out of 5</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>First Response Time</StatLabel>
            <StatNumber>{averageFirstResponseTime.toFixed(1)}h</StatNumber>
            <StatHelpText>Average</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Time to Resolution</StatLabel>
            <StatNumber>{averageTimeToResolution.toFixed(1)}h</StatNumber>
            <StatHelpText>Average</StatHelpText>
          </Stat>
        </HStack>
        <Box width="100%" mt={4}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Customer</Th>
                <Th>CSAT</Th>
                <Th>First Response Time</Th>
                <Th>Category</Th>
                <Th>Time to Resolution</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tickets.map((ticket) => (
                <Tr key={ticket.id}>
                  <Td>{ticket.customer}</Td>
                  <Td>{ticket.csat}</Td>
                  <Td>{ticket.firstResponseTime}</Td>
                  <Td>{ticket.category}</Td>
                  <Td>{ticket.timeToResolution}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Input type="file" accept=".csv" onChange={handleFileUpload} display="none" ref={(input) => input && input.click()} />
        <Button colorScheme="blue" size="lg" onClick={() => document.querySelector('input[type="file"]').click()}>
          Upload Data
        </Button>
      </VStack>

      <Modal isOpen={showMappingModal} onClose={() => setShowMappingModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Map CSV Columns</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {["customer", "csat", "firstResponseTime", "category", "timeToResolution"].map((field) => (
                <HStack key={field} width="100%">
                  <Text width="50%">{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                  <Select placeholder="Select column" onChange={(e) => handleMappingChange(field, e.target.value)}>
                    {csvData[0]?.split(",").map((col, index) => (
                      <option key={index} value={col}>
                        {col}
                      </option>
                    ))}
                  </Select>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleMappingSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={() => setShowMappingModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
