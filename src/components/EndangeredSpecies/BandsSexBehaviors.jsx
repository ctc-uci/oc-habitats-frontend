import React, { useState, useCallback } from 'react';
import {
  VStack,
  Heading,
  Tabs,
  TabList,
  Tab,
  HStack,
  Button,
  TabPanels,
  TabPanel,
  Grid,
  GridItem,
  Box,
  FormControl,
  FormLabel,
  Code,
  Table,
  Tr,
  Td,
  Thead,
  Input,
  Select as ChakraSelect,
} from '@chakra-ui/react';
import { Select, chakraComponents } from 'chakra-react-select';
import update from 'immutability-helper';

import { BsTrashFill } from 'react-icons/bs';
import BandColors from '../../common/BandColors';

const generateSingleBandCode = band => {
  if (band.leg === null || band.verticalPosition === null || band.colors.length === 0) return '';
  let color;
  if (band.colors.length === 1) {
    color = band.colors[0].realValue;
  } else {
    color = `(${band.colors.map(c => c.realValue).join('/')})`;
  }
  if (band.verticalPosition === 'below') {
    color = color.toLowerCase();
  }
  if (band.alphanumeric && band.alphanumeric !== '') {
    return `${color}.${band.alphanumeric}`;
  }
  return color;
};
const generateCode = bands => {
  let topLeft = '';
  let topRight = '';
  let bottomLeft = '';
  let bottomRight = '';
  bands.forEach(band => {
    const code = generateSingleBandCode(band);
    if (band.leg === 'left') {
      if (band.verticalPosition === 'above') {
        topLeft += code;
      } else {
        bottomLeft += code;
      }
    } else if (band.verticalPosition === 'above') {
      topRight += code;
    } else {
      bottomRight += code;
    }
  });
  const leftCode = topLeft + bottomLeft;
  const rightCode = topRight + bottomRight;
  // if a leg has no bands, put X instead
  return `${leftCode || 'X'}:${rightCode || 'X'}`;
};

