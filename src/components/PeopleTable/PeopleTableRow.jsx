import React from 'react';
import PropTypes from 'prop-types';
import {
  Tr,
  Td,
  VStack,
  HStack,
  Flex,
  Avatar,
  Badge,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const StyledBadge = ({ bgColor, textColor, text }) => (
  <Badge
    variant="capitalize"
    bgColor={bgColor}
    textColor={textColor}
    fontWeight="normal"
    fontSize="12px"
    alignSelf="stretch"
    borderRadius="6px"
    padding="2px 8px"
  >
    {text}
  </Badge>
);

const NameColumn = ({ data }) => {
  const badgeContent = () => {
    // if (!data.registered) {
    //   return <StyledBadge color="ochBlue" text="Account Pending" />;
    // }
    if (!data.isActive) {
      return <StyledBadge bgColor="gray.300" textColor="black" text="Inactive" />;
    }
    if (data.isTrainee) {
      return <StyledBadge bgColor="orange.500" textColor="white" text="In-Training" />;
    }
    return null;
  };

  return (
    <Flex w="284px" h="72px" gap="12px" alignItems="center">
      <Avatar size="md" name={data.name} src="something" />
      <VStack alignItems="flex-start">
        <Text>{data.name}</Text>
        <Text color="gray.500">{data.email}</Text>
        {badgeContent()}
      </VStack>
    </Flex>
  );
};

const SegmentColumn = ({ data }) => {
  return (
    <HStack w="100%" justifyContent="space-between">
      <VStack align="normal">
        {data?.map((segment, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <HStack key={i} alignItems="baseline">
            <Text>{segment.name}</Text>
            <Text color="gray.500">{segment.description}</Text>
          </HStack>
        ))}
      </VStack>
      <VStack justify="right">
        <RowButton data={data} />
      </VStack>
    </HStack>
  );
};

const editAccountInfo = ({ data }) => {
  // eslint-disable-next-line no-console
  console.log(`Editing account info ${data}`);
};

const editSegmentAssignment = ({ data }) => {
  // eslint-disable-next-line no-console
  console.log(`Editing segment assignment ${data}`);
};

const clearSegmentAssignment = ({ data }) => {
  // eslint-disable-next-line no-console
  console.log(`Clear segment assignment ${data}`);
};

const RowButton = ({ data }) => {
  return (
    <Menu isLazy autoSelect={false}>
      <MenuButton>
        <IconButton icon={<BsThreeDotsVertical />} bg="transparent" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => editAccountInfo(data)}>Edit Account Info</MenuItem>
        <MenuItem onClick={() => editSegmentAssignment(data)}>Edit Segment Assignment(s)</MenuItem>
        <MenuItem color="red.600" onClick={() => clearSegmentAssignment(data)}>
          Clear Segment Assignment(s)
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const PeopleTableRow = ({ row }) => {
  return (
    <Tr {...row.getRowProps()}>
      {row.cells.map(cell => {
        return (
          <Td fontSize="14px" key={row.id} {...cell.getCellProps()}>
            {cell.render('Cell')}
          </Td>
        );
      })}
    </Tr>
  );
};

StyledBadge.propTypes = {
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

NameColumn.propTypes = {
  data: PropTypes.string.isRequired,
};

SegmentColumn.propTypes = {
  data: PropTypes.string.isRequired,
};

RowButton.propTypes = {
  data: PropTypes.string.isRequired,
};

PeopleTableRow.propTypes = {
  row: PropTypes.string.isRequired,
};

export { PeopleTableRow, NameColumn, SegmentColumn };
