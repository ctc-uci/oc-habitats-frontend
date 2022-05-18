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
  Stack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
  VStack,
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
  const [isMobile] = useMediaQuery('(max-width: 768px)');

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
          Bird {i + 1}
        </CloseableTab>
      );
    });
  };

  return (
    <CollapsibleSection title="Banding" limitWidth={false}>
      <HStack align="start">
        <Text fontWeight="semibold" fontSize={{ md: 'md', base: 'sm' }}>
          Note:
        </Text>
        {isMobile ? (
          <Text fontSize="sm">
            Input the bands in top to bottom order (from the bird&apos;s perspective)
          </Text>
        ) : (
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
        )}
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
              color="ochBluePress"
              borderColor="ochBluePress"
              minWidth="130px"
            >
              Add Bird +
            </Button>
          </HStack>
        </TabList>
        <TabPanels>
          {birdBandTabs.map((birdBandTab, tabIndex) => (
            <TabPanel bgColor="gray.50" key={birdBandTab.id} padding={4} marginTop={4} rounded="md">
              <Grid templateColumns={{ md: 'repeat(2, 1fr)', base: 'repeat(1, 1fr)' }} gap="2em">
                {BAND_POSITIONS.map(({ label: bandPosition, value: bandPositionValue }) => (
                  <GridItem key={bandPosition}>
                    <Text fontWeight="semibold" fontSize="md" mb="2">
                      {bandPosition} Band
                    </Text>
                    <Stack direction={{ md: 'row', base: 'column' }}>
                      <VStack align="start" spacing="0">
                        <Text fontSize="sm" mb="1" display="flex">
                          Position on leg
                        </Text>
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
                      </VStack>
                      <VStack align="start" spacing="0" w={{ md: '45%', base: '100%' }}>
                        <Text fontSize="sm" mb="1" display="flex">
                          Color(s)
                        </Text>
                        <Box bgColor="white" w="100%">
                          <BandingColorSelect
                            name={`bandTabs.${tabIndex}.${bandPositionValue}.colors`}
                          />
                        </Box>
                      </VStack>
                      <VStack align="start" spacing="0" w={{ md: '30%', base: '100%' }}>
                        <Text fontSize="sm" mb="1">
                          Alphanumeric
                        </Text>
                        <Input
                          bgColor="white"
                          placeholder="Optional"
                          {...register(`bandTabs.${tabIndex}.${bandPositionValue}.alphanumeric`)}
                        />
                      </VStack>
                    </Stack>
                    <Checkbox
                      mt="10px"
                      {...register(`bandTabs.${tabIndex}.${bandPositionValue}.flag`)}
                    >
                      Is an Alphanumeric Flag
                    </Checkbox>
                  </GridItem>
                ))}
                <GridItem>
                  <FormLabel fontSize="16px">Banding Code (Auto-generated)</FormLabel>

                  <Code w="250px" fontSize="lg" p={1}>
                    {currentBandTabCode}
                  </Code>
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
