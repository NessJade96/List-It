import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import {LOGIN_USER} from '../utils/mutations';
import {NavLink} from 'react-router-dom';
import Nav from './Nav';

//Styled Components
import {Button} from './Button';
import {Form} from './Form';
import {Input} from './Input';
import {H3} from './H3';

const LoginForm = () => {
	const [userFormData, setUserFormData] = useState({email: '', password: ''});

	const [loginUser] = useMutation(LOGIN_USER);

	const handleInputChange = (event) => {
		const {name, value} = event.target;
		setUserFormData({...userFormData, [name]: value});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const res = await loginUser({variables: userFormData});

			Auth.login(res.data.login.token);
		} catch (err) {
			console.error(err, 'ERROR logging in');
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
			<H3 primary>Login</H3>
			<H3>Don't have an account and want to join today?</H3>
			<NavLink to="/signup" exact="true">
				<Button style={{margin: '0 0 1rem 1.5rem'}}>Signup</Button>
			</NavLink>
			<Form onSubmit={handleFormSubmit}>
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
					placeholder="Enter password"
					onChange={handleInputChange}
					value={userFormData.password}
					name="password"
					required
				/>
				<Button type="submit">Login</Button>
			</Form>
		</>
	);
};

export default LoginForm;
