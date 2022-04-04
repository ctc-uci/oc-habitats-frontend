import { React, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Container,
  Heading,
  Textarea,
  VStack,
  Stack,
  Button,
  HStack,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  Spacer,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';

import { useForm, FormProvider } from 'react-hook-form';
import { FiArrowUp } from 'react-icons/fi';
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

  const confirmCloseModal = useDisclosure();
  const topRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    const formData = formMethods.getValues();

    console.log('formData', formData);
    addRow(formData);
    closeModal();
  };

  const returnToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <FormProvider {...formMethods}>
      <HStack w="100%" ref={topRef}>
        <Flex mt="16px" w="100%">
          <IconButton
            icon={<ArrowBackIcon boxSize={10} />}
            bgColor="transparent"
            onClick={confirmCloseModal.onOpen}
            left="16px"
          />
          <Modal isOpen={confirmCloseModal.isOpen} onClose={confirmCloseModal.onClose}>
            <ModalOverlay />
            <ModalContent rounded="none">
              <ModalHeader>Careful - there&apos;s unsaved changes</ModalHeader>
              <ModalBody>
                If you leave this page, the data here will NOT be saved. Are you sure you’d like to
                leave this page?
              </ModalBody>

              <ModalFooter>
                <Button mr="3" onClick={confirmCloseModal.onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={closeModal}>
                  Discard changes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Spacer />
          <Breadcrumb
            position="relative"
            right="16px"
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink onClick={confirmCloseModal.onOpen}>Survey Log</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Add {adultName}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </HStack>
      <Container maxW="container.xl" paddingTop="40px" paddingBottom="100px">
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
        </form>
      </Container>
      <Flex
        alignItems="center"
        justifyContent="center"
        bg="ochGrey"
        position="fixed"
        w="100%"
        bottom="0"
        h="16"
        zIndex="banner"
      >
        <Flex width="100%" maxWidth="container.xl" padding="4">
          <Button
            onClick={returnToTop}
            variant="outline"
            color="white"
            _hover={{ color: 'black', backgroundColor: 'white' }}
          >
            Return to Top <FiArrowUp style={{ marginLeft: '4px' }} />
          </Button>
          <Spacer />
          <Button colorScheme="cyan" type="submit">
            Add to Tracker
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

EndangeredSpeciesPopup.propTypes = {
  adultName: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
};

export default EndangeredSpeciesPopup;
