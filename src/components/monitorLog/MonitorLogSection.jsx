import { React } from 'react';
import PropTypes from 'prop-types';
import { GridItem, Box, SimpleGrid } from '@chakra-ui/react';

import ReviewElement from '../ReviewElement';

const MonitorLogSection = ({ reviewElements }) => {
  return (
    <Box>
      <SimpleGrid columns={4} rows={3} spacingX="64px" spacingY="10px">
        {reviewElements.map((p, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Item {...p} key={i} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const Item = ({ sectionTitle, value, splitField }) => {
  return (
    <GridItem colSpan={1} rowSpan={1}>
      <ReviewElement sectionTitle={sectionTitle} value={value} splitField={splitField} />
    </GridItem>
  );
};

MonitorLogSection.propTypes = {
  reviewElements: PropTypes.arrayOf(
    PropTypes.shape({
      sectionTitle: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

Item.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  splitField: PropTypes.bool.isRequired,
};

export default MonitorLogSection;
