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
} from '@chakra-ui/react';
import { Select, chakraComponents } from 'chakra-react-select';
import update from 'immutability-helper';

import BandColors from '../../common/BandColors';

const bandLocations = ['Top Left Band', 'Top Right Band', 'Bottom Left Band', 'Bottom Right Band'];

const generatePartialCode = (singleLegBands, isAboveAnkle) => {
  if (singleLegBands.length === 0) return '';
  // bands above ankle UPPERCASE, below ankle lowercase
  const letters = singleLegBands.map(band =>
    isAboveAnkle ? band.realValue : band.realValue.toLowerCase(),
  );
  // if there's multiple, format as (a/b/c) otherwise just return
  if (letters.length === 1) return letters[0];
  return `(${letters.join('/')})`;
};
const generateCode = bands => {
  const [topLeft, topRight, bottomLeft, bottomRight] = bands;
  const leftCode = generatePartialCode(topLeft, true) + generatePartialCode(bottomLeft, false);
  const rightCode = generatePartialCode(topRight, true) + generatePartialCode(bottomRight, false);
  // if a leg has no bands, put X instead
  return `${leftCode || 'X'}:${rightCode || 'X'}`;
};

const BandsSexBehaviors = () => {
  const title = 'Bands & Sex & Behavior';

  const [bandTabs, setBandTabs] = useState([]);

  const addBandTab = useCallback(() => {
    setBandTabs([...bandTabs, [[], [], [], []]]);
  }, [bandTabs, setBandTabs]);

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

  const updateSelectedBands = useCallback(
    (tabIndex, bandIndex, selectedBands) => {
      setBandTabs(update(bandTabs, { [tabIndex]: { [bandIndex]: { $set: selectedBands } } }));
    },
    [bandTabs, setBandTabs],
  );

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
    return bandTabs.map((d, i) => {
      return (
        <Tab
          key={d}
          borderWidth={2}
          borderColor="gray.200"
          flexShrink={0}
          _selected={{ color: 'black', bg: '#F49923', borderColor: '#F49923' }}
        >
          Band {i + 1}
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
        <Tabs variant="solid-rounded" size="md" colorScheme="orange" width="100%">
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
            {bandTabs.map((_, tabIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <TabPanel key={tabIndex} padding={0}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} marginTop={6}>
                  {bandLocations.map((name, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <GridItem key={idx} w="100%">
                      <FormControl>
                        <FormLabel>
                          {name}
                          <Select
                            chakraStyles={{
                              container: () => ({
                                marginTop: 2,
                              }),
                            }}
                            isMulti
                            name="colors"
                            options={mappedColourOptions}
                            placeholder="Select some colors..."
                            closeMenuOnSelect={false}
                            components={customComponents}
                            onChange={selectedBands =>
                              updateSelectedBands(tabIndex, idx, selectedBands)
                            }
                          />
                        </FormLabel>
                      </FormControl>
                    </GridItem>
                  ))}
                </Grid>
                <FormControl marginTop={6}>
                  <FormLabel>Banding Code</FormLabel>

                  {/* <Input maxWidth="2xs" disabled value={generateCode(bandTabs[tabIndex])} /> */}
                  <Code>{generateCode(bandTabs[tabIndex])}</Code>
                </FormControl>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <Button marginTop="18px" onClick={addBandTab} colorScheme="cyan">
          Add Banding Code +
        </Button>
      </VStack>
    </Box>
  );
};

BandsSexBehaviors.propTypes = {};

export default BandsSexBehaviors;
