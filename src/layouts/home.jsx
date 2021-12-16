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
    <Grid templateColumns="60% 40%" gap={6} m="4">
      <Box w="100%" p={4} borderRadius="2xl" border="1px solid" borderColor="primary">
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

        <Grid templateColumns="repeat(3,1fr)" gap={6} p="8">
          <Button variant="primary" >Save</Button>
          <Button variant="secondary">Payments</Button>
          <Button variant="secondaryOutline">Cancel</Button>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Home;
