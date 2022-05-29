import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Flex,
  GridItem,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { OCHBackend } from '../../common/utils';
import NewHumanActivityModal from '../NewHumanActivityModal';
import NonStaticHumanActivity from '../NonStaticHumanActivity';

const FORM_PREFIX = 'humanActivity.';
const HUMAN_ACTIVITIES = [
  [
    'Beach Activity',
    'Human Sitting/Walking/Running, Sports, Bikes (Non-Motorized), Fires, Fishing',
    'beachActivity',
  ],
  ['Water Activity', 'Surfers, Windsurfers, Kite Sailing, Kayakers, SUPs, Other', 'waterActivity'],
  ['Airborne Activity', 'Drone in Use, Fan Paragliding, Kite Flying', 'airborneActivity'],
  ['[Speeding] Motor Vehicles', 'ATV & Equipment, Bikes, Boards, Other', 'speedingVehicles'],
  [
    '[Non-Speeding] Motor Vehicles',
    'Cars, ATV & Equipment, Bikes, Boards, Other',
    'nonSpeedingVehicles',
  ],
  ['[Off Leash] Domestic Animals', 'Dogs, Cats, Other', 'offLeashAnimals'],
  ['[On Leash] Domestic Animals', 'Dogs, Cats, Other', 'onLeashAnimals'],
];

const HumanActivityField = ({ activityName, activityDesc, activityId, isDisabled, isTemplate }) => {
  const { setValue, getValues } = useFormContext();

  return (
    <GridItem colSpan={1}>
      <VStack spacing={{ md: '8px', base: '5px' }} align="left">
        <Text fontWeight="500" fontSize="md">
          {activityName}
        </Text>
        <Text minHeight="45px" fontSize="sm">
          {activityDesc}
          {activityId === 'speedingVehicles' && (
            <>
              <br />
              <chakra.span color="#156071" style={{ marginTop: 0 }}>
                {/* ^ color should be ochBluePress */}
                Report to ENTITY at XXX-XXX-XXXX
              </chakra.span>
            </>
          )}
        </Text>
        <NumberInput
          isDisabled={isDisabled}
          min={0}
          onChange={(_, val) => setValue(FORM_PREFIX + activityId, val)}
          defaultValue={getValues(FORM_PREFIX + activityId) || 0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {isTemplate && <Text color="#718096">Static</Text>}
      </VStack>
    </GridItem>
  );
};

HumanActivityField.propTypes = {
  activityName: PropTypes.string.isRequired,
  activityDesc: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const HumanActivityTab = ({ showHeader, isDisabled, isTemplate }) => {
  const { register } = useFormContext();
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [activityAdded, setActivityAdded] = useState(false);
  const [tabEdited, setTabEdited] = useState(false);

  const toggleTabEdited = () => {
    setTabEdited(!tabEdited);
  };

  const toggleActivityAdded = () => {
    setActivityAdded(!activityAdded);
  };

  useEffect(async () => {
    const newQuestions = await OCHBackend.get(`/forms/human-activity`);
    const questions = await newQuestions.data;

    setAdditionalQuestions(questions.additionalFields);
  }, [tabEdited, activityAdded]);
  return (
    <>
      {isTemplate && (
        <>
          <HStack>
            <Box>
              <Text mt="30px" color="ochPurple" fontWeight="500">
                &quot;Static&quot; questions cannot be edited.
              </Text>
              <Text mb="20px" color="ochPurple" fontWeight="500">
                &quot;Non-Static&quot; questions can be added, edited, and/or deleted.
              </Text>
            </Box>
            <Spacer />
            <NewHumanActivityModal
              currentTemplate="human-activity"
              refreshTrigger={toggleActivityAdded}
            />
          </HStack>
        </>
      )}
      <VStack spacing="23px" align="left">
        {showHeader && (
          <Text fontWeight="600" fontSize="2xl">
            Human Activity
          </Text>
        )}
        <SimpleGrid columns={3} spacingX="64px" spacingY="68px">
          {HUMAN_ACTIVITIES.map(([name, desc, value]) => (
            <HumanActivityField
              key={value}
              activityName={name}
              activityDesc={desc}
              activityId={value}
              isDisabled={isDisabled}
              isTemplate={isTemplate}
            />
          ))}
        </SimpleGrid>
        <SimpleGrid columns={3} spacingX="64px" spacingY="68px">
          {additionalQuestions.map(question => {
            return (
              <NonStaticHumanActivity
                key={question.title.length}
                refreshTrigger={toggleTabEdited}
                question={question}
                isTemplate={isTemplate}
              />
            );
          })}
        </SimpleGrid>
        <Spacer />
        <VStack spacing="8px" align="left">
          <Flex>
            <Text fontWeight="500" fontSize="md">
              Outreach
            </Text>
            <Spacer />
            <Tooltip label="Tooltip" placement="top">
              <InfoIcon />
            </Tooltip>
          </Flex>
          <Textarea
            disabled={isDisabled}
            placeholder="Type here..."
            {...register(`${FORM_PREFIX}outreach`)}
          />
          <Spacer />
          <Spacer />
        </VStack>
        <VStack spacing="8px" align="left">
          <Text fontWeight="500" fontSize="md">
            Other Notes
          </Text>
          <Textarea
            disabled={isDisabled}
            placeholder="Type here..."
            {...register(`${FORM_PREFIX}otherNotes`)}
          />
          <Spacer />
          <Tooltip label="Note how many people and what topics (e.g. environmental concerns, surveying, the habitats, etc) you discussed with members of the public.">
            <InfoIcon />
          </Tooltip>
        </VStack>
        <Textarea
          disabled={isDisabled}
          placeholder="Type here..."
          {...register(`${FORM_PREFIX}outreach`)}
        />
        <Spacer />
        <Spacer />
      </VStack>
      <VStack spacing="8px" align="left">
        <Text fontWeight="500" fontSize="md">
          Other Notes
        </Text>
        <Textarea
          disabled={isDisabled}
          placeholder="Type here..."
          {...register(`${FORM_PREFIX}otherNotes`)}
        />
        <Spacer />
        <Spacer />
      </VStack>
      <Spacer />
    </>
  );
};

HumanActivityTab.defaultProps = {
  isDisabled: false,
  showHeader: true,
  isTemplate: false,
};

HumanActivityTab.propTypes = {
  isDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
  isTemplate: PropTypes.bool,
};

HumanActivityField.defaultProps = {
  isTemplate: false,
};
HumanActivityField.propTypes = {
  isTemplate: PropTypes.bool,
};

export default HumanActivityTab;
