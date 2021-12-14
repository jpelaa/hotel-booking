import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <Grid templateColumns="60% 40%" gap={6}>
      <Box w="100%" bg="blue.500">
        <Heading>Guest Checkin/Checkout</Heading>
        <FormControl id="searchGuestName">
          <FormLabel>Guest Name</FormLabel>
          <Input type="search" placeholder="Search" />
        </FormControl>
        <Grid templateColumns="repear(2,1fr)" gap={6}>
          <FormControl id="arrivalDate">
            <FormLabel>Arrival</FormLabel>
            <Input type="date" placeholder="Date" />
          </FormControl>
          <FormControl id="departureDate">
            <FormLabel>Departure</FormLabel>
            <Input type="date" placeholder="Date" />
          </FormControl>
        </Grid>

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

        <Grid templateColumns="repeat(3,1fr)" gap={6}>
          <Button>Save</Button>
          <Button>Payments</Button>
          <Button>Cancel</Button>t
        </Grid>
      </Box>
      <Box w="100%" h="10" bg="blue.500" />
    </Grid>
  );
};

export default Home;
