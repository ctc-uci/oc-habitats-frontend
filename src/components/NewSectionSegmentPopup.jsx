import { useState, React } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  RadioGroup,
  Radio,
  Stack,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import Select from 'react-select';
import { AddIcon } from '@chakra-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { OCHBackend } from '../common/utils';

const addSectionSchema = yup.object({
  sectionId: yup.string().required('Section Id is required'),
  sectionName: yup.string().required('Section Name is required'),
  sectionMapLink: yup.string().required('Section Map Link is required'),
});

const addSegmentSchema = yup.object({
  newSection: yup.object({
    label: yup.string().required('Section is required'),
    value: yup.string().required('Section is required'),
  }),
  newSegId: yup.string().required('Segment Id is required'),
  newSegName: yup.string().required('Segment Name is required'),
  newSegLink: yup.string().required('Segment Map Link is required'),
  newSegLocation: yup.string().required('Segment streets is required'),
  newSegParking: yup.string().required('Segment Parking is required'),
});

const ModalContentStepOne = ({ step, setStep, onClose }) => {
  const [current, setCurrent] = useState(step);
  const handleClick = () => {
    setStep(current);
  };

  return (
    <>
      <ModalHeader>Create New:</ModalHeader>
      <ModalBody>
        <RadioGroup onChange={val => setCurrent(val)} value={current} mb={4}>
          <Stack direction="column">
            <Radio value="1">Section</Radio>
            <Radio value="2">Segment</Radio>
          </Stack>
        </RadioGroup>
        <ModalFooter pr={0}>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            bg="ochBlue"
            color="ochBlack"
            variant="solid"
            onClick={handleClick}
          >
            Next
          </Button>
        </ModalFooter>
      </ModalBody>
    </>
  );
};

const ModalContentAddSection = ({ addNewSection, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSectionSchema),
    delayError: 750,
  });

  return (
    <>
      <ModalHeader>Add Section</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(addNewSection)}>
          <Stack column="vertical">
            <FormControl isInvalid={errors?.sectionId}>
              <FormLabel htmlFor="sectionId">Section Id</FormLabel>
              <Input id="sectionId" {...register('sectionId')} />
              <FormErrorMessage>{errors.sectionId?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.sectionName}>
              <FormLabel htmlFor="sectionName">Section Name</FormLabel>
              <Input id="sectionName" {...register('sectionName')} />
              <FormErrorMessage>{errors.sectionName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.sectionMapLink}>
              <FormLabel htmlFor="sectionMapLink">Section Map Link</FormLabel>
              <Textarea id="sectionMapLink" {...register('sectionMapLink')} />
              <FormErrorMessage>{errors.sectionMapLink?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <ModalFooter pr={0}>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" bg="ochBlue" color="ochBlack" variant="solid" type="submit">
              Create Section
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </>
  );
};

const ModalContentAddSegment = ({ sectionOptions, addNewSegment, onClose }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSegmentSchema),
    delayError: 750,
  });

  return (
    <>
      <ModalHeader>Add Segment</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(addNewSegment)}>
          <Stack column="vertical">
            <FormControl isInvalid={errors?.newSection}>
              <FormLabel htmlFor="newSection">Section</FormLabel>
              <Controller
                control={control}
                name="newSection"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Select options={sectionOptions} value={value} onChange={onChange} />
                )}
              />
              <FormErrorMessage>{errors.newSection?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.newSegId}>
              <FormLabel htmlFor="newSegId">Segment ID</FormLabel>
              <Input id="newSegId" {...register('newSegId')} />
              <FormErrorMessage>{errors.newSegId?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.newSegName}>
              <FormLabel htmlFor="newSegName">Segment Name</FormLabel>
              <Input id="newSegName" {...register('newSegName')} />
              <FormErrorMessage>{errors.newSegName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.newSegLink}>
              <FormLabel htmlFor="newSegLink">Section Map Link</FormLabel>
              <Textarea id="newSegLink" {...register('newSegLink')} />
              <FormErrorMessage>{errors.newSegLink?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.newSegLocation}>
              <FormLabel htmlFor="newSegLocation">Street Names</FormLabel>
              <Input id="newSegLocation" {...register('newSegLocation')} />
              <FormErrorMessage>{errors.newSegLocation?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.newSegParking}>
              <FormLabel htmlFor="newSegParking">Parking Information</FormLabel>
              <Textarea id="newSegParking" {...register('newSegParking')} />
              <FormErrorMessage>{errors.newSegParking?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <ModalFooter pr={0}>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" bg="ochBlue" color="ochBlack" variant="solid" type="submit">
              Create Segment
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </>
  );
};

const NewSectionSegmentPopup = ({ sectionOptions, getSections }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(0);
  const toast = useToast();

  const handButtonClick = () => {
    setStep(0);
    onOpen();
  };

  const addNewSection = async newSection => {
    try {
      await OCHBackend.post('/section/', {
        _id: newSection.sectionId,
        name: newSection.sectionName,
        map: newSection.sectionMapLink,
      });
      toast({
        title: 'Successfully created a new section.',
        status: 'success',
        isClosable: true,
      });
      getSections();
      onClose();
    } catch (err) {
      toast({
        title: 'Unable to create new section',
        description: err?.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const addNewSegment = async newSegment => {
    try {
      await OCHBackend.post('/segment/', {
        section: newSegment.newSection.value,
        segmentId: newSegment.newSegId,
        name: newSegment.newSegName,
        streets: newSegment.newSegLocation,
        mapLink: newSegment.newSegLink,
        parking: newSegment.newSegParking,
      });
      toast({
        title: 'Successfully created a new segment.',
        status: 'success',
        isClosable: true,
      });
      getSections();
      onClose();
    } catch (err) {
      toast({
        title: 'Unable to create new segment',
        description: err?.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const modalSteps = {
    0: <ModalContentStepOne step={step} setStep={setStep} onClose={onClose} />,
    1: <ModalContentAddSection addNewSection={addNewSection} onClose={onClose} />,
    2: (
      <ModalContentAddSegment
        sectionOptions={sectionOptions}
        addNewSegment={addNewSegment}
        onClose={onClose}
      />
    ),
  };

  return (
    <>
      <Button
        w={{ md: 'fit-content', base: '100%' }}
        fontSize={{ md: '16px', base: '14px' }}
        onClick={handButtonClick}
        bg="ochBlue"
        variant="solid"
        rightIcon={<AddIcon />}
      >
        Create New Section or Segment
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>{modalSteps[step]}</ModalContent>
      </Modal>
    </>
  );
};

NewSectionSegmentPopup.propTypes = {
  sectionOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  getSections: PropTypes.func.isRequired,
};

ModalContentStepOne.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalContentAddSection.propTypes = {
  addNewSection: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalContentAddSegment.propTypes = {
  sectionOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addNewSegment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewSectionSegmentPopup;
