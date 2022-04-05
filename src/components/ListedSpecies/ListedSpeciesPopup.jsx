import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { React, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowUp } from 'react-icons/fi';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import BandingSection from './BandingSection';
import BehaviorsSection from './BehaviorsSection';
import options from './DropdownOptions';
import GeneralListedInformation from './GeneralListedInformation';
import Location from './Location';
import SexSection from './SexSection';

const ListedSpeciesPopup = ({ closeModal, adultName, addRow, prefilledData }) => {
  const formMethods = useForm({
    defaultValues: prefilledData || {
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
      gps: [
        { longitude: '', latitude: '' },
        { longitude: '', latitude: '' },
        { longitude: '', latitude: '' },
        { longitude: '', latitude: '' },
      ],
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
                  Keep editing
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
            <CollapsibleSection title="Additional Notes (Optional)">
              <Textarea
                h="10em"
                placeholder="Type Here..."
                {...formMethods.register('additionalNotes')}
              />
            </CollapsibleSection>
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
          <Button colorScheme="cyan" type="submit" onClick={handleSubmit}>
            {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

ListedSpeciesPopup.propTypes = {
  adultName: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  prefilledData: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  ).isRequired,
};

export default ListedSpeciesPopup;
