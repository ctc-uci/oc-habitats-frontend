/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import axios from 'axios';
// import { Draggable } from 'react-beautiful-dnd';
import { Box, Text, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import EditSpeciesModal from './EditSpeciesModal';

const DraggableItem = ({ specie, index, searchItem, col, editSpecies }) => {
  // const [change, setChange] = useState(true);
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
        {col === 'predators' && (
          <MenuList>
            <EditSpeciesModal editSpecies={editSpecies} specie={specie} />
            <MenuItem color="red">Delete Predator</MenuItem>
          </MenuList>
        )}
        {col !== 'predators' && (
          <MenuList>
            <EditSpeciesModal editSpecies={editSpecies} specie={specie} />
            <MenuItem color="red">Delete Species</MenuItem>
          </MenuList>
        )}
      </Menu>
    </div>
  );
};

DraggableItem.propTypes = {
  specie: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  searchItem: PropTypes.string.isRequired,
  col: PropTypes.string.isRequired,
  editSpecies: PropTypes.func.isRequired,
};

export default DraggableItem;
