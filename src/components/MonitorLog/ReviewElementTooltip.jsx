import { React } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import { Text, Box, Input, HStack, Tooltip } from '@chakra-ui/react';

const ReviewElementTooltip = ({ sectionTitle, value, label, toggle }) => {
  return (
    <Box width="108%">
      <HStack justifyContent="space-between">
        <Text>{sectionTitle}</Text>
        {toggle ? (
          <Tooltip label={label} placement="top">
            <InfoIcon />
          </Tooltip>
        ) : (
          <div />
        )}
      </HStack>
      <Input isReadOnly="true" bgColor="#EDF2F7" value={value} />
    </Box>
  );
};
ReviewElementTooltip.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  toggle: PropTypes.bool.isRequired,
};
export default ReviewElementTooltip;
