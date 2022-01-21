import * as React from "react";

export const UPDATE_PAYMENT_VALUE = "UPDATE_PAYMENT_VALUE";
export const RESET_PAYMENT_VALUE = "RESET_PAYMENT_VALUE";

const PaymentContext = React.createContext();

const initialState = {
  guestId: "",
  paymentDate: "",
  mode: "",
  others: "",
  desc: "",
  amount: 0,
};

function paymentReducer(state, action) {
  switch (action.type) {
    case UPDATE_PAYMENT_VALUE: {
      return { ...state, [action.payload.keyName]: action.payload.value };
    }
    case RESET_PAYMENT_VALUE: {
      return initialState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PaymentProvider({ children }) {
  const [state, dispatch] = React.useReducer(paymentReducer, initialState);
  const value = { state, dispatch };
  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}

function usePaymentContext() {
  const context = React.useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
}

export { PaymentProvider, usePaymentContext };
