import React, { useState } from 'react';
import {
  VStack,
  Heading,
  Tabs,
  TabList,
  HStack,
  Button,
  TabPanels,
  TabPanel,
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
import { CloseIcon } from '@chakra-ui/icons';
import BandColors from '../../common/BandColors';
import CloseableTab from './CloseableTab';

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

const BandingSection = () => {
  const title = 'Banding';

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

  const removeBirdBandTab = idx => {
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
    // trick react-select into thinking nothing gets selected so we can have duplicate colors
    value: Math.random(),
  }));

  // const removeBandTab = useCallback(idx => {
  //   setBandTabs(update(bandTabs, { $remove: [idx] }));
  // });

  const addTabs = () => {
    return birdBandTabs.map((d, i) => {
      return (
        <CloseableTab
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          onClose={() => removeBirdBandTab(i)}
        >
          Banded Bird {i + 1}
        </CloseableTab>
      );
    });
  };

  return (
    <Box width="container.lg">
      <VStack spacing="4" justify="start" align="start">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Box>Note: Input the bands in top to bottom order (from the bird’s perspective).</Box>
        <HStack marginTop="18px" />
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
              <Button
                onClick={addBirdBandTab}
                variant="outline"
                borderRadius="full"
                colorScheme="cyan"
              >
                Add Banded Bird +
              </Button>
            </HStack>
          </TabList>
          <TabPanels>
            {birdBandTabs.map((birdBandTab, tabIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <TabPanel bgColor="gray.50" key={tabIndex} padding={4} marginTop={2} rounded="md">
                <Table variant="unstyled" size="sm">
                  <Thead>
                    <Td width="5%" />
                    <Td width="35%">
                      <FormLabel>Band Color(s)</FormLabel>
                    </Td>
                    <Td width="20%">
                      <FormLabel>Band Leg</FormLabel>
                    </Td>
                    <Td width="20%">
                      <FormLabel>Band Ankle Position</FormLabel>
                    </Td>
                    <Td width="20%">
                      <FormLabel>Alphanumeric Code (Optional)</FormLabel>
                    </Td>
                  </Thead>
                  {birdBandTab.map((row, rowIdx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Tr key={rowIdx}>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="gray"
                          backgroundColor="gray.200"
                          onClick={() => removeBandRow(rowIdx)}
                        >
                          <CloseIcon />
                        </Button>
                      </Td>
                      <Td>
                        <FormControl backgroundColor="white">
                          <Select
                            isMulti
                            name="colors"
                            options={mappedColourOptions}
                            closeMenuOnSelect={false}
                            components={customComponents}
                            onChange={selectedBands =>
                              updateBandRow(rowIdx, 'colors', selectedBands)
                            }
                            value={row.colors}
                          />
                        </FormControl>
                      </Td>
                      <Td>
                        <FormControl backgroundColor="white">
                          <ChakraSelect
                            onChange={e => updateBandRow(rowIdx, 'leg', e.target.value)}
                            placeholder="Select..."
                            value={row.leg}
                          >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                          </ChakraSelect>
                        </FormControl>
                      </Td>
                      <Td>
                        <FormControl backgroundColor="white">
                          <ChakraSelect
                            onChange={e =>
                              updateBandRow(rowIdx, 'verticalPosition', e.target.value)
                            }
                            placeholder="Select..."
                            value={row.verticalPosition}
                          >
                            <option value="above">Above ankle</option>
                            <option value="below">Below ankle</option>
                          </ChakraSelect>
                        </FormControl>
                      </Td>
                      <Td>
                        <FormControl backgroundColor="white">
                          <Input
                            onChange={e => updateBandRow(rowIdx, 'alphanumeric', e.target.value)}
                            value={row.alphanumeric}
                          />
                        </FormControl>
                      </Td>
                    </Tr>
                  ))}
                  <Tr>
                    <Td />
                    <Td>
                      <Button
                        width="100%"
                        marginTop={2}
                        marginBottom={2}
                        onClick={addBandRow}
                        colorScheme="cyan"
                      >
                        Add Band +
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td />
                    <Td>
                      <FormLabel>Generated Banding Code</FormLabel>

                      {/* <Input maxWidth="2xs" disabled value={generateCode(bandTabs[tabIndex])} /> */}
                      <Code>{generateCode(birdBandTabs[tabIndex])}</Code>
                    </Td>
                  </Tr>
                </Table>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

BandingSection.propTypes = {};

export default BandingSection;
