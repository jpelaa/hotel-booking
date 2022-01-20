import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { useState } from "react";
import {
  COMBO_BOX_STYLES,
  HIGHT_LIGHT_STYLES,
  INPUT_STYLES,
  LIST_STYLES,
} from "../../static/styles";

const menuStyles = {
  maxHeight: 80,
  maxWidth: 300,
  overflowY: "scroll",
  backgroundColor: "#eee",
  padding: 0,
  listStyle: "none",
  position: "relative",
};

const items = [
  {
    firstName: "asdas",
    lastName: "asdsa",
    email: "asdsa@asd.com",
    phoneNo: "9999999990",
    address1: "asda",
    address2: "asd",
    country: "",
    city: "asdas",
    state: "option1",
    postalCode: "213123",
    id: "bc0bb146-663a-4e61-aab6-2620c6bebda9",
  },
  {
    firstName: "asd",
    lastName: "asd",
    email: "asd@adad.com",
    phoneNo: "9999171177",
    address1: "hjashd",
    address2: "asd",
    country: "",
    city: "asd",
    state: "option2",
    postalCode: "223222",
    id: "0bcf7d64-35db-41ab-85f2-4d9eaa41a4bb",
  },
];

function AutoComplete() {
  const [inputItems, setInputItems] = useState(items);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectedItemChange = (val) => {
    console.log(val, " value ");
    setSelectedItem(val.selectedItem);
  };

  const clearSelection = () => {
    setSelectedItem(null);
  };

  const itemToString = (item) =>
    item ? `${item.firstName} ${item.lastName}` : "";

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString,
    selectedItem,
    onSelectedItemChange: handleSelectedItemChange,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.firstName.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });
  return (
    <Box w="100%">
      <div {...getComboboxProps()}>
        <InputGroup>
          <Input
            {...INPUT_STYLES}
            type="text"
            placeholder="Search"
            {...getInputProps({ refKey: "inputRef" })}
          />
          {selectedItem ? (
            <InputRightElement
              onClick={clearSelection}
              children={<CloseIcon boxSize="0.75rem" color="green.500" />}
            />
          ) : null}
        </InputGroup>
        {/* <IconButton
          color="secondary"
          className={classes.button}
          {...getToggleButtonProps()}
        >
          <ExpandMoreIcon className={classes.rightIcon} />
        </IconButton> */}
      </div>
      {isOpen && (
        <List {...COMBO_BOX_STYLES} {...getMenuProps()}>
          {inputItems.map((item, index) => {
            return (
              <ListItem
                {...LIST_STYLES}
                key={`${item.primary}-${index}`}
                {...(index === highlightedIndex
                  ? HIGHT_LIGHT_STYLES
                  : undefined)}
                {...getItemProps({
                  item,
                  index,
                })}
              >
                <Text fontSize="sm" fontWeight="bold">
                  {item.firstName} {item.lastName}
                </Text>
                <Flex>
                  <Text fontSize="xs">{item.email}</Text>
                  <Spacer />
                  <Text fontSize="xs" color="lightGrey1">
                    {item.phoneNo}
                  </Text>
                </Flex>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}

export default AutoComplete;
