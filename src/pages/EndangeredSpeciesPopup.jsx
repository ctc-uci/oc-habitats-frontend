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

import { useForm, FormProvider } from 'react-hook-form';
import GeneralListedInformation from '../components/EndangeredSpecies/GeneralListedInformation';
import Location from '../components/EndangeredSpecies/Location';
import options from '../components/EndangeredSpecies/DropdownOptions';
import BandingSection from '../components/EndangeredSpecies/BandingSection';
import BehaviorsSection from '../components/EndangeredSpecies/BehaviorsSection';
import SexSection from '../components/EndangeredSpecies/SexSection';

const EndangeredSpeciesPopup = ({ closeModal, adultName, addRow }) => {
  const formMethods = useForm({
    defaultValues: {
      totalAdults: 1,
      totalFledges: 0,
      totalChicks: 0,
      time: '07:00',
      meridiem: 'AM',
      map: '1',
      habitat: '',
      sex: [0, 0, 0, 0, 0, 0],
      nesting: [],
      behaviors: [],
    },
  });

  const time2 = formMethods.watch('time');

  const handleSubmit = event => {
    event.preventDefault();
    const formData = formMethods.getValues();

    // eslint-disable-next-line no-console
    console.log('formData', formData);
    addRow(formData);
    closeModal();
  };

  return (
    <FormProvider {...formMethods}>
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
            <GeneralListedInformation speciesName={adultName} />
            <Location />
            <SexSection />
            <BehaviorsSection behaviorOptions={options.behavior} nestingOptions={options.nesting} />
            <BandingSection />
            <VStack align="start" w="100%">
              <Heading as="h3" size="md">
                Additional Notes (Optional)
              </Heading>
              <Textarea
                h="10em"
                placeholder="Type Here..."
                {...formMethods.register('additionalNotes')}
              />
            </VStack>
          </VStack>
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </FormProvider>
  );
};

EndangeredSpeciesPopup.propTypes = {
  adultName: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
};

export default EndangeredSpeciesPopup;
