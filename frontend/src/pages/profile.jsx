import { useState, useEffect } from 'react';
import { Container, Box, Text, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Profile = () => {
	const [user, setUser] = useState({ data: { firstname: '', lastname: '' } });
	const navigator = useNavigate();
	const toast = useToast();

	const userDetails = JSON.parse(localStorage.getItem('userDetails'));

	const BaseURL = 'http://localhost:8000/user/profile';
	axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

	useEffect(() => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userDetails.access_token}`,
			},
		};

		axios
			.get(BaseURL, config)
			.then(response => {
				console.log(response.data);
				setUser(response.data);
			})
			.catch(err => {
				toast({ title: 'Please Login To Continue!' });
				navigator('/');
			});
	}, []);

	const logoutHandler = () => {
		localStorage.clear();
		toast({
			title: 'Logout Sucessfull',
			position: 'top',
			duration: '2000',
		});
		navigator('/');
	};

	const statesHandler = () => {
		navigator('/states');
	};
	return (
		<Container centerContent>
			<Box
				d="flex"
				justifyContent="center"
				p="3"
				bg={'white'}
				m="40px 0 15px 0"
				w="50%"
				borderRadius="lg"
				borderColor="white"
			>
				<Text fontSize="2xl" fontFamily="Work Sans" color="black">
					User Profile
				</Text>
			</Box>
			<Box
				p="3"
				bg={'white'}
				m="40px 0 15px 0"
				w="70%"
				borderRadius="lg"
				borderColor="white"
				maxH="70vh"
			>
				<Text>
					<b>Email: </b>
					{user.email}
				</Text>
				<Button
					mt="30px"
					colorScheme="twitter"
					variant="outline"
					onClick={logoutHandler}
				>
					Logout
				</Button>
				<Button
					mt="30px"
					ml={'10px'}
					colorScheme={'twitter'}
					variant={'outline'}
					onClick={statesHandler}
				>
					States
				</Button>
			</Box>
		</Container>
	);
};

export default Profile;
