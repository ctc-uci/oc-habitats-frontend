import { React } from 'react';
import PropTypes from 'prop-types';
import { VStack, Heading, Tabs, TabList, Tab, HStack } from '@chakra-ui/react';

const BandsSexBehaviors = ({ totalAdults, totalFledges }) => {
  const title = 'Bands & Sex & Behavior';

  // create tabs with the corresponding number of adults/fledges
  const addTabs = (amount, type) => {
    return [
      [...Array(amount)].map((e, i) => {
        return (
          <Tab
            key={e}
            borderWidth={2}
            borderColor="gray.200"
            _selected={{ color: 'black', bg: '#F49923', borderColor: '#F49923' }}
          >
            {type} {i + 1}
          </Tab>
        );
      }),
    ];
  };

  return (
    <VStack spacing="1.5em" justify="start" align="start">
      <Heading as="h3" size="md">
        {title}
      </Heading>
      <Tabs variant="solid-rounded" size="md" colorScheme="orange">
        <TabList>
          <HStack spacing={5}>
            {addTabs(totalAdults, 'Adult')}
            {addTabs(totalFledges, 'Fledge')}
          </HStack>
        </TabList>
      </Tabs>
    </VStack>
  );
};

BandsSexBehaviors.propTypes = {
  totalAdults: PropTypes.number.isRequired,
  totalFledges: PropTypes.number.isRequired,
};

export default BandsSexBehaviors;
