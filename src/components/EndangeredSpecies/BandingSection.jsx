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
  FormLabel,
  Code,
  Table,
  Tr,
  Td,
  Thead,
  Input,
  Select as ChakraSelect,
  Grid,
  GridItem,
  Text,
  Checkbox,
  Tbody,
  chakra,
} from '@chakra-ui/react';
import { Select, chakraComponents } from 'chakra-react-select';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { BsFillCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import BandColors from '../../common/BandColors';
import CloseableTab from './CloseableTab';

const BAND_POSITIONS = ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right'];

const generateSingleBandCode = band => {
  if (!band.verticalPosition || !band.colors || band.colors.length === 0) return '';
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
    return `${band.flag ? 'F' : ''}${color}.${band.alphanumeric}`;
  }
  return `${band.flag ? 'F' : ''}${color}`;
};
const generateCode = bands => {
  if (!bands || !bands[0]) {
    return 'invalid';
  }
  const [topLeft, topRight, bottomLeft, bottomRight] = bands;
  if (
    (topLeft.verticalPosition === 'below' && bottomLeft.verticalPosition === 'above') ||
    (topRight.verticalPosition === 'below' && bottomRight.verticalPosition === 'above')
  ) {
    return 'Top band must be above bottom band';
  }
  const leftCode = generateSingleBandCode(topLeft) + generateSingleBandCode(bottomLeft);
  const rightCode = generateSingleBandCode(topRight) + generateSingleBandCode(bottomRight);
  // if a leg has no bands, put X instead
  return `${leftCode || 'X'}:${rightCode || 'X'}`;
};

const BandingSection = () => {
  const title = 'Banding';

  const { register, watch, control } = useFormContext();

  // tabs can be added for each bird that they want to report bands for
  const {
    fields: birdBandTabs,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'bandTabs',
  });
  // keep track of current active tab
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  // watch the 4 bands on the current tab so we can generate the band code
  const currentBandTab = [0, 1, 2, 3].map(idx => watch(`bandTabs.${activeTabIndex}.${idx}`));
  const currentBandTabCode = generateCode(currentBandTab);

  const addBirdBandTab = () => {
    const newTab = {};
    [...Array(4)].forEach((_, idx) => {
      newTab[idx] = {
        colors: [],
        flag: false,
        verticalPosition: null,
        alphanumeric: '',
      };
    });
    append(newTab);
  };

  const removeBirdBandTab = idx => {
    remove(idx);
  };

  // setup custom rendering to show the band color in color select dropdown
  const customComponents = {
    // eslint-disable-next-line react/prop-types
    Option: ({ children, ...props }) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <chakraComponents.Option {...props}>
        {/* eslint-disable-next-line react/prop-types */}
        <chakra.span
          marginRight={2}
          borderWidth="1px"
          // eslint-disable-next-line react/prop-types
          borderColor={props.data.value === 'W' ? 'gray.600' : props.data.realColor}
          borderRadius="3xl"
        >
          {/* eslint-disable-next-line react/prop-types */}
          <IconContext.Provider value={{ color: props.data.realColor }}>
            <BsFillCircleFill />
          </IconContext.Provider>
        </chakra.span>{' '}
        {children}
      </chakraComponents.Option>
    ),
  };

  const mappedColorOptions = BandColors.map(option => ({
    ...option,
    colorScheme: option.selectColor,
    realValue: option.value,
    // trick react-select into thinking nothing gets selected so we can have duplicate colors
    value: Math.random(),
  }));

  const addTabs = () => {
    return birdBandTabs.map((d, i) => {
      return (
        <CloseableTab
          // eslint-disable-next-line react/no-array-index-key
          key={d.id}
          onClose={() => removeBirdBandTab(i)}
        >
          Banded Bird {i + 1}
        </CloseableTab>
      );
    });
  };

  return (
    <Box width="100%">
      <VStack spacing="4" justify="start" align="start">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <HStack align="start">
          <Text fontWeight="semibold">Note:</Text>
          <Box>
            <Text>
              If there is an alphanumeric band, select the color(s) of the band and input the
              alphanumeric code in the text field “Alphanumeric”.
            </Text>
            <Text>
              If there is an alphanumeric flag on the bird’s leg, check the “Is an Alphanumeric
              Flag” box.
            </Text>
          </Box>
        </HStack>
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
                minWidth="180px"
              >
                Add Banded Bird +
              </Button>
            </HStack>
          </TabList>
          <TabPanels>
            {birdBandTabs.map((birdBandTab, tabIndex) => (
              <TabPanel
                bgColor="gray.50"
                key={birdBandTab.id}
                padding={4}
                marginTop={2}
                rounded="md"
              >
                <Grid templateColumns={['repeat(1,1fr)', '', 'repeat(2, 1fr)']} gap="2em">
                  {BAND_POSITIONS.map((bandPosition, idx) => (
                    <GridItem key={bandPosition}>
                      <Text fontWeight="semibold" fontSize="md" mb="2">
                        {bandPosition} Band
                      </Text>
                      <Table variant="unstyled" size="sm">
                        <Thead>
                          <Tr>
                            <Td width="25%" p="0" pr="4">
                              <Text fontSize="sm" mb="1">
                                Position on leg
                              </Text>
                            </Td>
                            <Td width="45%" p="0" pr="4">
                              <Text fontSize="sm" mb="1">
                                Color(s)
                              </Text>
                            </Td>
                            <Td width="30%" p="0">
                              <Text fontSize="sm" mb="1">
                                Alphanumeric code
                              </Text>
                            </Td>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td p="0" pr="4" verticalAlign="top">
                              <ChakraSelect
                                placeholder="Select..."
                                bgColor="white"
                                {...register(`bandTabs.${tabIndex}.${idx}.verticalPosition`)}
                              >
                                <option value="above">Above ankle</option>
                                <option value="below">Below ankle</option>
                              </ChakraSelect>
                            </Td>
                            <Td p="0" pr="4" verticalAlign="top">
                              <Box bgColor="white">
                                <Controller
                                  name={`bandTabs.${tabIndex}.${idx}.colors`}
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      isMulti
                                      options={mappedColorOptions}
                                      closeMenuOnSelect={false}
                                      components={customComponents}
                                    />
                                  )}
                                />
                              </Box>
                            </Td>
                            <Td p="0" verticalAlign="top">
                              <Input
                                bgColor="white"
                                {...register(`bandTabs.${tabIndex}.${idx}.alphanumeric`)}
                              />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td px="0" py="2" colSpan={3}>
                              <Checkbox {...register(`bandTabs.${tabIndex}.${idx}.flag`)}>
                                Is an Alphanumeric Flag
                              </Checkbox>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </GridItem>
                  ))}
                  <GridItem>
                    <FormLabel>Generated Banding Code</FormLabel>

                    <Code fontSize="lg">{currentBandTabCode}</Code>
                  </GridItem>
                </Grid>
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
