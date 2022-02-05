import React, { useState } from 'react';
import {
	Text,
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Divider,
} from '@chakra-ui/react';
import Papa from 'papaparse';

const FileUploadPage = ({ setStates }) => {
	const [selectedFile, setSelectedFile] = useState();

	const submitHandler = e => {
		Papa.parse(selectedFile, {
			complete: result => {
				console.log(result);
				setStates(result.data);
			},
			header: true,
		});
	};

	const fileChangeHandler = e => {
		setSelectedFile(e.target.files[0]);
	};

	return (
		<VStack spacing={'20px'}>
			<Text fontSize={'5xl'} fontWeight={'semibold'}>
				Enter CSV File
			</Text>
			<FormControl display={'inline'} alignContent="center" padding={2}>
				<Input
					variant="outline"
					accept=".csv"
					type="file"
					margin={10}
					padding={0.5}
					onChange={fileChangeHandler}
				></Input>
				<Button onClick={submitHandler}>Submit</Button>
			</FormControl>
			<Divider></Divider>
		</VStack>
	);
};

export default FileUploadPage;
