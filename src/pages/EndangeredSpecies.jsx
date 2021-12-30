/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Container,
  Heading,
  Textarea,
  VStack,
  Stack,
  Button,
  HStack,
  IconButton,
} from '@chakra-ui/react';

import SectionName from '../components/EndangeredSpecies/SectionName';
import Location from '../components/EndangeredSpecies/Location';
import BandsSex from '../components/EndangeredSpecies/BandsSex';
import BehaviorsList from '../components/EndangeredSpecies/BehaviorsList';
import footNotes from '../components/EndangeredSpecies/FootNotes';
import options from '../components/EndangeredSpecies/DropdownOptions';

const EndangeredSpecies = ({ adultName }) => {
  const [totalAdults, setTotalAdults] = useState(1);
  const [totalFledges, setTotalFledges] = useState(0);

  const handleSubmit = event => {
    event.preventDefault();
    const { length } = event.target;
    const formData = {};
    const gps = [];
    const adultBands = [];
    const fledgeBands = [];
    const nests = [];
    const behaviors = [];
    const time = { value: '', meridiem: '' };
    // using i + 1 causes infinite loop
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      const currentID = event.target[i].getAttribute('id');
      const currentValue = event.target[i].value;
      if (currentID !== null) {
        if (currentID === 'time') {
          time.value = currentValue;
        } else if (currentID === 'meridiem') {
          time.meridiem = currentValue;
        } else if (currentID.includes('latitude')) {
          gps.push({ latitude: currentValue });
        } else if (currentID.includes('longitude')) {
          const axis = currentID.split(' ');
          gps[parseInt(axis[1], 10)][axis[0]] = currentValue;
        } else if (currentID.includes('band')) {
          if (currentID.includes('Adult')) {
            adultBands.push({ band: currentValue });
          } else {
            fledgeBands.push({ band: currentValue });
          }
        } else if (currentID.includes('sex')) {
          const index = parseInt(currentID.split(' ')[1], 10);
          if (currentID.includes('Adult')) {
            adultBands[index].sex = {};
            adultBands[index].sex = currentValue;
          } else {
            fledgeBands[index].sex = {};
            fledgeBands[index].sex = currentValue;
          }
        } else if (currentID.includes('note')) {
          const index = parseInt(currentID.split(' ')[1], 10);
          if (currentID.includes('Adult')) {
            adultBands[index].note = {};
            adultBands[index].note = currentValue;
          } else {
            fledgeBands[index].note = {};
            fledgeBands[index].note = currentValue;
          }
        } else if (currentID.includes('Nesting & Eggs')) {
          if (currentValue !== 'None') {
            nests.push(currentValue);
          }
        } else if (currentID.includes('Behaviors')) {
          if (currentValue !== 'None') {
            behaviors.push(currentValue);
          }
        } else {
          formData[currentID] = {};
          formData[currentID] = currentValue;
        }
      }
    }
    const bands = [...adultBands, ...fledgeBands];
    formData.time = time;
    formData.gps = gps;
    formData.nests = nests;
    formData.behaviors = behaviors;
    formData.bands = bands;

    // eslint-disable-next-line no-console
    console.log('formData', formData);
  };

  return (
    <>
      <HStack w="100%">
        <IconButton
          icon={<ArrowBackIcon boxSize={10} />}
          bgColor="transparent"
          left="1%"
          mt="1em"
        />
      </HStack>
      <Container maxW="container.xl">
        <Stack align="center" mb="3em">
          <Heading as="h1">Add Adult {adultName}</Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing="4em">
            <SectionName setTotalAdults={setTotalAdults} setTotalFledges={setTotalFledges} />
            <Location totalBirds={totalAdults + totalFledges} />
            <BandsSex totalAdults={totalAdults} totalFledges={totalFledges} />
            <BehaviorsList
              title="Nesting & Eggs"
              description={footNotes.nest}
              options={options.nesting}
            />
            <BehaviorsList
              title="Behaviors Observed"
              description={footNotes.behavior}
              options={options.behavior}
            />
            <VStack align="start" w="100%">
              <Heading as="h3" size="md">
                Additional Notes (Optional)
              </Heading>
              <Textarea id="additional" h="10em" placeholder="Type Here..." />
            </VStack>
          </VStack>
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

EndangeredSpecies.defaultProps = {
  adultName: PropTypes.string,
};

EndangeredSpecies.propTypes = {
  adultName: PropTypes.string,
};

export default EndangeredSpecies;
