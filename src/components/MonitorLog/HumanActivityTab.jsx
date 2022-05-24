import { InfoIcon } from '@chakra-ui/icons';
import {
  chakra,
  Flex,
  GridItem,
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
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const FORM_PREFIX = 'humanActivity';
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

const HumanActivityField = ({
  activityName,
  activityDesc,
  activityNum,
  activityId,
  isDisabled,
}) => {
  const { setValue, getValues } = useFormContext();
  const formKey = `${FORM_PREFIX}[${activityNum}]`;

  useEffect(() => {
    setValue(formKey, { activity: activityId, count: getValues(formKey)?.count || 0 });
  }, []);

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
          onChange={(_, val) => setValue(formKey, { activity: activityId, count: val })}
          defaultValue={getValues(formKey)?.count || 0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </VStack>
    </GridItem>
  );
};

HumanActivityField.propTypes = {
  activityName: PropTypes.string.isRequired,
  activityDesc: PropTypes.string.isRequired,
  activityNum: PropTypes.number.isRequired,
  activityId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const HumanActivityTab = ({ showHeader, isDisabled }) => {
  const { register } = useFormContext();

  return (
    <VStack spacing="23px" align="left">
      {showHeader && (
        <Text fontWeight="600" fontSize="2xl">
          Human Activity
        </Text>
      )}
      <SimpleGrid
        columns={{ md: 3, base: 1 }}
        spacingX="64px"
        spacingY={{ md: '68px', base: '30px' }}
      >
        {HUMAN_ACTIVITIES.map(([name, desc, value], idx) => (
          <HumanActivityField
            key={value}
            activityName={name}
            activityNum={idx}
            activityDesc={desc}
            activityId={value}
            isDisabled={isDisabled}
          />
        ))}
      </SimpleGrid>
      <Spacer />
      <VStack spacing="8px" align="left">
        <Flex>
          <Text fontWeight="500" fontSize="md">
            Outreach
          </Text>
          <Spacer />
          <Tooltip label="Note how many people and what topics (e.g. environmental concerns, surveying, the habitats, etc) you discussed with members of the public.">
            <InfoIcon />
          </Tooltip>
        </Flex>
        <Textarea
          disabled={isDisabled}
          placeholder="Type here..."
          {...register(`${FORM_PREFIX}Outreach`)}
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
          {...register(`${FORM_PREFIX}OtherNotes`)}
        />
        <Spacer />
        <Spacer />
      </VStack>
    </VStack>
  );
};

HumanActivityTab.defaultProps = {
  isDisabled: false,
  showHeader: true,
};

HumanActivityTab.propTypes = {
  isDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
};

export default HumanActivityTab;
