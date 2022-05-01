import {
  Box,
  Button,
  Checkbox,
  Code,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Select as ChakraSelect,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import generateBandingCode from '../../common/bandingCodeUtil';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import BandingColorSelect from './BandingColorSelect';
import CloseableTab from './CloseableTab';

const BAND_POSITIONS = [
  { label: 'Top Left', value: 'topLeft' },
  { label: 'Top Right', value: 'topRight' },
  { label: 'Bottom Left', value: 'bottomLeft' },
  { label: 'Bottom Right', value: 'bottomRight' },
];

const BandingSection = () => {
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
  const currentBandTab = watch(`bandTabs.${activeTabIndex}`);
  const currentBandTabCode = generateBandingCode(currentBandTab);

  const addBirdBandTab = () => {
    const newTab = {};
    BAND_POSITIONS.forEach(({ value }) => {
      newTab[value] = {
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
    <CollapsibleSection title="Banding" limitWidth={false}>
      <HStack align="start">
        <Text fontWeight="semibold">Note:</Text>
        <Box>
          <Text>
            If there is an alphanumeric band, select the color(s) of the band and input the
            alphanumeric code in the text field “Alphanumeric”.
          </Text>
          <Text>
            If there is an alphanumeric flag on the bird’s leg, check the “Is an Alphanumeric Flag”
            box.
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
            <TabPanel bgColor="gray.50" key={birdBandTab.id} padding={4} marginTop={2} rounded="md">
              <Grid templateColumns={['repeat(1,1fr)', '', 'repeat(2, 1fr)']} gap="2em">
                {BAND_POSITIONS.map(({ label: bandPosition, value: bandPositionValue }) => (
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
                              {...register(
                                `bandTabs.${tabIndex}.${bandPositionValue}.verticalPosition`,
                              )}
                            >
                              <option value="ABOVE">Above ankle</option>
                              <option value="BELOW">Below ankle</option>
                            </ChakraSelect>
                          </Td>
                          <Td p="0" pr="4" verticalAlign="top">
                            <Box bgColor="white">
                              <BandingColorSelect
                                name={`bandTabs.${tabIndex}.${bandPositionValue}.colors`}
                              />
                            </Box>
                          </Td>
                          <Td p="0" verticalAlign="top">
                            <Input
                              bgColor="white"
                              {...register(
                                `bandTabs.${tabIndex}.${bandPositionValue}.alphanumeric`,
                              )}
                            />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td px="0" py="2" colSpan={3}>
                            <Checkbox
                              {...register(`bandTabs.${tabIndex}.${bandPositionValue}.flag`)}
                            >
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
    </CollapsibleSection>
  );
};

BandingSection.propTypes = {};

export default BandingSection;