const BandsSexBehaviors = () => {
  const title = 'Bands & Sex & Behavior';

  // tabs can be added for each bird that they want to report bands for
  const [birdBandTabs, setBirdBandTabs] = useState([]);
  // keep track of current active tab
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const addBirdBandTab = () => {
    setBirdBandTabs([
      ...birdBandTabs,
      [{ colors: [], leg: null, verticalPosition: null, alphanumeric: '' }],
    ]);
  };

  const removeCurrentBirdBandTab = idx => {
    setBirdBandTabs(update(birdBandTabs, { $splice: [[idx, 1]] }));
  };

  // add a row to the current bird's tab that represents a single band
  const addBandRow = () => {
    setBirdBandTabs(
      update(birdBandTabs, {
        [activeTabIndex]: {
          $push: [{ colors: [], leg: null, verticalPosition: null, alphanumeric: '' }],
        },
      }),
    );
  };

  const updateBandRow = (rowIdx, key, val) => {
    setBirdBandTabs(
      update(birdBandTabs, {
        [activeTabIndex]: {
          [rowIdx]: {
            [key]: { $set: val },
          },
        },
      }),
    );
  };

  // remove a band row from current bird's tab
  const removeBandRow = rowIdx => {
    setBirdBandTabs(
      update(birdBandTabs, {
        [activeTabIndex]: {
          $splice: [[rowIdx, 1]],
        },
      }),
    );
  };

  console.log(birdBandTabs);

  const customComponents = {
    // eslint-disable-next-line react/prop-types
    Option: ({ children, ...props }) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <chakraComponents.Option {...props}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.data.selectIcon} {children}
      </chakraComponents.Option>
    ),
  };

  const mappedColourOptions = BandColors.map(option => ({
    ...option,
    colorScheme: option.selectColor,
    realValue: option.value,
    // trick react-select into thinking nothing gets selected so we can have duplicates
    value: Math.random(),
  }));

  // const removeBandTab = useCallback(idx => {
  //   setBandTabs(update(bandTabs, { $remove: [idx] }));
  // });

  const addTabs = () => {
    return birdBandTabs.map((d, i) => {
      return (
        <Tab
          key={d}
          borderWidth={2}
          borderColor="gray.200"
          flexShrink={0}
          _selected={{ color: 'black', bg: '#F49923', borderColor: '#F49923' }}
        >
          Banded Bird {i + 1}
        </Tab>
      );
    });
  };

  return (
    <Box width="container.lg">
      <VStack spacing="2em" justify="start" align="start">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Box>For bands at the same position, input the higher ones first.</Box>
        <HStack marginTop="18px">
          <Button onClick={addBirdBandTab} colorScheme="cyan">
            Add Banded Bird
          </Button>
        </HStack>
        <Tabs
          variant="solid-rounded"
          size="md"
          colorScheme="orange"
          width="100%"
          onChange={index => setActiveTabIndex(index)}
        >
          <TabList
            overflowY="hidden"
            sx={{
              scrollbarWidth: 'none',
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <HStack spacing={5} overflowX="auto">
              {addTabs()}
            </HStack>
          </TabList>
          <TabPanels>
            {birdBandTabs.map((birdBandTab, tabIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <TabPanel bgColor="gray.100" key={tabIndex} padding={4} marginTop={2} rounded="md">
                <Button onClick={() => removeCurrentBirdBandTab(activeTabIndex)} colorScheme="red">
                  Remove Bird {tabIndex + 1}
                </Button>
                <Button marginLeft="4" onClick={addBandRow} colorScheme="green">
                  Add Band
                </Button>
                <Table variant="unstyled" size="sm">
                  <Thead>
                    <Td width="5%" />
                    <Td width="5%">
                      <FormLabel>#</FormLabel>
                    </Td>
                    <Td width="35%">
                      <FormLabel>Band Color(s)</FormLabel>
                    </Td>
                    <Td width="20%">
                      <FormLabel>Band Leg</FormLabel>
                    </Td>
                    <Td width="20%">
                      <FormLabel>Band Ankle Position</FormLabel>
                    </Td>
                    <Td width="15%">
                      <FormLabel>Alphanumeric Code (Optional)</FormLabel>
                    </Td>
                  </Thead>
                  {birdBandTab.map((row, rowIdx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Tr key={rowIdx}>
                      <Td>
                        <Button size="sm" colorScheme="red" onClick={() => removeBandRow(rowIdx)}>
                          <BsTrashFill />
                        </Button>
                      </Td>
                      <Td>{rowIdx + 1}</Td>
                      <Td>
                        <FormControl>
                          <Select
                            isMulti
                            name="colors"
                            options={mappedColourOptions}
                            closeMenuOnSelect={false}
                            components={customComponents}
                            onChange={selectedBands =>
                              updateBandRow(rowIdx, 'colors', selectedBands)
                            }
                          />
                        </FormControl>
                      </Td>
                      <Td>
                        <FormControl>
                          <ChakraSelect
                            onChange={e => updateBandRow(rowIdx, 'leg', e.target.value)}
                            placeholder="Select..."
                          >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                          </ChakraSelect>
                        </FormControl>
                      </Td>
                      <Td>
                        <FormControl>
                          <ChakraSelect
                            onChange={e =>
                              updateBandRow(rowIdx, 'verticalPosition', e.target.value)
                            }
                            placeholder="Select..."
                          >
                            <option value="above">Above ankle</option>
                            <option value="below">Below ankle</option>
                          </ChakraSelect>
                        </FormControl>
                      </Td>
                      <Td>
                        <FormControl>
                          <Input
                            onChange={e => updateBandRow(rowIdx, 'alphanumeric', e.target.value)}
                          />
                        </FormControl>
                      </Td>
                    </Tr>
                  ))}
                </Table>
                <FormControl>
                  <FormLabel>Generated Banding Code</FormLabel>

                  {/* <Input maxWidth="2xs" disabled value={generateCode(bandTabs[tabIndex])} /> */}
                  <Code>{generateCode(birdBandTabs[tabIndex])}</Code>
                </FormControl>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

BandsSexBehaviors.propTypes = {};

export default BandsSexBehaviors;
