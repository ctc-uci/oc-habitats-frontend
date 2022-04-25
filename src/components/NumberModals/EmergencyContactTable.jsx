/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
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
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { OCHBackend } from '../../common/utils';
import CommonTable from '../../common/CommonTable/CommonTable';
import { CommonTableHeader } from '../../common/CommonTable/CommonTableHeader';
import DeleteNumberModal from './DeleteNumberModal';
import EditNumberModal from './EditNumberModal';

const EmergencyContactTable = ({ tableData, setTableData }) => {
  const [numberId, setNumberId] = useState(-1);
  const editModalDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();

  const openModalWithData = (numId, openFunc) => {
    setNumberId(numId);
    openFunc();
  };

  const editNumber = async newNumber => {
    await OCHBackend.put(`/numbers/update/${numberId}`, {
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
      <EditNumberModal editNumber={editNumber} disclosure={editModalDisclosure} />
      <DeleteNumberModal deleteNumber={deleteNumber} disclosure={deleteModalDisclosure} />

      <CommonTable>
        <CommonTableHeader>
          <Th fontWeight="500">Contact Name</Th>
          <Th>Number</Th>
          <Th> </Th>
          <Th> </Th>
        </CommonTableHeader>
        <Tbody>
          {tableData.map(row => (
            <Tr key={row._id}>
              <Td fontWeight="500">{row.name}</Td>
              <Td>{row.number}</Td>
              <Td>{row.note}</Td>
              <Td>
                <Menu isLazy autoSelect={false}>
                  <MenuButton>
                    <IconButton icon={<BsThreeDotsVertical />} bg="transparent" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => openModalWithData(row._id, editModalDisclosure.onOpen)}
                    >
                      Edit Contact
                    </MenuItem>
                    <MenuItem
                      color="red.600"
                      onClick={() => openModalWithData(row._id, deleteModalDisclosure.onOpen)}
                    >
                      Delete Contact
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </CommonTable>
    </>
  );
};

EmergencyContactTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTableData: PropTypes.func.isRequired,
};

export default EmergencyContactTable;
