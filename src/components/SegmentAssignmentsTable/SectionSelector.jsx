import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabList, Tab } from '@chakra-ui/react';

const SegmentSelector = ({ sectionList, selectedSectionIndex, setSelectedSectionIndex }) => {
  return (
    <Tabs
      variant="soft-rounded"
      index={selectedSectionIndex}
      onChange={setSelectedSectionIndex}
      w="100%"
      mb="20px"
    >
      <TabList gap="10px">
        {sectionList?.map((section, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tab key={i} bgColor="ochOrange" color="ochBlack">
            {section}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

SegmentSelector.propTypes = {
  sectionList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSectionIndex: PropTypes.number.isRequired,
  setSelectedSectionIndex: PropTypes.func.isRequired,
};

export default SegmentSelector;
