import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import {ADD_USER} from '../utils/mutations';
import {NavLink} from 'react-router-dom';
import Nav from './Nav';

//Styled Components
import {Button} from './Button';
import {Form} from './Form';
import {Input} from './Input';
import {H3} from './H3';

const SignupForm = () => {
	// set initial form state
	const [userFormData, setUserFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const [addUser, args] = useMutation(ADD_USER);

	const handleInputChange = (event) => {
		const {name, value} = event.target;
		setUserFormData({...userFormData, [name]: value});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const {data} = await addUser({variables: userFormData});
			console.log('added user');
			Auth.login(data.addUser.token);
		} catch (err) {
			console.error(err);
		}

		setUserFormData({
			username: '',
			email: '',
			password: '',
		});
	};

	return (
		<>
			<Nav />
			<H3 primary>Signup today!</H3>
			<H3>
				To become a user and access your lists from anywhere, enter your details
				below:
			</H3>
			<H3>Already with us?</H3>
			<NavLink to="/login" exact="true">
				<Button style={{margin: '0 0 1rem 1.5rem'}}>Login</Button>
			</NavLink>
			<Form onSubmit={handleFormSubmit}>
				<Input
					type="text"
					placeholder="Enter username"
					value={userFormData.username}
					name="username"
					onChange={handleInputChange}
					required
				/>
				<Input
					type="email"
					placeholder="Enter your email"
					value={userFormData.email}
					onChange={handleInputChange}
					name="email"
					required
				/>
				<Input
					type="password"
					placeholder="Enter a new password"
					onChange={handleInputChange}
					value={userFormData.password}
					name="password"
					required
				/>
				<Button type="submit">Signup</Button>
			</Form>
		</>
	);
};

export default SignupForm;
