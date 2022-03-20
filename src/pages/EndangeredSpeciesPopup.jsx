import { React, useState } from 'react';
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

import GeneralListedInformation from '../components/EndangeredSpecies/GeneralListedInformation';
import Location from '../components/EndangeredSpecies/Location';
import options from '../components/EndangeredSpecies/DropdownOptions';
import BandingSection from '../components/EndangeredSpecies/BandingSection';
import BehaviorsSection from '../components/EndangeredSpecies/BehaviorsSection';
import SexSection from '../components/EndangeredSpecies/SexSection';

const EndangeredSpeciesPopup = ({ closeModal, adultName, addRow }) => {
  const [totalAdults, setTotalAdults] = useState(1);
  const [totalFledges, setTotalFledges] = useState(0);
  const [totalChicks, setTotalChicks] = useState(0);

  const [sexValues, setSexValues] = useState([0, 0, 0, 0, 0, 0]);
  const [behaviors, setBehaviors] = useState([]);
  const [nesting, setNesting] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    const { length } = event.target;
    const formData = {};
    const gps = [];
    const adultBands = [];
    const fledgeBands = [];
    const time = { value: '', meridiem: '' };

    for (let i = 0; i < length; i += 1) {
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
        } else {
          formData[currentID] = {};
          formData[currentID] = currentValue;
        }
      }
    }
    const bands = [...adultBands, ...fledgeBands];
    formData.totalAdults = totalAdults;
    formData.totalFledges = totalFledges;
    formData.totalChicks = totalChicks;
    formData.time = time;
    formData.gps = gps;
    formData.nesting = nesting;
    formData.behaviors = behaviors;
    formData.bands = bands;

    // eslint-disable-next-line no-console
    console.log('formData', formData);
    addRow(formData);
    closeModal();
  };

  return (
    <>
      <HStack w="100%">
        <IconButton
          icon={<ArrowBackIcon boxSize={10} />}
          bgColor="transparent"
          position="fixed"
          top="16px"
          left="16px"
          onClick={closeModal}
        />
      </HStack>
      <Container maxW="container.xl" paddingTop="40px" paddingBottom="40px">
        <Stack align="center" mb="3em">
          <Heading as="h1">Add {adultName}</Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing="4em">
            <GeneralListedInformation
              speciesName={adultName}
              setTotalAdults={setTotalAdults}
              setTotalFledges={setTotalFledges}
              setTotalChicks={setTotalChicks}
            />
            <Location totalBirds={totalAdults + totalFledges} />
            <SexSection values={sexValues} setValues={setSexValues} />
            <BehaviorsSection
              behaviorOptions={options.behavior}
              nestingOptions={options.nesting}
              behaviors={behaviors}
              setBehaviors={setBehaviors}
              nesting={nesting}
              setNesting={setNesting}
            />
            <BandingSection />
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

EndangeredSpeciesPopup.propTypes = {
  adultName: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
};

export default EndangeredSpeciesPopup;
