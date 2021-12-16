import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
  } from "@chakra-ui/react";
  import Payments from "./payments";
  
  const AddGuest = () => {
    return (
      <Grid templateColumns="60% 40%" gap={6} m="4">
        <Box w="100%" p={4} borderRadius="2xl" border="1px solid" borderColor="primary">
          <Heading>Guest Details</Heading>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input type="text" placeholder="Enter your First Name" />
          </FormControl>
            <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input type="text" placeholder="Enter your Last Name" />
            </FormControl>
  
          <Grid templateColumns="repeat(3,1fr)" gap={6}>
            <FormControl id="arrivalDate">
              <FormLabel>Arrival</FormLabel>
              <Input type="date" placeholder="Date" />
            </FormControl>
            <FormControl id="departureDate">
              <FormLabel>Departure</FormLabel>
              <Input type="date" placeholder="Date" />
            </FormControl>
            <FormControl id="departureDate">
              <FormLabel>Departure</FormLabel>
              <Input type="date" placeholder="Date" />
            </FormControl>
          </Grid>
  
          <FormControl id="roomType">
            <FormLabel>Room Type</FormLabel>
            <Input type="search" placeholder="Select the Room Type" />
          </FormControl>
  
          <Grid templateColumns="repeat(3,1fr)" gap={6}>
            <FormControl id="arrivalDate">
              <FormLabel>Rate</FormLabel>
              <Input type="date" placeholder="Date" />
            </FormControl>
            <FormControl id="departureDate">
              <FormLabel>Nights</FormLabel>
              <Input type="date" placeholder="Date" />
            </FormControl>
            <FormControl id="departureDate">
              <FormLabel>Estimated Cost</FormLabel>
              <Input type="date" placeholder="Date" />
            </FormControl>
          </Grid>
  
          <Grid templateColumns="repeat(3,1fr)" gap={6} p="8">
            <Button variant="primary" >ADD</Button>
            <Button variant="secondaryOutline">CANCEL</Button>
          </Grid>
        </Box>
        <Payments />
      </Grid>
    );
  };
  
  export default AddGuest;
  