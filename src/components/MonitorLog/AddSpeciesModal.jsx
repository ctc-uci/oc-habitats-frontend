import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  SimpleGrid,
  GridItem,
  VStack,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  HStack,
  Text,
  Container,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, InfoIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { RiSaveFill } from 'react-icons/ri';
import DropdownSearch from '../DropdownSearch';

const options = [
  { value: 'Plover: Snowy (WSPL)', label: 'Plover: Snowy (WSPL)' },
  { value: 'end2', label: 'end2' },
  { value: 'end3', label: 'end3' },
  { value: 'add1', label: 'add1' },
  { value: 'add2', label: 'add2' },
  { value: 'add3', label: 'add3' },
];

const AddSpeciesModal = ({ addNewRow }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [specieName, setSpecieName] = useState(null);
  const [totalSighted, setTotalSighted] = useState(1);
  const [notes, setNotes] = useState(null);

  const addNewSpecie = () => {
    addNewRow({ name: specieName, total: totalSighted, notes });
    onClose();
  };

  return (
    <div>
      <Button onClick={onOpen} bgColor="#2BC0E3" width="100%" height="48px">
        Add Sighted Species +
      </Button>
      <Modal isOpen={isOpen} isCentered size="md">
        <ModalOverlay />
        <ModalContent bgColor="#FBFBFB">
          <HStack ml="1em" mt="1em">
            <IconButton
              size="xs"
              icon={<CloseIcon w="1.25em" h="1.25em" />}
              onClick={onClose}
              bgColor="transparent"
              _hover={{ bg: 'transparent' }}
              _active={{
                bg: 'transparent',
                transform: 'scale(0.98)',
              }}
              _focus={{
                bg: 'transparent',
              }}
            />
          </HStack>
          <ModalHeader alignSelf="center" fontWeight={650} fontSize="1.25em">
            Add Species Row
          </ModalHeader>

          <HStack mt=".5em" bgColor="#F49923" p=".4em">
            <Container>
              <Flex alignItems="center" w="87%">
                <InfoIcon mr="1em" />
                <Text fontSize=".85em" fontWeight={450} color="black">
                  Search and add a species from the drop down.
                </Text>
              </Flex>
            </Container>
          </HStack>

          <ModalBody>
            <VStack mt="1em" spacing="1.75em">
              <Text fontSize=".825em" fontWeight={450} color="black">
                {`If the specimen is not listed, choose "Other" and note the possible species in the
              Notes.`}
              </Text>
              <VStack align="left" w="100%" spacing="1.25em">
                <SimpleGrid columns={6} h="relative" columnGap="9px" rowGap="1.5em">
                  <GridItem colSpan={6}>
                    <FormLabel fontSize="14px" fontWeight="600">
                      Search for a Species:
                    </FormLabel>
                    <VStack w="full" h="100%" position="relative" alignItems>
                      <DropdownSearch
                        options={options}
                        value={null}
                        handleSelectedValue={setSpecieName}
                      />
                    </VStack>
                  </GridItem>

                  <GridItem colSpan={5}>
                    <FormLabel fontSize="14px" fontWeight="600">
                      Total Sighted:
                    </FormLabel>
                    <NumberInput
                      defaultValue={1}
                      min={1}
                      max={20}
                      onChange={e => {
                        setTotalSighted(e);
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </GridItem>
                  <GridItem colSpan={6}>
                    <FormLabel fontSize="14px" fontWeight="600">
                      Notes (Optional)
                    </FormLabel>
                    <Textarea
                      placeholder="Type Here..."
                      minHeight="10em"
                      onChange={e => {
                        setNotes(e.target.value);
                      }}
                    />
                  </GridItem>
                </SimpleGrid>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter mb="1em">
            <VStack w="100%">
              <Button
                rightIcon={<RiSaveFill />}
                bgColor="#2BC0E3"
                fontWeight="600"
                w="100%"
                onClick={addNewSpecie}
              >
                Save
              </Button>
              <Button width="100%" onClick={onClose}>
                Cancel
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

AddSpeciesModal.defaultProps = {
  addNewRow: PropTypes.func,
};

AddSpeciesModal.propTypes = {
  addNewRow: PropTypes.func,
};

export default AddSpeciesModal;
