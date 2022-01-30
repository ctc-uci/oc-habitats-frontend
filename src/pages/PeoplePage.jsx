import { React } from 'react';
import { VStack } from '@chakra-ui/react';
//  import PeopleTable from '../components/Table/Table';
/*  const columns = React.useMemo(
  () => [
    {
      Header: "Name",
      accessor: (d) => `${d.name} ${d.email}`,
      icon: <Icon as={BsFillPersonFill} mr={1} />,
      Cell: ({ cell: { value } }) => <Name value={value} />
    },
    {
      Header: "Active Status",
      accessor: "activeStatus",
      icon: <Icon as={BsFillClockFill} mr={1} />,
      Cell: ({ cell: { value } }) => <ActiveStatus value={value} />
    },
    {
      Header: "Training Status",
      accessor: "trainingStatus",
      icon: <Icon as={AiFillTag} mr={1} />,
      Cell: ({ cell: { value } }) => <TrainingStatus value={value} />
    }
  ],
  []
);  */

//  const data = React.useMemo(() => makeRows, []);
const PeoplePage = () => {
  return (
    <VStack spacing="72px" align="left">
      <div>Table</div>
    </VStack>
    //  <PeopleTable columns={columns} data={data}></PeopleTable>
  );
};
export default PeoplePage;
