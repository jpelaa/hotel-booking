import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { ERROR_TOAST_STYLE, SUCCESS_TOAST_STYLE } from "../../static/styles";
import { v4 as uuidv4 } from "uuid";
import { API_STATUS } from "../../static/common";
import NoPaymentInfo from "./nopaymentinfo";
import PaymentError from "./paymenterror";
import PaymentList from "./paymentlist";
import Payment from "./payment";
import {
  RESET_PAYMENT_VALUE,
  UPDATE_PAYMENT,
  UPDATE_PAYMENT_VALUE,
  usePaymentContext,
} from "../../contexts/payment-context";

const Payments = (props) => {
  const firstField = React.useRef();
  const toast = useToast();
  const { isOpen, onClose, guestId, isCheckedOut } = props;
  const { state, dispatch } = usePaymentContext();
  const [paymentList, setPaymentList] = useState([]);
  const [paymentListAPILoadingStatus, setPaymentListAPILoadingStatus] =
    useState(API_STATUS.init);
  const [paymentListAPIErrorMessage, setPaymentListAPIErrorMessage] =
    useState("");

  const [isPaymentLoadingStatus, setPaymentLoadingStatus] = useState(
    API_STATUS.init
  );

  async function fetchPaymentList() {
    try {
      if (guestId) {
        setPaymentListAPILoadingStatus(API_STATUS.inProgress);
        const res = await fetch(
          `http://localhost:3001/payments?guestId=${guestId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const paymentListJSON = await res.json();
        setPaymentList(paymentListJSON);
        setPaymentListAPILoadingStatus(API_STATUS.success);
        dispatch({
          type: UPDATE_PAYMENT_VALUE,
          payload: {
            keyName: "guestId",
            value: guestId,
          },
        });
      } else {
        setPaymentListAPILoadingStatus(API_STATUS.init);
        setPaymentList([]);
      }
    } catch (err) {
      console.error(err);
      setPaymentListAPILoadingStatus(API_STATUS.failed);
      setPaymentListAPIErrorMessage(err.message);
    }
  }

  useEffect(() => {
    fetchPaymentList();
  }, [guestId]);

  const handleEdit = (paymentId) => {
    console.log(paymentId, "paymentId ");
    const selectedPaymentData = paymentList.find(
      (paymentData) => paymentData.id === paymentId
    );
    dispatch({
      type: UPDATE_PAYMENT_VALUE,
      payload: {
        keyName: "paymentId",
        value: paymentId,
      },
    });
    dispatch({
      type: UPDATE_PAYMENT,
      payload: { ...selectedPaymentData },
    });
  };

  const handlePaymentDateChange = (value) => {
    dispatch({
      type: UPDATE_PAYMENT_VALUE,
      payload: {
        keyName: "paymentDate",
        value,
      },
    });
  };

  const handleModeChange = (value) => {
    dispatch({
      type: UPDATE_PAYMENT_VALUE,
      payload: {
        keyName: "mode",
        value,
      },
    });
  };

  const handleDescChange = (event) => {
    dispatch({
      type: UPDATE_PAYMENT_VALUE,
      payload: {
        keyName: "desc",
        value: event.target.value,
      },
    });
  };

  const handleAmountChange = (event) => {
    dispatch({
      type: UPDATE_PAYMENT_VALUE,
      payload: {
        keyName: "amount",
        value: Number(event.target.value),
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const body = { ...state };
      setPaymentLoadingStatus(API_STATUS.inProgress);
      if (state.id) {
        await fetch(`http://localhost:3001/payments/${state.id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      } else {
        const id = uuidv4();
        await fetch("http://localhost:3001/payments", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...body, id }),
        });
      }

      const text = `You've successfully ${
        state.id ? "edited" : "recorded"
      } payment`;
      toast({
        title: `Payment ${state.id ? "Updated" : "Added"}`,
        status: "success",
        position: "bottom-end",
        description: text,
        containerStyle: SUCCESS_TOAST_STYLE,
        duration: 2000,
        isClosable: true,
      });
      setPaymentLoadingStatus(API_STATUS.success);
      await fetchPaymentList();
      dispatch({
        type: RESET_PAYMENT_VALUE,
      });
    } catch (err) {
      console.error(err);
      setPaymentLoadingStatus(API_STATUS.failed);
      toast({
        title: "Payment Add Failed",
        status: "error",
        position: "bottom-end",
        description: "Payment is not added",
        containerStyle: ERROR_TOAST_STYLE,
        duration: 2000,
        isClosable: true,
      });
    }
  };

  console.log(paymentList, " paymentList ");
  console.log(paymentListAPILoadingStatus, " paymentListAPILoadingStatus ");
  console.log(paymentListAPIErrorMessage, " paymentListAPIErrorMessage ");
  console.log(state, " state of payment ");

  return (
    <Drawer
      isOpen={isOpen}
      size="xl"
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Payment</DrawerHeader>
        <DrawerBody>
          {paymentListAPILoadingStatus === API_STATUS.failed && (
            <PaymentError message={paymentListAPIErrorMessage} />
          )}
          {paymentListAPILoadingStatus === API_STATUS.inProgress && (
            <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
              <CircularProgress isIndeterminate />
            </Flex>
          )}
          {paymentListAPILoadingStatus === API_STATUS.success && (
            <Grid h="100%" templateRows="70% 30%" m="4">
              <Box overflowY="scroll">
                {paymentList.length > 0 ? (
                  <PaymentList
                    paymentList={paymentList}
                    isCheckedOut={isCheckedOut}
                    handleEdit={handleEdit}
                  />
                ) : (
                  <NoPaymentInfo />
                )}
              </Box>
              <Payment
                paymentId={state.id}
                paymentDate={state.paymentDate}
                mode={state.mode}
                desc={state.desc}
                amount={state.amount}
                handlePaymentDateChange={handlePaymentDateChange}
                handleModeChange={handleModeChange}
                handleDescChange={handleDescChange}
                handleAmountChange={handleAmountChange}
              />
            </Grid>
          )}
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="primaryOutline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={isPaymentLoadingStatus === API_STATUS.inProgress}
            loadingText={state.id ? "Updating" : "Submitting"}
            variant="primary"
            onClick={handleSubmit}
          >
            {state.id ? "Update" : "Submit"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Payments;
