import * as React from "react";

export const UPDATE_HOTEL_VALUE = "UPDATE_HOTEL_VALUE";
export const RESET_HOTEL_VALUE = "RESET_HOTEL_VALUE";

const HotelContext = React.createContext();

const initialState = {
  guestName: null,
  arrivalDate: null,
  departureDate: null,
  noOfAdults: 0,
  noOfChildren: 0,
  noOfRooms: 0,
  roomType: "",
  ratePerRoom: 0,
  noOfNights: 0,
  estimatedCost: 0,
};

function hotelReducer(state, action) {
  switch (action.type) {
    case UPDATE_HOTEL_VALUE: {
      return { [state.keyName]: state.payload };
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
