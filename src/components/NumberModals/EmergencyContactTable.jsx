/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Text,
  Tbody,
  Th,
  Tr,
  Td,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  MenuButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { OCHBackend } from '../../common/utils';
import CommonTable from '../../common/CommonTable/CommonTable';
import { CommonTableHeader } from '../../common/CommonTable/CommonTableHeader';
import DeleteNumberModal from './DeleteNumberModal';
import EditNumberModal from './EditNumberModal';

const EmergencyContactTable = ({ tableData, admin, change, setChange }) => {
  const [numberId, setNumberId] = useState(-1);
  const [rowData, setRowData] = useState({});
  const editModalDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();
  const toast = useToast();

  const openModalWithData = (dataRow, openFunc) => {
    setNumberId(dataRow._id);
    setRowData(dataRow);
    openFunc();
  };

  const editNumber = async updatedNumber => {
    try {
      await OCHBackend.put(
        `/numbers/${numberId}`,
        {
          name: updatedNumber.name,
          number: updatedNumber.number,
          note: updatedNumber.note,
        },
        { withCredentials: true },
      );
      setChange(!change);
      toast({
        title: `${updatedNumber.name}'s contact has been updated`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `${updatedNumber.name}'s contact could not be updated`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const deleteNumber = async () => {
    try {
      await OCHBackend.delete(`/numbers/${numberId}`, { withCredentials: true });
      setChange(!change);
      toast({
        title: `Successfully deleted a contact`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `Unable to delete contact`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <EditNumberModal
        numberData={rowData}
        editNumber={editNumber}
        disclosure={editModalDisclosure}
      />
      <DeleteNumberModal deleteNumber={deleteNumber} disclosure={deleteModalDisclosure} />

      <CommonTable>
        <CommonTableHeader>
          <Th>Contact Name</Th>
          <Th>Number</Th>
          <Th />
        </CommonTableHeader>
        <Tbody>
          {tableData.map(row => (
            <Tr key={row._id}>
              <Td fontWeight="500" w={{ md: '25%', base: '40%' }}>
                {row.name}
              </Td>
              <Td colSpan={admin ? 1 : 2}>
                <Flex direction={{ md: 'row', base: 'column' }} gap="16px">
                  <Text>{row.number}</Text>
                  <Text as="i">{row.note}</Text>
                </Flex>
              </Td>
              {admin && (
                <Td p={2}>
                  <Menu isLazy autoSelect={false}>
                    <MenuButton>
                      <IconButton icon={<BsThreeDotsVertical />} bg="transparent" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => openModalWithData(row, editModalDisclosure.onOpen)}>
                        Edit Contact
                      </MenuItem>
                      <MenuItem
                        color="red.600"
                        onClick={() => openModalWithData(row, deleteModalDisclosure.onOpen)}
                      >
                        Delete Contact
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              )}
            </Tr>
          ))}
          <Tr>
            <Td fontWeight="500">Report a Non-Emergency</Td>
            <Td>
              Call the non-emergency number for the local police of the segment you are in (e.g.
              Seal Beach, Huntington Beach, Newport Beach, San Clemente, etc)
            </Td>
            <Td />
          </Tr>
        </Tbody>
      </CommonTable>
    </>
  );
};

EmergencyContactTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  admin: PropTypes.bool.isRequired,
  change: PropTypes.bool.isRequired,
  setChange: PropTypes.func.isRequired,
};

export default EmergencyContactTable;
