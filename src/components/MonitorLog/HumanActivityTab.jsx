import { InfoIcon } from '@chakra-ui/icons';
import {
  Container,
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
import React from 'react';
import PropTypes from 'prop-types';
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

const HumanActivityField = ({ activityName, activityDesc, activityId }) => {
  const { setValue, getValues } = useFormContext();

  return (
    <GridItem colSpan={1}>
      <VStack spacing="8px" align="left">
        <Text fontWeight="500" fontSize="md">
          {activityName}
        </Text>
        <Text>{activityDesc}</Text>
        {activityId === 'speedingVehicles' && (
          <Text color="#156071" style={{ marginTop: 0 }}>
            {/* ^ color should be ochBluePress */}
            Report to ENTITY at XXX-XXX-XXXX
          </Text>
        )}
        <NumberInput
          min={0}
          onChange={(_, val) => setValue(FORM_PREFIX + activityId, val)}
          defaultValue={getValues()[FORM_PREFIX + activityId] || 0}
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
  activityId: PropTypes.string.isRequired,
};

function HumanActivityTab() {
  const { register } = useFormContext();

  return (
    <Container maxW="100vw">
      <VStack spacing="23px" align="left">
        <Text fontWeight="600" fontSize="2xl">
          Human Activity
        </Text>
        <SimpleGrid columns={3} spacingX="64px" spacingY="68px">
          {HUMAN_ACTIVITIES.map(([name, desc, value]) => (
            <HumanActivityField
              key={value}
              activityName={name}
              activityDesc={desc}
              activityId={value}
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
            <Tooltip label="Tooltip" placement="top">
              <InfoIcon />
            </Tooltip>
          </Flex>
          <Textarea
            placeholder="Type here..."
            onChange={e => {
              setOutreachNotes(e.target.value);
            }}
          />
          <Spacer />
          <Spacer />
        </VStack>
        <VStack spacing="8px" align="left">
          <Text fontWeight="500" fontSize="md">
            Other Notes
          </Text>
          <Textarea
            placeholder="Type here..."
            onChange={e => {
              setOtherNotes(e.target.value);
            }}
          />
          <Spacer />
          <Spacer />
        </VStack>
      </VStack>
    </Container>
  );
}

export default HumanActivityTab;
