import { InfoIcon } from '@chakra-ui/icons';
import React from 'react';
import {
  Container,
  GridItem,
  SimpleGrid,
  Text,
  VStack,
  Spacer,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Tooltip,
} from '@chakra-ui/react';

function PredatorsHumanActivity() {
  return (
    <Container maxW="100vw">
      <VStack spacing="23px" align="left">
        <Text fontWeight="600" fontSize="2xl">
          Predators & Human Activity
        </Text>
        <SimpleGrid columns={4} rows={3} spacingX="64px" spacingY="68px">
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Crows
              </Text>
              <NumberInput step={1} defaultValue={0} min={0}>
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
                Ravens
              </Text>
              <NumberInput step={1} defaultValue={0} min={0}>
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
                Raptors
              </Text>
              <NumberInput step={1} defaultValue={0} min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack spacing="8px" align="left" />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Human Sitting
              </Text>
              <NumberInput step={1} defaultValue={0} min={0}>
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
              <NumberInput step={1} defaultValue={0} min={0}>
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
              <NumberInput step={1} defaultValue={0} min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack spacing="8px" align="left" />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Bikes
              </Text>
              <NumberInput step={1} defaultValue={0} min={0}>
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
              <NumberInput step={1} defaultValue={0} min={0}>
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
              <Flex align="center">
                <Text fontWeight="500" fontSize="md">
                  Other
                </Text>
                <Spacer />
                <Tooltip label="..." placement="top">
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <NumberInput step={1} defaultValue={0} min={0}>
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
        <Spacer />
        <SimpleGrid columns={4} rows={1} spacingX="64px" spacingY="68px">
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Dogs ON Leash
              </Text>
              <NumberInput step={1} defaultValue={0} min={0}>
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
              <NumberInput step={1} defaultValue={0} min={0}>
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
              <NumberInput step={1} defaultValue={0} min={0}>
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
              <NumberInput step={1} defaultValue={0} min={0}>
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
          <Text fontWeight="500" fontSize="md">
            Notes
          </Text>
          <Textarea placeholder="Type here..." />
          <Spacer />
          <Spacer />
        </VStack>
      </VStack>
    </Container>
  );
}

export default PredatorsHumanActivity;
