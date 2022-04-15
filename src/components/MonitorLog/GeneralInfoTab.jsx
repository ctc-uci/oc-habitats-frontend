import { InfoIcon } from '@chakra-ui/icons';
import {
  Container,
  Flex,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { Select as ReactSelect } from 'chakra-react-select';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import './GeneralInfoTab.css';

function GeneralInfoTab({ ochUsers, isDisabled, showHeader }) {
  const { control, register } = useFormContext();

  const partnerSelectOptions = ochUsers.map(user => ({
    ...user,
    value: user.name, // should be id
    label: `${user.name} (${user.email})`,
  }));

  const user = {
    segments: [
      { id: '0', name: 'segment0' },
      { id: '1', name: 'segment1' },
    ],
  };
  return (
    <div>
      <Container maxW="100vw">
        {showHeader && (
          <Text fontWeight="600" fontSize="2xl">
            General Information
          </Text>
        )}
        <VStack spacing="23px" align="left">
          <SimpleGrid columns={4} rows={3} spacingX="64px" spacingY="68px">
            <GridItem colSpan={1} rowSpan={1}>
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Survey Segment
                </Text>
                <Select disabled={isDisabled} {...register('segment')}>
                  {user.segments.map(segment => (
                    <option value={segment.name} key={segment.id}>
                      {segment.name}
                    </option>
                  ))}
                </Select>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <Text fontWeight="500" fontSize="md">
                Date (MM/DD/YYYY)
              </Text>
              <Controller
                control={control}
                name="surveyDate"
                render={({ field }) => (
                  <DatePicker
                    disabled={isDisabled}
                    onChange={field.onChange}
                    selected={field.value}
                  />
                )}
              />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Survey Start Time
                </Text>
                <Input disabled={isDisabled} type="time" {...register('startTime')} />
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Survey End Time
                </Text>
                <Input disabled={isDisabled} type="time" {...register('endTime')} />
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Temperature (F)
                </Text>
                <Input disabled={isDisabled} {...register('temperature')} />
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Cloud Cover (%)
                </Text>
                <Select disabled={isDisabled} {...register('cloudCover')}>
                  <option value="0">0</option>
                  <option value="33">33</option>
                  <option value="66">66</option>
                  <option value="100">100</option>
                </Select>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Precipitation
                </Text>
                <Select disabled={isDisabled} {...register('precipitation')}>
                  <option value="none">None</option>
                  <option value="fog">Fog</option>
                  <option value="drizzle">Drizzle</option>
                  <option value="rain">Rain</option>
                </Select>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Wind Speed/Direction
                </Text>
                <SimpleGrid columns={2} spacing="12px">
                  <GridItem>
                    <Input disabled={isDisabled} {...register('windSpeed')} />
                  </GridItem>
                  <GridItem>
                    <Select disabled={isDisabled} {...register('windDirection')}>
                      <option value="N">N</option>
                      <option value="NE">NE</option>
                      <option value="NW">NW</option>
                      <option value="S">S</option>
                      <option value="SE">SE</option>
                      <option value="SW">SW</option>
                      <option value="E">E</option>
                      <option value="W">W</option>
                    </Select>
                  </GridItem>
                </SimpleGrid>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Tides (ft)
                </Text>
                <Input disabled={isDisabled} placeholder="00.00" {...register('tides')} />
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Flex align="center">
                  <Text fontWeight="500" fontSize="md">
                    Overall Habitat Type
                  </Text>
                  <Spacer />
                  <Tooltip
                    label="Habitat Type: (Sandy beach, Dunes, Vegetation-Native, Vegetation-Non-Native, Groomed, Stone/cobble, Rocky/outcroppings)"
                    placement="top"
                  >
                    <InfoIcon />
                  </Tooltip>
                </Flex>
                <Select disabled={isDisabled} {...register('habitatType')}>
                  <option value="sandy beach">Sandy beach</option>
                  <option value="dunes">Dunes</option>
                  <option value="vegetation-native">Vegetation-Native</option>
                  <option value="vegetation-non-native">Vegetation-Non-Native</option>
                  <option value="groomed">Groomed</option>
                  <option value="stone/cobble">Stone/cobble</option>
                  <option value="rocky/outcroppings">Rocky/outcroppings</option>
                </Select>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Habitat Width (ft)
                </Text>
                <Select disabled={isDisabled} {...register('habitatWidth')}>
                  <option value="0=10">0-10</option>
                  <option value="10-50">10-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100-300">100-300</option>
                  <option value="300+">300+</option>
                </Select>
              </VStack>
            </GridItem>
          </SimpleGrid>
          <VStack spacing="8px" align="left" maxW="600px">
            <Text fontWeight="500" fontSize="md">
              Monitoring Session Partners
            </Text>
            <Text>
              If you completed this monitoring session as a group, only one member should submit
              this form.
              {/* Added Partners will be notified when this monitor log is submitted for review. */}
            </Text>
            <Controller
              name="partners"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  isDisabled={isDisabled}
                  isMulti
                  options={partnerSelectOptions}
                  placeholder="Search for member by name or email..."
                  closeMenuOnSelect={false}
                  size="md"
                  menuPosition="fixed"
                />
              )}
            />
          </VStack>
        </VStack>
      </Container>
    </div>
  );
}

GeneralInfoTab.defaultProps = {
  isDisabled: false,
  showHeader: true,
};

GeneralInfoTab.propTypes = {
  ochUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
};

export default GeneralInfoTab;
