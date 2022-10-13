import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import {LOGIN_USER} from '../utils/mutations';
import {NavLink} from 'react-router-dom';

//Styled Components
import {Button} from './Button';
import {Form} from './Form';
import {Input} from './Input';
import {H3} from './H3';

const LoginForm = () => {
	// const [userFormData, setUserFormData] = useState({email: '', password: ''});
	// const [validated] = useState(false);
	// const [showAlert, setShowAlert] = useState(false);

	// const [loginUser] = useMutation(LOGIN_USER);

	// const handleInputChange = (event) => {
	// 	const {name, value} = event.target;
	// 	setUserFormData({...userFormData, [name]: value});
	// };

	// const handleFormSubmit = async (event) => {
	// 	event.preventDefault();

	// 	// check if form has everything (as per react-bootstrap docs)
	// 	const form = event.currentTarget;

	// 	if (form.checkValidity() === false) {
	// 		event.preventDefault();
	// 		event.stopPropagation();
	// 		return;
	// 	}

	// 	try {
	// 		const res = await loginUser({variables: userFormData});

	// 		Auth.login(res.data.login.token);
	// 	} catch (err) {
	// 		console.error(err);
	// 		setShowAlert(true);
	// 	}

	// 	setUserFormData({
	// 		username: '',
	// 		email: '',
	// 		password: '',
	// 	});
	// };

	return (
		<>
			<H3 primary>Login to List It!</H3>
			<H3>Don't have an account?</H3>
			<NavLink to="/signup" exact="true">
				<Button style={{margin: '0 0 1rem 1.5rem'}} primary>
					Signup
				</Button>
			</NavLink>
			<Form>
				<Input
					type="email"
					placeholder="Enter your email"
					// value={email}
					name="email"
					required
				/>
				<Input
					type="password"
					placeholder="Enter a password?"
					// value={password}
					name="password"
					required
				/>
				<Button primary>Login</Button>
			</Form>
		</>
	);
};

export default LoginForm;
