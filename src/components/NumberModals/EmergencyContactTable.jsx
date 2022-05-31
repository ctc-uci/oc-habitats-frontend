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
  useMediaQuery,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { OCHBackend } from '../../common/utils';
import CommonTable from '../../common/CommonTable/CommonTable';
import { CommonTableHeader } from '../../common/CommonTable/CommonTableHeader';
import DeleteNumberModal from './DeleteNumberModal';
import EditNumberModal from './EditNumberModal';

const EmergencyContactTable = ({ tableData, setTableData, admin }) => {
  const [numberId, setNumberId] = useState(-1);
  const [rowData, setRowData] = useState({});
  const editModalDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const openModalWithData = (dataRow, openFunc) => {
    setNumberId(dataRow._id);
    setRowData(dataRow);
    openFunc();
  };

  const editNumber = async newNumber => {
    await OCHBackend.put(`/numbers/${numberId}`, {
      name: newNumber.name,
      number: newNumber.number,
      note: newNumber.note,
    });
    const res = await OCHBackend.get('/numbers');
    setTableData(res.data);
  };

  const deleteNumber = async () => {
    await OCHBackend.delete(`/numbers/${numberId}`);
    const res = await OCHBackend.get('/numbers');
    setTableData(res.data);
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
          <Th fontWeight="500">Contact Name</Th>
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
                  <Text>{row.note}</Text>
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
        </Tbody>
      </CommonTable>
    </>
  );
};

EmergencyContactTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTableData: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
};

export default EmergencyContactTable;
