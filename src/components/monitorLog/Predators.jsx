import { InfoIcon } from '@chakra-ui/icons';
import {
  Container,
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
import React from 'react';

function Predators(props) {
  const {
    setTotalCrows,
    setTotalRavens,
    setTotalRaptors,
    setTotalHorses,
    setTotalCoyotes,
    setTotalFoxes,
    setTotalCats,
    setOtherPredators,
  } = props;
  return (
    <Container maxW="100vw">
      <VStack spacing="23px" align="left">
        <Text fontWeight="600" fontSize="2xl">
          Predators
        </Text>
        <SimpleGrid columns={4} rows={3} spacingX="64px" spacingY="68px">
          <GridItem colSpan={1} rowSpan={1} width="200px">
            <VStack spacing="8px" align="left">
              <Flex>
                <Text fontWeight="500" fontSize="md">
                  Crows
                </Text>
                <Spacer />
                <Tooltip
                  label="This is also a tracked species. Edit the amount of “Crows” seen from the “Additional Species” page."
                  placement="top"
                >
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <NumberInput
                onChange={e => {
                  setTotalCrows(parseInt(e, 10));
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
              <Flex>
                <Text fontWeight="500" fontSize="md">
                  Ravens
                </Text>
                <Spacer />
                <Tooltip
                  label="This is also a tracked species. Edit the amount of “Ravens” seen from the “Additional Species” page."
                  placement="top"
                >
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <NumberInput
                onChange={e => {
                  setTotalRavens(parseInt(e, 10));
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
                Raptors
              </Text>
              <NumberInput
                onChange={e => {
                  setTotalRaptors(parseInt(e, 10));
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
                Horses
              </Text>
              <NumberInput
                onChange={e => {
                  setTotalHorses(parseInt(e, 10));
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
                Coyotes
              </Text>
              <NumberInput
                onChange={e => {
                  setTotalCoyotes(parseInt(e, 10));
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
                Foxes
              </Text>
              <NumberInput
                onChange={e => {
                  setTotalFoxes(parseInt(e, 10));
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
                Cats
              </Text>
              <NumberInput
                onChange={e => {
                  setTotalCats(parseInt(e, 10));
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
          <HStack spacing="390">
            <Text fontWeight="500" fontSize="md">
              Other Predator(s)
            </Text>
            <Tooltip
              label="Describe any potential predator species not listed above.
              e.g. Unicorn - 2 "
              placement="top"
            >
              <InfoIcon />
            </Tooltip>
          </HStack>
          <Textarea
            width="536px"
            placeholder="Type here..."
            onChange={e => {
              setOtherPredators(e.target.value);
            }}
          />
          <Spacer />
          <Spacer />
        </VStack>
      </VStack>
    </Container>
  );
}

Predators.defaultProps = {
  setTotalCrows: PropTypes.func,
  setTotalRavens: PropTypes.func,
  setTotalRaptors: PropTypes.func,
  setTotalHorses: PropTypes.func,
  setTotalCoyotes: PropTypes.func,
  setTotalFoxes: PropTypes.func,
  setTotalCats: PropTypes.func,
  setOtherPredators: PropTypes.func,
};

Predators.propTypes = {
  setTotalCrows: PropTypes.func,
  setTotalRavens: PropTypes.func,
  setTotalRaptors: PropTypes.func,
  setTotalHorses: PropTypes.func,
  setTotalCoyotes: PropTypes.func,
  setTotalFoxes: PropTypes.func,
  setTotalCats: PropTypes.func,
  setOtherPredators: PropTypes.func,
};

export default Predators;
