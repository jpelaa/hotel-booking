import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useCombobox } from "downshift";
import {
  COMBO_BOX_STYLES,
  DISPLAY_HIDDEN,
  HIGHT_LIGHT_STYLES,
  INPUT_STYLES,
  LIST_STYLES,
} from "../../static/styles";

const AutoComplete = ({
  isSearching,
  selectedItem,
  suggestions,
  clearSelection,
  handleSelectedItemChange,
  handleSuggestions,
  itemToString,
}) => {
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    itemToString,
    selectedItem,
    onSelectedItemChange: handleSelectedItemChange,
    onInputValueChange: handleSuggestions,
  });
  return (
    <Box w="100%">
      <div {...getComboboxProps()}>
        <InputGroup>
          <Input
            {...INPUT_STYLES}
            type="text"
            placeholder="Search"
            {...getInputProps()}
          />
          {selectedItem ? (
            <InputRightElement
              onClick={clearSelection}
              children={<CloseIcon boxSize="0.75rem" color="green.500" />}
            />
          ) : null}
        </InputGroup>
      </div>
      <List
        {...(isOpen ? COMBO_BOX_STYLES : DISPLAY_HIDDEN)}
        {...getMenuProps()}
      >
        {isSearching && (
          <Progress size="xs" isIndeterminate colorScheme="gray" />
        )}
        {isOpen &&
          suggestions.map((item, index) => {
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
    </Box>
  );
};

export default AutoComplete;
