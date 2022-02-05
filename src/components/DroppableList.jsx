// import React, { useEffect } from 'react';
// import { Droppable } from 'react-beautiful-dnd';
// import PropTypes from 'prop-types';
// import { Container, Heading } from '@chakra-ui/react';
// import DraggableItem from '../components/DraggableItem'

// const DroppableList = ({ name, species, colID }) => {
//   return (
//     <Container border="2px" borderColor="black">
//       <Heading>{name}</Heading>
//       <Droppable droppableId={colID}>
//         {provided => (<div innerRef={provided.innerRef} {...provided.droppableProps}>
//             {species.map(specie, index) =>
//                 (<DraggableItem key={index} specie={specie} index={index}/>)
//             }
//         </div>)}
//         {provided.placeholder}
//       </Droppable>
//     </Container>
//   );
// };

// DroppableList.defaultProps = {
//   name: PropTypes.string,
//   species: PropTypes.arrayOf(PropTypes.string),
//   colID: PropTypes.string,
// };

// DroppableList.propTypes = {
//   name: PropTypes.string,
//   species: PropTypes.arrayOf(PropTypes.string),
//   colID: PropTypes.string,
// };

// export default DroppableList;
