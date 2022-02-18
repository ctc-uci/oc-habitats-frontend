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

function HumanActivity(props) {
  return (
    <Container maxW="100vw">
      <VStack spacing="23px" align="left">
        <Text fontWeight="600" fontSize="2xl">
          Human Activity
        </Text>
        <SimpleGrid columns={4} rows={3} spacingX="64px" spacingY="68px">
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Human Sitting
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalSitting(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Human Walking/Running
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalWalkingRunning(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Bikes
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalBikes(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Surfers
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalSurfers(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Sports
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalSports(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Fires
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalFires(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Fishing
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalFishing(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Vehicles
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalVehicles(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Equipment & ATV
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalEquipmentATV(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Dogs ON Leash
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalDogsOnLeash(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Dogs OFF Leash
              </Text>
              <NumberInput
                onChange={e => {
                  props.setTotalDogsOffLeash(parseInt(e, 10));
                }}
                step={1}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
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
              props.setTOutreachNotes(e.target.value);
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
              props.setOtherNotes(e.target.value);
            }}
          />
          <Spacer />
          <Spacer />
        </VStack>
      </VStack>
    </Container>
  );
}

HumanActivity.defaultProps = {
  setTotalSitting: PropTypes.func,
  setTotalWalkingRunning: PropTypes.func,
  setTotalBikes: PropTypes.func,
  setTotalSurfers: PropTypes.func,
  setTotalSports: PropTypes.func,
  setTotalFires: PropTypes.func,
  setTotalFishing: PropTypes.func,
  setTotalVehicles: PropTypes.func,
  setTotalEquipmentATV: PropTypes.func,
  setTotalDogsOnLeash: PropTypes.func,
  setTotalDogsOffLeash: PropTypes.func,
  setTOutreachNotes: PropTypes.func,
  setOtherNotes: PropTypes.func,
};

HumanActivity.propTypes = {
  setTotalSitting: PropTypes.func,
  setTotalWalkingRunning: PropTypes.func,
  setTotalBikes: PropTypes.func,
  setTotalSurfers: PropTypes.func,
  setTotalSports: PropTypes.func,
  setTotalFires: PropTypes.func,
  setTotalFishing: PropTypes.func,
  setTotalVehicles: PropTypes.func,
  setTotalEquipmentATV: PropTypes.func,
  setTotalDogsOnLeash: PropTypes.func,
  setTotalDogsOffLeash: PropTypes.func,
  setTOutreachNotes: PropTypes.func,
  setOtherNotes: PropTypes.func,
};
export default HumanActivity;
