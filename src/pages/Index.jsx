import React, { useState } from "react";
import { Container, Text, VStack, HStack, Box, Stat, StatLabel, StatNumber, StatHelpText, IconButton, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
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
        <Box width="100%">
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
      </VStack>
    </Container>
  );
};

export default Index;
