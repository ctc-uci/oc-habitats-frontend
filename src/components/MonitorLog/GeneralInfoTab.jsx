/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  GridItem,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { React, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import NonStaticQuestion from './NonStaticQuestion';
import ReactHookFormSelect from '../../common/ReactHookFormSelect';
import './GeneralInfoTab.css';
import { OCHBackend } from '../../common/utils';
import NewQuestionModal from '../NewQuestionModal';

function GeneralInfoTab({ assignedSegments, monitorPartners, isDisabled, showHeader, isTemplate }) {
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [tabEdited, setTabEdited] = useState(false);
  const [questionAdded, setQuestionAdded] = useState(false);
  const { control, register } = useFormContext();

  const toggleTabEdited = () => {
    setTabEdited(!tabEdited);
  };

  const toggleQuestionAdded = () => {
    setQuestionAdded(!questionAdded);
  };

  useEffect(async () => {
    const newQuestions = await OCHBackend.get(`/forms/general`, { withCredentials: true });
    const questions = await newQuestions.data;

    setAdditionalQuestions(questions.additionalFields);
  }, [tabEdited, questionAdded]);

  const partnerSelectOptions = monitorPartners.map(user => ({
    ...user,
    value: user._id,
    label: `${user.firstName} ${user.lastName} (${user.email})`,
  }));

  const segmentOptions = assignedSegments.map(segment => ({
    value: segment.id,
    label: `${segment.segmentId} - ${segment.name}`,
  }));

  return (
    <div>
      {isTemplate && (
        <>
          <HStack>
            <Box>
              <Text mt="30px" color="ochPurple" fontWeight="500" align="start">
                &quot;Static&quot; questions cannot be edited.
              </Text>
              <Text mb="20px" color="ochPurple" fontWeight="500" align="start">
                &quot;Non-Static&quot; questions can be added, edited, and/or deleted.
              </Text>
            </Box>
            <Spacer />
            <NewQuestionModal currentTemplate="general" refreshTrigger={toggleQuestionAdded} />
          </HStack>
        </>
      )}
      {showHeader && (
        <Text mb="20px" fontWeight="600" fontSize="2xl">
          General Information
        </Text>
      )}
      <VStack mt="20px" spacing="23px" align="left">
        <SimpleGrid
          columns={{ md: 4, base: 1 }}
          rows={3}
          spacingX="64px"
          spacingY={{ md: '68px', base: '30px' }}
        >
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Survey Segment
              </Text>
              <ReactHookFormSelect
                name="segment"
                options={segmentOptions}
                optionKey="value"
                isDisabled={isDisabled}
                size="md"
              />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Date (MM/DD/YYYY)
              </Text>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <DatePicker
                    disabled={isDisabled}
                    onChange={field.onChange}
                    selected={field.value}
                  />
                )}
              />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Survey Start Time
              </Text>
              <Input disabled={isDisabled} type="time" {...register('startTime')} />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Survey End Time
              </Text>
              <Input disabled={isDisabled} type="time" {...register('endTime')} />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Temperature (F)
              </Text>
              <Input disabled={isDisabled} {...register('temperature')} />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
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
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
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
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
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
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Tides (ft)
              </Text>
              <Input disabled={isDisabled} placeholder="00.00" {...register('tides')} />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
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
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Habitat Width (ft)
              </Text>
              <Select disabled={isDisabled} {...register('habitatWidth')}>
                <option value="0-10">0-10</option>
                <option value="10-50">10-50</option>
                <option value="50-100">50-100</option>
                <option value="100-300">100-300</option>
                <option value="300+">300+</option>
              </Select>
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
        </SimpleGrid>
        <SimpleGrid
          columns={{ md: 4, base: 1 }}
          spacingX="64px"
          spacingY={{ md: '68px', base: '30px' }}
        >
          {additionalQuestions?.map(question => {
            return (
              <NonStaticQuestion
                refreshTrigger={toggleTabEdited}
                key={question._id}
                formKey={`generalAdditionalFields.${question._id}`}
                question={question}
                formType="general"
                isTemplate={isTemplate}
                isDisabled={isDisabled}
              />
            );
          })}
        </SimpleGrid>
        <VStack spacing="8px" align="left" maxW="600px">
          <Text fontWeight="500" fontSize="md">
            Monitoring Session Partners
          </Text>
          <Text>
            If you completed this monitoring session as a group, only one member should submit this
            form.
            {/* Added Partners will be notified when this monitor log is submitted for review. */}
          </Text>
          <ReactHookFormSelect
            name="sessionPartners"
            options={partnerSelectOptions}
            optionKey="_id"
            isDisabled={isDisabled}
            isMulti
            placeholder="Search by name or email..."
            closeMenuOnSelect={false}
            size="md"
            menuPosition="fixed"
          />
        </VStack>
      </VStack>
    </div>
  );
}

GeneralInfoTab.defaultProps = {
  isDisabled: false,
  showHeader: true,
  assignedSegments: [],
  monitorPartners: [],
  isTemplate: false,
};

GeneralInfoTab.propTypes = {
  assignedSegments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      segmentId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  monitorPartners: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ),
  isDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
  isTemplate: PropTypes.bool,
};

export default GeneralInfoTab;
