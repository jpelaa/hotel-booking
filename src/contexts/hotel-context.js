import moment from "moment";
import * as React from "react";

export const UPDATE_HOTEL_VALUE = "UPDATE_HOTEL_VALUE";
export const UPDATE_HOTEL = "UPDATE_HOTEL";
export const RESET_HOTEL_VALUE = "RESET_HOTEL_VALUE";

const HotelContext = React.createContext();

const initialState = {
  id: "",
  guestId: "",
  arrivalDate: moment(),
  departureDate: moment().add(1, "d"),
  noOfAdults: 0,
  noOfChildren: 0,
  noOfRooms: 0,
  roomType: "",
  ratePerRoom: 0,
  noOfNights: 0,
  estimatedCost: 0,
  isCheckedOut: false,
};

function hotelReducer(state, action) {
  switch (action.type) {
    case UPDATE_HOTEL_VALUE: {
      return { ...state, [action.payload.keyName]: action.payload.value };
    }
    case UPDATE_HOTEL: {
      return { ...state, ...action.payload };
    }
    case RESET_HOTEL_VALUE: {
      return initialState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function HotelProvider({ children }) {
  const [state, dispatch] = React.useReducer(hotelReducer, initialState);
  const value = { state, dispatch };
  return (
    <HotelContext.Provider value={value}>{children}</HotelContext.Provider>
  );
}

function useHotelContext() {
  const context = React.useContext(HotelContext);
  if (context === undefined) {
    throw new Error("useHotelContext must be used within a HotelProvider");
  }
  return context;
}

export { HotelProvider, useHotelContext };
