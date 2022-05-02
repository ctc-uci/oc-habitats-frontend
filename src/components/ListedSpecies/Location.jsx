import { InfoIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { React } from 'react';
import { useFormContext } from 'react-hook-form';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import footNotes from './FootNotes';

const Location = () => {
  const { register, watch, setValue, getValues } = useFormContext();

  const totalAdults = watch('totalAdults') || 0;
  const totalFledges = watch('totalFledges') || 0;
  const totalBirds = totalAdults + totalFledges;

  const createGPS = () => {
    let inputs;
    if (totalBirds > 4) {
      inputs = ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right'];
    } else {
      inputs = [''];
    }
    return inputs.map((position, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <GridItem key={`GPS${i}`}>
          <FormControl>
            <FormLabel>
              {`GPS${position === '' ? '' : ` (${position})`}`}
              <HStack w="100%">
                {[
                  ['latitude', 'N'],
                  ['longitude', 'W'],
                ].map(([type, char]) => (
                  <Input
                    key={type + char}
                    as={IMaskInput}
                    mask={`${char} 00[0] 00[0].0[0][0]`}
                    lazy={false}
                    onAccept={value => setValue(`gps[${i}].${type}`, value, { shouldDirty: true })}
                    defaultValue={getValues(`gps[${i}].${type}`)}
                    placeholderChar="-"
                  />
                ))}
              </HStack>
              <Text color="gray.500">DMS Format Example: N33 42.239 / W118 03.395</Text>
            </FormLabel>
          </FormControl>
        </GridItem>
      );
    });
  };

  return (
    <CollapsibleSection title="Location">
      <Grid templateColumns="repeat(2, 1fr)" w="100%" gap="4">
        {createGPS()}
        <GridItem colSpan="2">
          <FormControl>
            <FormLabel>
              <Flex justify="space-between" aling="center">
                Cross Street/Towers
                <Tooltip label={footNotes.streets} fontSize="md">
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <Input placeholder="Cross Street Names" {...register('crossStreet')} />
            </FormLabel>
          </FormControl>
        </GridItem>
      </Grid>
    </CollapsibleSection>
  );
};

Location.propTypes = {
  totalBirds: PropTypes.number.isRequired,
};
export default Location;
