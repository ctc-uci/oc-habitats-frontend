import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { React, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import options from './DropdownOptions';
import footNotes from './FootNotes';
import NonStaticQuestion from '../MonitorLog/NonStaticQuestion';
import { OCHBackend } from '../../common/utils';

// component/section name not final
const GeneralListedInformation = ({ isTemplate, additionalQuestions }) => {
  const { register, setValue, getValues } = useFormContext();
  const editQuestionModal = useDisclosure();

  // states for editQuestion modal
  const [newTitle, setNewTitle] = useState();
  const [newFieldType, setNewFieldType] = useState();
  const [newTooltip, setNewTooltip] = useState();
  // const [fieldToEdit, setFieldToEdit] = useState();

  const createOptions = () => {
    return options.habitat.map(option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
  };

  return (
    <>
      <CollapsibleSection title="General Information">
        <Stack direction={['column', 'row']} w="100%" spacing="2em">
          <FormControl>
            <FormLabel>
              # of Adults
              <NumberInput
                min={1}
                defaultValue={getValues().totalAdults}
                onChange={val => setValue('totalAdults', parseInt(val, 10), { shouldDirty: true })}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex justify="space-between" align="center">
                # of Fledges
                <Tooltip label={footNotes.fledge} fontSize="md">
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <NumberInput
                min={0}
                onChange={val => setValue('totalFledges', parseInt(val, 10), { shouldDirty: true })}
                defaultValue={getValues().totalFledges}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>
              # of Chicks
              <NumberInput
                min={0}
                onChange={val => setValue('totalChicks', parseInt(val, 10), { shouldDirty: true })}
                defaultValue={getValues().totalChicks}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
        </Stack>

        <br />

        <Stack direction={['column', 'row']} w="100%" spacing="2em">
          <FormControl>
            <FormLabel>
              Time
              <InputGroup>
                <Input type="time" {...register('time')} />
              </InputGroup>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>
              Map #
              <Input disabled placeholder="None" {...register('map')} />
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex justify="space-between" align="center">
                Habitat Description
                <Tooltip label={footNotes.habitat} fontSize="md">
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <Select placeholder="None" {...register('habitat')}>
                {createOptions()}
              </Select>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
        </Stack>
        <SimpleGrid mt="30px" columns={3} spacing="2em">
          {additionalQuestions.map(question => {
            return (
              <NonStaticQuestion
                key={question.title}
                formType="listed-species"
                question={question}
                isTemplate={isTemplate}
              />
            );
          })}
        </SimpleGrid>
      </CollapsibleSection>
    </>
  );
};

GeneralListedInformation.defaultProps = {
  isTemplate: false,
  additionalQuestions: null,
};
GeneralListedInformation.propTypes = {
  isTemplate: PropTypes.bool,
  additionalQuestions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

export default GeneralListedInformation;
