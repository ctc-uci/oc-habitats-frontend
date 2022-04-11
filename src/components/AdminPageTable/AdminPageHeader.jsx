/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Thead, Tr, Th, Checkbox, Button } from '@chakra-ui/react';

// header portion of table where user can sort data
const AdminPageHeader = ({ headerGroups }) => {
  return (
    <Thead>
      {headerGroups.map(headerGroup => (
        <Tr id="table-head" w="parent" {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <Th color="white" bgColor="ochGrey">
              {column.render('Header')}
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
};

/*

 return headerGroups.map(headerGroup => (
    <Tr className={styles['table-head']} {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <Th
          {...column.getHeaderProps(column.getSortByToggleProps())}
          color="white"
          bgColor="ochGrey"
        >
          <Flex alignItems="center" textTransform="none">
            {loading ? <>&nbsp;</> : column.render('Header')}
          </Flex>
        </Th>
      ))}
    </Tr>
  ));

*/

AdminPageHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  headerGroups: PropTypes.array.isRequired,
};

export default AdminPageHeader;
