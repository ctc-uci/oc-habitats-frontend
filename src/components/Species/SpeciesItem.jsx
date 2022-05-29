/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Text, Menu, MenuButton, MenuList, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import EditSpeciesModal from './EditSpeciesModal';
import DeleteSpeciesModal from './DeleteSpeciesModal';

const SpeciesItem = ({ specie, index, searchItem, col, editSpecies, deleteSpecies }) => {
  // this is hardcoded to be false change with context
  const isAdmin = true;
  return (
    <div draggableId={specie} index={index}>
      <Menu>
        <MenuButton
          as={Button}
          borderColor="#CBD5E0"
          borderWidth="1px"
          borderRadius="6px"
          pl=".75em"
          w="100%"
          bgColor={searchItem === specie.pre ? 'skyblue' : 'white'}
        >
          <Text fontSize="1em" fontWeight={450} color="#2D3748" p=".5em">
            {specie.name}
          </Text>
        </MenuButton>
        {col === 'predators' && isAdmin && (
          <MenuList>
            <>
              <EditSpeciesModal
                editSpecies={editSpecies}
                specie={specie}
                predOrSpecies="Predator"
              />
              <DeleteSpeciesModal
                deleteSpecies={deleteSpecies}
                specie={specie}
                predOrSpecies="Predator"
              />
            </>
          </MenuList>
        )}
        {col !== 'predators' && isAdmin && (
          <MenuList>
            <>
              <EditSpeciesModal editSpecies={editSpecies} specie={specie} predOrSpecies="Species" />
              <DeleteSpeciesModal
                deleteSpecies={deleteSpecies}
                specie={specie}
                predOrSpecies="Species"
              />
            </>
          </MenuList>
        )}
      </Menu>
    </div>
  );
};

SpeciesItem.propTypes = {
  specie: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  searchItem: PropTypes.string.isRequired,
  col: PropTypes.string.isRequired,
  editSpecies: PropTypes.func.isRequired,
  deleteSpecies: PropTypes.func.isRequired,
};

export default SpeciesItem;
