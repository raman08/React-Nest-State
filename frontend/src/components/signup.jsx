import { useState } from 'react';
import {
	VStack,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Button,
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const Signup = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [cpassword, setCPassword] = useState();

	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);

	const toast = useToast();

	const handelPassClick = () => setShow(!show);

	const BaseURL = 'http://localhost:8000/auth/signup';
	// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

	const submitHandler = async () => {
		setLoading(true);

		if (!email || !password || !cpassword) {
			toast({
				title: 'Please Fill All the Fields',
				status: 'error',
				position: 'top',
			});
			setLoading(false);
			return;
		}

		if (password !== cpassword) {
			toast({
				title: 'Password are not same',
				status: 'error',
				position: 'top',
			});
			setLoading(false);
			return;
		}

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.post(
				BaseURL,
				{
					email: email,
					password: password,
					cpassword: cpassword,
				},
				config
			);

			console.log(data);
			toast({
				title: 'User Created Sucessfully!',
				status: 'success',
				position: 'top',
			});
			setLoading(false);
		} catch (err) {
			if (err.response) {
				if (err.response.status === 400) {
					for (var i = 0; i < err.response.data.errors.length; i++) {
						toast({
							title: err.response.data.errors[i].msg,
							status: 'error',
							duration: '3000',
							position: 'top',
						});
					}
				} else {
					toast({
						title: 'Some Error Occour',
						status: 'info',
						duration: '3000',
						position: 'top',
					});
				}
			}

			setLoading(false);
		}
	};

	return (
		<VStack spacing="5px">
			<FormControl id="email" isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					placeholder="jhonwatts@gmail.com"
					onChange={e => setEmail(e.target.value)}
				></Input>
			</FormControl>

			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						placeholder="********"
						onChange={e => setPassword(e.target.value)}
					></Input>
					<InputRightElement w="4.5rem">
						<Button size="sm" onClick={handelPassClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id="cpassword" isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						placeholder="********"
						onChange={e => setCPassword(e.target.value)}
					></Input>
					<InputRightElement w="4.5rem">
						<Button size="sm" onClick={handelPassClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button
				colorScheme={'blue'}
				style={{ marginTop: '15px' }}
				onClick={submitHandler}
				isLoading={loading}
			>
				SignUp
			</Button>
		</VStack>
	);
};

export default Signup;
