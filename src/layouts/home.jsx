import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Box,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Select,
  SimpleGrid,
  useBoolean,
  useDisclosure,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  RESET_HOTEL_VALUE,
  UPDATE_HOTEL_VALUE,
  useHotelContext,
} from "../hotel-context";
import useCounts from "../hooks/useCounts";
import Payments from "./payments";
import { DayPickerRangeController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "../styles/react_dates_overrides.css";
import moment from "moment";
import { INPUT_STYLES } from "../static/styles";
import { AddIcon } from "@chakra-ui/icons";
import AddGuest from "./addguest";
import AutoComplete from "../components/AutoComplete";

const Home = (props) => {
  const { state, dispatch } = useHotelContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypesAPILoadingStatus, setRoomTypesAPILoadingStatus] =
    useState(false);

  const [startDatePopOver, setStartDatePopOver] = useBoolean();
  const [endDatePopOver, setEndDatePopOver] = useBoolean();

  const [focusedInput, setFocusedInput] = useState("startDate");

  const {
    adultInc,
    adultDec,
    adultInput,
    childrenInc,
    childrenDec,
    childrenInput,
    roomsInc,
    roomsDec,
    roomsInput,
    noOfAdults,
    noOfChildren,
    noOfRooms,
  } = useCounts();

  useEffect(() => {
    dispatch({
      type: UPDATE_HOTEL_VALUE,
      payload: {
        keyName: "noOfRooms",
        value: Number(noOfRooms),
      },
    });
  }, [noOfRooms]);

  useEffect(() => {
    dispatch({
      type: UPDATE_HOTEL_VALUE,
      payload: {
        keyName: "noOfAdults",
        value: Number(noOfAdults),
      },
    });
  }, [noOfAdults]);

  useEffect(() => {
    dispatch({
      type: UPDATE_HOTEL_VALUE,
      payload: {
        keyName: "noOfChildren",
        value: Number(noOfChildren),
      },
    });
  }, [noOfChildren]);

  useEffect(() => {
    async function fetchRoomTypes() {
      setRoomTypesAPILoadingStatus(true);
      const res = await fetch("http://localhost:3001/roomTypes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const roomTypesJSON = await res.json();
      setRoomTypes(roomTypesJSON);
      setRoomTypesAPILoadingStatus(false);
    }
    fetchRoomTypes();
  }, []);

  const handleClear = () => {
    dispatch({ type: RESET_HOTEL_VALUE });
  };
  const toast = useToast();

  console.log(state, " state of asdasd");

  console.log(focusedInput, " state of asdasd");

  return (
    <>
      <Grid templateColumns="40% 60%" m="4">
        <Grid
          gap="2"
          w="100%"
          p={10}
          borderRadius="3xl"
          border="1px solid"
          borderColor="lightBlue"
          bg="lightBlue"
        >
          <Heading>Guest Checkin/Checkout</Heading>
          <FormControl id="searchGuestName">
            <FormLabel>Guest Name</FormLabel>
            <HStack spacing="2">
              {/* <Input {...INPUT_STYLES} type="text" placeholder="Search" /> */}
              <AutoComplete />
              <IconButton
                aria-label="Add Guest"
                icon={<AddIcon />}
                onClick={onModalOpen}
              />
            </HStack>
          </FormControl>
          <SimpleGrid columns={2} spacing={6}>
            <Popover
              placement="bottom-start"
              isOpen={startDatePopOver}
              onOpen={setStartDatePopOver.on}
              onClose={setStartDatePopOver.on}
            >
              <PopoverTrigger>
                <FormControl id="arrivalDate">
                  <FormLabel color="#1F2223">Arrival</FormLabel>
                  <Input
                    {...INPUT_STYLES}
                    type="date"
                    placeholder="Date"
                    value={moment(startDate).format("YYYY-MM-DD")}
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent w={"100"} focusBorderColor="primary">
                <PopoverArrow />
                <DayPickerRangeController
                  onOutsideClick={setStartDatePopOver.off}
                  onDatesChange={(value) => {
                    console.log(value, "startDate, endDate ");
                    setStartDate(value.startDate);
                    setEndDate(value.endDate);
                    if (value.endDate) {
                      setStartDatePopOver.off();
                    }
                  }}
                  focusedInput={focusedInput}
                  onFocusChange={(value) =>
                    setFocusedInput(value || "startDate")
                  }
                  startDate={startDate}
                  endDate={endDate}
                  numberOfMonths={2}
                  keepOpenOnDateSelect={true}
                  hideKeyboardShortcutsPanel={true}
                />
              </PopoverContent>
            </Popover>
            <Popover
              placement="bottom-end"
              isOpen={endDatePopOver}
              onOpen={setEndDatePopOver.on}
              onClose={setEndDatePopOver.on}
            >
              <PopoverTrigger>
                <FormControl id="departureDate">
                  <FormLabel color="#1F2223">Departure</FormLabel>
                  <Input
                    type="date"
                    {...INPUT_STYLES}
                    placeholder="Date"
                    value={moment(endDate).format("YYYY-MM-DD")}
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent w={"100"}>
                <PopoverArrow />
                <DayPickerRangeController
                  onOutsideClick={setEndDatePopOver.off}
                  onDatesChange={(value) => {
                    setStartDate(value.startDate);
                    setEndDate(value.endDate);
                    if (value.endDate) {
                      setEndDatePopOver.off();
                    }
                  }}
                  focusedInput={focusedInput}
                  onFocusChange={(value) =>
                    setFocusedInput(value || "startDate")
                  }
                  startDate={startDate}
                  endDate={endDate}
                  numberOfMonths={2}
                  hideKeyboardShortcutsPanel={true}
                />
              </PopoverContent>
            </Popover>
          </SimpleGrid>
          <Grid templateColumns="repeat(3,1fr)" gap={6}>
            <FormControl id="adults">
              <FormLabel>Adults</FormLabel>
              <HStack>
                <Button variant="icon" {...adultInc}>
                  +
                </Button>
                <Input {...INPUT_STYLES} {...adultInput} />
                <Button variant="icon" {...adultDec}>
                  -
                </Button>
              </HStack>
            </FormControl>
            <FormControl id="children">
              <FormLabel>Children</FormLabel>
              <HStack>
                <Button variant="icon" {...childrenInc}>
                  +
                </Button>
                <Input {...INPUT_STYLES} {...childrenInput} />
                <Button variant="icon" {...childrenDec}>
                  -
                </Button>
              </HStack>
            </FormControl>
            <FormControl id="rooms">
              <FormLabel>Rooms</FormLabel>
              <HStack>
                <Button variant="icon" {...roomsInc}>
                  +
                </Button>
                <Input {...INPUT_STYLES} {...roomsInput} />
                <Button variant="icon" {...roomsDec}>
                  -
                </Button>
              </HStack>
            </FormControl>
          </Grid>
          <FormControl id="roomType">
            <FormLabel color="#1F2223">Room Type</FormLabel>
            {roomTypesAPILoadingStatus ? (
              <p>Loading...</p>
            ) : (
              <Select
                {...INPUT_STYLES}
                placeholder="Select the Room Type"
                value={state.roomType}
                onChange={(e) => {
                  let ratePerRoom = 0;
                  const selectedRoomType = e.target.value;

                  const roomValueObj = roomTypes.find(
                    (roomData) => roomData.roomId == selectedRoomType
                  );
                  if (roomValueObj && roomValueObj.roomRate) {
                    ratePerRoom = roomValueObj.roomRate;
                  }
                  dispatch({
                    type: UPDATE_HOTEL_VALUE,
                    payload: {
                      keyName: "ratePerRoom",
                      value: Number(ratePerRoom),
                    },
                  });
                  dispatch({
                    type: UPDATE_HOTEL_VALUE,
                    payload: {
                      keyName: "roomType",
                      value: e.target.value,
                    },
                  });
                }}
              >
                {roomTypes.map((roomData) => (
                  <option value={roomData.roomId}>{roomData.roomType}</option>
                ))}
              </Select>
            )}
          </FormControl>
          <Grid templateColumns="repeat(3,1fr)" gap={6}>
            <FormControl id="arrivalDate">
              <FormLabel color="#1F2223">Rate</FormLabel>
              <NumberInput
                borderColor="#1F2223"
                borderRadius="2xl"
                focusBorderColor="#1F2223"
                color="#1F2223"
                bg="#FFFFFF"
                allowMouseWheel
                value={state.ratePerRoom}
                onChange={(value) =>
                  dispatch({
                    type: UPDATE_HOTEL_VALUE,
                    payload: {
                      keyName: "ratePerRoom",
                      value: Number(value),
                    },
                  })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl id="departureDate">
              <FormLabel color="#1F2223">Nights</FormLabel>
              <NumberInput
                borderColor="#1F2223"
                borderRadius="2xl"
                focusBorderColor="#1F2223"
                color="#1F2223"
                bg="#FFFFFF"
                allowMouseWheel
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl id="departureDate">
              <FormLabel color="#1F2223">Estimated Cost</FormLabel>
              <NumberInput
                borderColor="#1F2223"
                borderRadius="2xl"
                focusBorderColor="#1F2223"
                color="#1F2223"
                bg="#FFFFFF"
                allowMouseWheel
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(3,1fr)" gap={6} p="8">
            <Button onClick={() => {}}>SAVE</Button>
            <Button variant="secondary" onClick={onOpen}>
              PAYMENT
            </Button>
            <Button variant="primaryOutline" onClick={handleClear}>
              CLEAR
            </Button>
          </Grid>
        </Grid>
        <Box></Box>
      </Grid>
      <Payments isOpen={isOpen} onClose={onClose} />
      <AddGuest
        onModalClose={onModalClose}
        onModalOpen={onModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default Home;
