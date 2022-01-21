import { useNumberInput } from "@chakra-ui/react";

const useCounts = () => {
  const {
    valueAsNumber: noOfAdults,
    getInputProps: getInputPropsAdult,
    getIncrementButtonProps: getIncrementButtonPropsAdult,
    getDecrementButtonProps: getDecrementButtonPropsAdult,
  } = useNumberInput({
    defaultValue: 1,
    min: 0,
    max: 6,
  });

  const {
    valueAsNumber: noOfChildren,
    getInputProps: getInputPropsChildren,
    getIncrementButtonProps: getIncrementButtonPropsChildren,
    getDecrementButtonProps: getDecrementButtonPropsChildren,
  } = useNumberInput({
    defaultValue: 0,
    min: 0,
    max: 6,
  });

  const {
    valueAsNumber: noOfRooms,
    getInputProps: getInputPropsRooms,
    getIncrementButtonProps: getIncrementButtonPropsRooms,
    getDecrementButtonProps: getDecrementButtonPropsRooms,
  } = useNumberInput({
    defaultValue: 1,
    min: 0,
    max: 6,
  });

  const adultInc = getIncrementButtonPropsAdult();
  const adultDec = getDecrementButtonPropsAdult();
  const adultInput = getInputPropsAdult({ isReadOnly: true });
  const childrenInc = getIncrementButtonPropsChildren();
  const childrenDec = getDecrementButtonPropsChildren();
  const childrenInput = getInputPropsChildren({ isReadOnly: true });
  const roomsInc = getIncrementButtonPropsRooms();
  const roomsDec = getDecrementButtonPropsRooms();
  const roomsInput = getInputPropsRooms({ isReadOnly: true });

  return {
    adultInc,
    adultDec,
    adultInput,
    childrenInc,
    childrenDec,
    childrenInput,
    roomsInc,
    roomsDec,
    roomsInput,
    noOfRooms,
    noOfChildren,
    noOfAdults,
  };
};

export default useCounts;
