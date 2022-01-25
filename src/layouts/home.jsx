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
import { v4 as uuidv4 } from "uuid";
import {
  RESET_HOTEL_VALUE,
  UPDATE_HOTEL,
  UPDATE_HOTEL_VALUE,
  useHotelContext,
} from "../contexts/hotel-context";
import useCounts from "../hooks/useCounts";
import Payments from "./payments";
import { DayPickerRangeController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "../styles/react_dates_overrides.css";
import moment from "moment";
import {
  ERROR_TOAST_STYLE,
  INPUT_STYLES,
  SUCCESS_TOAST_STYLE,
} from "../static/styles";
import { AddIcon } from "@chakra-ui/icons";
import AddGuest from "./addguest";
import AutoComplete from "../components/AutoComplete";
import { PaymentProvider } from "../contexts/payment-context";
import { itemToString, searchGuest } from "../utils/common";
import useDebounce from "../hooks/useDebouce";
import { API_STATUS, API_URL } from "../static/common";

const Home = (props) => {
  const { state, dispatch } = useHotelContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypesAPILoadingStatus, setRoomTypesAPILoadingStatus] =
    useState(false);

  const [checkInAPILoadingStatus, setCheckInAPILoadingStatus] = useState(
    API_STATUS.init
  );
  const [checkoutAPILoadingStatus, setCheckoutAPILoadingStatus] =
    useState(false);
  //Guest Search States
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState("");
  const [hasAlreadySaved, setHasAlreadySaved] = useState(false);

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

  useEffect(() => {
    if (state.arrivalDate && state.departureDate) {
      const departureDate = moment(state.departureDate);
      const arrivalDate = moment(state.arrivalDate);

      const noOfNights = departureDate.diff(arrivalDate, "d");
      dispatch({
        type: UPDATE_HOTEL_VALUE,
        payload: {
          keyName: "noOfNights",
          value: Number(noOfNights),
        },
      });
    }
  }, [state.arrivalDate, state.departureDate]);

  useEffect(() => {
    if (state.noOfRooms && state.noOfNights && state.ratePerRoom) {
      const estimatedCost =
        state.noOfRooms * state.noOfNights * state.ratePerRoom;
      dispatch({
        type: UPDATE_HOTEL_VALUE,
        payload: {
          keyName: "estimatedCost",
          value: Number(estimatedCost),
        },
      });
    }
  }, [state.noOfRooms, state.noOfNights, state.ratePerRoom]);

  const handleClear = () => {
    dispatch({ type: RESET_HOTEL_VALUE });
  };

  //Guest Search
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchGuest(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setSuggestions(results);
        });
      } else {
        setSuggestions([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleSelectedItemChange = async (val) => {
    try {
      const guestId = val.selectedItem.id;
      setSelectedItem(val.selectedItem);
      const res = await fetch(
        `${API_URL}checkIns?guestId=${guestId}&isCheckedOut=false`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: UPDATE_HOTEL_VALUE,
        payload: {
          keyName: "guestId",
          value: guestId,
        },
      });
      const checkInListJSON = await res.json();
      if (checkInListJSON.length === 1) {
        const checkInData = checkInListJSON[0];
        dispatch({
          type: UPDATE_HOTEL,
          payload: { ...checkInData },
        });
        setHasAlreadySaved(true);
      } else {
        setHasAlreadySaved(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuggestions = ({ inputValue }) => {
    setSearchValue(inputValue);
  };

  const clearSelection = () => {
    setSelectedItem(null);
    dispatch({
      type: RESET_HOTEL_VALUE,
    });
  };

  //Save function
  const handleSave = async () => {
    try {
      const body = { ...state };
      setCheckInAPILoadingStatus(API_STATUS.inProgress);
      if (hasAlreadySaved) {
        await fetch(`${API_URL}checkIns/${state.id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      } else {
        const id = uuidv4();
        await fetch(`${API_URL}checkIns`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...body, id }),
        });
        dispatch({
          type: UPDATE_HOTEL_VALUE,
          payload: {
            keyName: "id",
            value: id,
          },
        });
      }

      const text = `You've successfully ${
        hasAlreadySaved ? "Updated" : ""
      } CheckedIn.`;
      toast({
        title: "Guest CheckedIn",
        status: "success",
        description: text,
        containerStyle: SUCCESS_TOAST_STYLE,
        duration: 2000,
        isClosable: true,
      });
      setCheckInAPILoadingStatus(API_STATUS.success);
    } catch (err) {
      console.error(err);
      toast({
        title: "Guest CheckIn Failed",
        status: "error",
        description: "Guest is not checkedin",
        containerStyle: ERROR_TOAST_STYLE,
        duration: 2000,
        isClosable: true,
      });
      setCheckInAPILoadingStatus(API_STATUS.failed);
    }
  };

  //Check out
  const handleCheckoutChange = async () => {
    if (hasAlreadySaved) {
      const body = { ...state, isCheckedOut: true };
      setCheckoutAPILoadingStatus(true);
      const res = await fetch(`${API_URL}payments?checkinId=${state.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const paymentListJSON = await res.json();
      if (paymentListJSON.length > 0) {
        await fetch(`${API_URL}checkIns/${state.id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        dispatch({
          type: UPDATE_HOTEL_VALUE,
          payload: {
            keyName: "isCheckedOut",
            value: true,
          },
        });
        const text = `You've successfully Checkout.`;
        toast({
          title: "Guest Checkout",
          status: "success",
          description: text,
          containerStyle: SUCCESS_TOAST_STYLE,
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Wrong Checkout",
          status: "error",
          description: "Please add payments before checkout",
          containerStyle: ERROR_TOAST_STYLE,
          duration: 2000,
          isClosable: true,
        });
      }
      setCheckoutAPILoadingStatus(false);
    } else {
      toast({
        title: "Wrong Checkout",
        status: "error",
        description: "Please save this before checkout",
        containerStyle: ERROR_TOAST_STYLE,
        duration: 2000,
        isClosable: true,
      });
      setCheckoutAPILoadingStatus(false);
    }
  };

  const toast = useToast();

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
              <AutoComplete
                searchValue={searchValue}
                selectedItem={selectedItem}
                suggestions={suggestions}
                itemToString={itemToString}
                isSearching={isSearching}
                handleSelectedItemChange={handleSelectedItemChange}
                handleSuggestions={handleSuggestions}
                clearSelection={clearSelection}
              />
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
                    value={moment(state.arrivalDate).format("YYYY-MM-DD")}
                    isReadOnly
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent w={"100"} focusBorderColor="primary">
                <PopoverArrow />
                <DayPickerRangeController
                  onOutsideClick={setStartDatePopOver.off}
                  onDatesChange={(value) => {
                    dispatch({
                      type: UPDATE_HOTEL_VALUE,
                      payload: {
                        keyName: "arrivalDate",
                        value: value.startDate,
                      },
                    });
                    dispatch({
                      type: UPDATE_HOTEL_VALUE,
                      payload: {
                        keyName: "departureDate",
                        value: value.endDate,
                      },
                    });
                    if (value.endDate) {
                      setStartDatePopOver.off();
                    }
                  }}
                  focusedInput={focusedInput}
                  onFocusChange={(value) =>
                    setFocusedInput(value || "startDate")
                  }
                  startDate={moment(state.arrivalDate)}
                  endDate={moment(state.departureDate)}
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
                    value={moment(state.departureDate).format("YYYY-MM-DD")}
                    isReadOnly
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent w={"100"}>
                <PopoverArrow />
                <DayPickerRangeController
                  onOutsideClick={setEndDatePopOver.off}
                  onDatesChange={(value) => {
                    dispatch({
                      type: UPDATE_HOTEL_VALUE,
                      payload: {
                        keyName: "arrivalDate",
                        value: value.startDate,
                      },
                    });
                    dispatch({
                      type: UPDATE_HOTEL_VALUE,
                      payload: {
                        keyName: "departureDate",
                        value: value.endDate,
                      },
                    });
                    if (value.endDate) {
                      setEndDatePopOver.off();
                    }
                  }}
                  focusedInput={focusedInput}
                  onFocusChange={(value) =>
                    setFocusedInput(value || "startDate")
                  }
                  startDate={moment(state.arrivalDate)}
                  endDate={moment(state.departureDate)}
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
                <Input
                  {...INPUT_STYLES}
                  {...adultInput}
                  value={state.noOfAdults}
                />
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
                <Input
                  {...INPUT_STYLES}
                  {...childrenInput}
                  value={state.noOfChildren}
                />
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
                <Input
                  {...INPUT_STYLES}
                  {...roomsInput}
                  value={state.noOfRooms}
                />
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
                    (roomData) => roomData.roomId === selectedRoomType
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
                  <option key={roomData.roomId} value={roomData.roomId}>
                    {roomData.roomType}
                  </option>
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
                value={state.noOfNights}
                isReadOnly
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
                value={state.estimatedCost}
                onChange={(value) =>
                  dispatch({
                    type: UPDATE_HOTEL_VALUE,
                    payload: {
                      keyName: "estimatedCost",
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
          </Grid>

          <Grid templateColumns="repeat(3,1fr)" gap={6} p="8">
            <Button
              isLoading={checkInAPILoadingStatus === API_STATUS.inProgress}
              loadingText="Checking In..."
              onClick={handleSave}
              disabled={state.isCheckedOut}
            >
              SAVE
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                if (state.id) {
                  onOpen();
                } else {
                  toast({
                    title: "No Checkin",
                    status: "error",
                    description:
                      "Please Checkin then only you can proceed payments",
                    containerStyle: ERROR_TOAST_STYLE,
                    duration: 2000,
                    isClosable: true,
                  });
                }
              }}
            >
              PAYMENT
            </Button>
            <Button
              variant={"primaryOutline"}
              isLoading={checkoutAPILoadingStatus}
              loadingText="Checking out"
              colorScheme={state.isCheckedOut ? "blackAlpha" : null}
              disabled={state.isCheckedOut}
              onClick={handleCheckoutChange}
            >
              {state.isCheckedOut ? "CHECKED OUT" : "CHECK OUT"}
            </Button>
          </Grid>
        </Grid>
        <Box></Box>
      </Grid>
      {isOpen && (
        <PaymentProvider>
          <Payments
            checkinId={state.id}
            isCheckedOut={state.isCheckedOut}
            isOpen={isOpen}
            onClose={onClose}
          />
        </PaymentProvider>
      )}
      <AddGuest
        onModalClose={onModalClose}
        onModalOpen={onModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default Home;
