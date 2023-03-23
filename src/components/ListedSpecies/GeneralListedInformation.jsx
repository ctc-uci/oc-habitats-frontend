import { InfoIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { React } from 'react';
import { useFormContext } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import options from './DropdownOptions';
import footNotes from './FootNotes';
import NonStaticQuestion from '../MonitorLog/NonStaticQuestion';

// component/section name not final
const GeneralListedInformation = ({ refreshTrigger, additionalQuestions, isTemplate }) => {
  const { register, setValue, getValues } = useFormContext();

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
        <Stack direction={{ md: 'row', base: 'column' }} w="100%" spacing="2em">
          <FormControl>
            <FormLabel>
              # of Adults
              <NumberInput
                min={1}
                defaultValue={getValues('totalAdults')}
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
                defaultValue={getValues('totalFledges')}
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
                defaultValue={getValues('totalChicks')}
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

        <Stack direction={{ md: 'row', base: 'column' }} w="100%" spacing="2em">
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
          {additionalQuestions?.map(question => {
            return (
              <NonStaticQuestion
                formType="listed-species"
                formKey={`additionalQuestions.${question._id}`}
                key={question.title}
                question={question}
                isTemplate={isTemplate}
                refreshTrigger={refreshTrigger}
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
  refreshTrigger: PropTypes.func.isRequired,
  isTemplate: PropTypes.bool,
  additionalQuestions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

export default GeneralListedInformation;
