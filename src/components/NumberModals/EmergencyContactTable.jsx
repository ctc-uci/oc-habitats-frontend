import React from 'react';
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
  const editModalDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();

  const editNumber = async newNumber => {
    // await OCHBackend.put('/numbers/update/${number._id}', {
    const { data } = await OCHBackend.put('/numbers/update/62537c9e2b5f28dd6a4735af', {
      name: newNumber.name,
      number: newNumber.number,
      note: newNumber.note,
    });
    setTableData(data);
  };

  const deleteNumber = async () => {
    // await OCHBackend.delete('/numbers/${number._id}', {
    const { data } = await OCHBackend.delete('/numbers/625f1909590d9e75a3f0d52d');
    setTableData(data);
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
            <Tr key={row.id}>
              <Td fontWeight="500">{row.name}</Td>
              <Td>{row.number}</Td>
              <Td>{row.note}</Td>
              <Td>
                <Menu isLazy autoSelect={false}>
                  <MenuButton>
                    <IconButton icon={<BsThreeDotsVertical />} bg="transparent" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={editModalDisclosure.onOpen}>Edit Contact</MenuItem>
                    <MenuItem color="red.600" onClick={deleteModalDisclosure.onOpen}>
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
