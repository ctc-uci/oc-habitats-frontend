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
import { useNavigate } from 'react-router-dom';
import { useRowModalContext } from './RowModalContext';

import AUTH_ROLES from '../../common/auth_config';

const { ADMIN_ROLE } = AUTH_ROLES.AUTH_ROLES;

const menuContent = data => {
  const navigate = useNavigate();
  const {
    openSegmentAssignmentModal,
    openDeletePendingModal,
    openConvertAccountModal,
    openClearSegmentsModal,
  } = useRowModalContext();
  if (!data.registered) {
    return (
      <MenuItem color="red.600" onClick={() => openDeletePendingModal(data)}>
        Delete Pending Account
      </MenuItem>
    );
  }
  if (!data.isActive) {
    return (
      <MenuItem onClick={() => navigate(`/people/user-info/${data.userId}`)}>
        Edit Account Info
      </MenuItem>
    );
  }
  return (
    <>
      <MenuItem onClick={() => navigate(`/people/user-info/${data.userId}`)}>
        Edit Account Info
      </MenuItem>
      <MenuItem onClick={() => openSegmentAssignmentModal(data)}>
        Edit Segment Assignment(s)
      </MenuItem>
      <MenuItem onClick={() => openConvertAccountModal(data)}>
        Convert Account to {data.role === ADMIN_ROLE ? 'Volunteer' : 'Admin'}
      </MenuItem>
      <MenuItem color="red.600" onClick={() => openClearSegmentsModal(data)}>
        Clear Segment Assignment(s)
      </MenuItem>
    </>
  );
};

const badgeContent = data => {
  if (!data.registered) {
    return <StyledBadge bgColor="ochBlueHover" textColor="white" text="Account Pending" />;
  }
  if (!data.isActive) {
    return <StyledBadge bgColor="gray.300" textColor="black" text="Inactive" />;
  }
  if (data.isTrainee) {
    return <StyledBadge bgColor="orange.500" textColor="white" text="In-Training" />;
  }
  return null;
};

const NameColumn = ({ data, isMobile }) => {
  return (
    <HStack justifyContent="space-between">
      <Flex h="72px" gap="12px" alignItems="center">
        <Avatar size="md" name={data.registered ? data.name : data.email} userSelect="none" />
        <VStack alignItems="flex-start">
          <Text>{data.registered ? data.name : null}</Text>
          <Text color="gray.500">{data.email}</Text>
          {badgeContent(data)}
        </VStack>
      </Flex>
      {isMobile && (
        <VStack justify="right">
          <RowButton data={data} />
        </VStack>
      )}
    </HStack>
  );
};

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

const SegmentAndButtonColumn = ({ data }) => {
  return (
    <HStack justifyContent="space-between">
      <VStack align="normal">
        {data?.segments?.map((segment, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <HStack key={i} alignItems="baseline">
            <Text>{segment.segmentId}</Text>
            <Text color="gray.500">{segment.streets}</Text>
          </HStack>
        ))}
      </VStack>
      <VStack justify="right">
        <RowButton data={data} />
      </VStack>
    </HStack>
  );
};

const RowButton = ({ data }) => {
  return (
    <Menu isLazy autoSelect={false}>
      <MenuButton>
        <IconButton icon={<BsThreeDotsVertical />} bg="transparent" />
      </MenuButton>
      <MenuList placement="bottom-start">{menuContent(data)}</MenuList>
    </Menu>
  );
};

const PeopleTableRow = ({ row, isMobile }) => {
  return (
    <Tr {...row.getRowProps()}>
      {row.cells.map(cell => {
        return (
          <Td fontSize="14px" key={row.id} {...cell.getCellProps()}>
            {cell.render('Cell', { isMobile })}
          </Td>
        );
      })}
    </Tr>
  );
};

/* eslint-disable react/forbid-prop-types */
StyledBadge.defaultProps = {
  bgColor: 'white',
  textColor: 'black',
};

StyledBadge.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string.isRequired,
};

NameColumn.propTypes = {
  data: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

SegmentAndButtonColumn.propTypes = {
  data: PropTypes.object.isRequired,
};

RowButton.propTypes = {
  data: PropTypes.object.isRequired,
};

PeopleTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

/* eslint-enable react/forbid-prop-types */

export { PeopleTableRow, NameColumn, SegmentAndButtonColumn };
