/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Thead, Tr, Th } from '@chakra-ui/react';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import styles from './VolunteerLogs.module.css';

const ArrowIcon = ({ down }) => {
  const style = { display: 'inline', position: 'relative', left: '4px', top: '2px' };
  if (down) {
    return <FiArrowDown size="1em" style={style} />;
  }
  return <FiArrowUp size="1em" style={style} />;
};

ArrowIcon.propTypes = {
  down: PropTypes.bool.isRequired,
};

// header portion of table where user can sort data
const VolunteerLogsTableHeader = ({ headerGroups }) => {
  return (
    <Thead>
      {headerGroups.map(headerGroup => (
        <Tr className={styles['table-head']} w="parent" {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <Th
              color="white"
              bgColor="ochGrey"
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              {column.render('Header')}
              {column.isSorted ? <ArrowIcon down={column.isSortedDesc} /> : ''}
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
};

VolunteerLogsTableHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  headerGroups: PropTypes.array.isRequired,
};

export default VolunteerLogsTableHeader;
