import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabList, Tab } from '@chakra-ui/react';

const SegmentSelector = ({ segmentList, selectedSegmentIndex, setSelectedSegmentIndex }) => {
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="orange"
      index={selectedSegmentIndex}
      onChange={setSelectedSegmentIndex}
    >
      <TabList>
        {segmentList?.map(segment => (
          <Tab key={segment}>{segment}</Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

SegmentSelector.propTypes = {
  segmentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSegmentIndex: PropTypes.number.isRequired,
  setSelectedSegmentIndex: PropTypes.func.isRequired,
};

export default SegmentSelector;
