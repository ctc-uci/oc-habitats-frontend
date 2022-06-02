import React from 'react';
import { Badge, Box, Text, useMediaQuery } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const YourLogsDescriptions = ({ copyright }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  if (copyright && isMobile) {
    return <Box h="100px" />;
  }

  if (copyright) {
    return (
      <Box my="20px">
        <Text as="i">
          Any person gathering and/or submitting data in this document acknowledges that the data is
          solely owned by OC Habitats&trade; and is copyright protected. Data is not to be shared
          with other organizations absent written permission from OC Habitats&trade;. &copy;2022 OC
          Habitats&trade;. All Rights Reserved. If you have questions, please contact OC Habitats at
          949.697.8651 or och@ochabitats.org.
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Text>
        Click on a row to view that monitor log. You may edit and resubmit logs with these approval
        statuses:{' '}
        <Badge variant="solid" colorScheme="red">
          Edits Requested
        </Badge>
        ,{' '}
        <Badge variant="solid" colorScheme="purple">
          Resubmitted
        </Badge>
        ,{' '}
        <Badge variant="solid" colorScheme="blue">
          Under Review
        </Badge>
        ,{' '}
        <Badge variant="solid" colorScheme="gray">
          Draft
        </Badge>
      </Text>

      {!isMobile && (
        <Text>
          Click on a column header (e.g.{' '}
          <Badge px={0} variant="solid" bg="transparent" textColor="black">
            Log Date
          </Badge>
          ) to sort by descending <ArrowDownIcon /> or ascending <ArrowUpIcon />. Sorting is
          alphanumeric for{' '}
          <Badge px={0} variant="solid" bg="transparent" textColor="black">
            segment
          </Badge>
          ,{' '}
          <Badge px={0} variant="solid" bg="transparent" textColor="black">
            segment name
          </Badge>
          , and{' '}
          <Badge px={0} variant="solid" bg="transparent" textColor="black">
            approval status
          </Badge>
          .
        </Text>
      )}
    </>
  );
};

YourLogsDescriptions.propTypes = {
  copyright: PropTypes.bool,
};

YourLogsDescriptions.defaultProps = {
  copyright: false,
};

export default YourLogsDescriptions;
