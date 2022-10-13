import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import {ADD_USER} from '../utils/mutations';
import {NavLink} from 'react-router-dom';

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
	// set state for form validation
	// const [validated] = useState(false);  //BOOTSTRAP - NEED TO CONVERT

	// set state for alert
	// const [showAlert, setShowAlert] = useState(false); //BOOTSTRAP - NEED TO CONVERT

	const [addUser] = useMutation(ADD_USER);

	const handleInputChange = (event) => {
		const {name, value} = event.target;
		setUserFormData({...userFormData, [name]: value});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// // check if form has everything (as per react-bootstrap docs)
		// const form = event.currentTarget;
		// if (form.checkValidity() === false) {
		// 	event.preventDefault();
		// 	event.stopPropagation();
		// 	return;
		// }

		try {
			const {data} = await addUser({variables: userFormData});
			console.log('added user');
			Auth.login(data.addUser.token);
		} catch (err) {
			console.error(err);
			// setShowAlert(true);
		}

		setUserFormData({
			username: '',
			email: '',
			password: '',
		});
	};

	return (
		<>
			<H3 primary>Signup to List It!</H3>
			<H3>
				To become a user and access your lists from anywhere, enter your details
				below:
			</H3>
			<H3>Already have an account?</H3>
			<NavLink to="/login" exact>
				<Button style={{margin: '0 0 1rem 1.5rem'}} primary>
					Login
				</Button>
			</NavLink>
			<Form onSubmit={handleFormSubmit}>
				<Input
					type="text"
					placeholder="Enter username"
					value={userFormData.username}
					name="username"
					onChange={handleInputChange}
				/>
				<Input
					type="email"
					placeholder="Enter your email"
					value={userFormData.email}
					onChange={handleInputChange}
					name="email"
				/>
				<Input
					type="password"
					placeholder="Enter a password?"
					onChange={handleInputChange}
					value={userFormData.password}
					name="password"
				/>
				<Button primary>Signup</Button>
			</Form>
		</>
	);
};

export default SignupForm;
