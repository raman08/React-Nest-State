import { Container } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import FileUploadPage from '../components/csv-reader';
import Table from '../components/table';
import { CSVLink } from 'react-csv';

const States = () => {
	const [states, setStates] = useState([]);

	const colums = useMemo(
		() => [
			{ Header: 'State Name', accessor: 'name' },
			{ Header: 'Code', accessor: 'code' },
		],
		[]
	);

	const send_states = useMemo(() => states, [states]);

	const [skipPageReset, setSkipPageReset] = useState(false);

	const updateMyData = (rowIndex, colId, value) => {
		setSkipPageReset(true);

		setStates(old =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[colId]: value,
					};
				}
				return row;
			})
		);
	};
	useEffect(() => setSkipPageReset(true), [states]);
	return (
		<Container style={{ backgroundColor: '' }} maxW={'container.xl'}>
			<FileUploadPage setStates={setStates} />

			<Table
				data={send_states}
				idProperty={'id'}
				columns={colums}
				skipPageReset={skipPageReset}
				updateMyData={updateMyData}
			></Table>
			<Container border={'2px'} m={'10'}>
				<CSVLink data={states}> Download Updated Data</CSVLink>
			</Container>
		</Container>
	);
};

export default States;
