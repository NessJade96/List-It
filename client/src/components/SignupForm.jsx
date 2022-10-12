import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import {ADD_USER} from '../utils/mutations';

//Styled Components
import {Button} from './Button';
import {Form} from './Form';
import {Input} from './Input';
import {H3} from './H3';

const SignupForm = () => {
	// // set initial form state
	// const [userFormData, setUserFormData] = useState({
	// 	username: '',
	// 	email: '',
	// 	password: '',
	// });
	// // set state for form validation
	// const [validated] = useState(false);
	// // set state for alert
	// const [showAlert, setShowAlert] = useState(false);

	// const [addUser] = useMutation(ADD_USER);

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
	// 		const {data} = await addUser({variables: userFormData});
	// 		console.log('added user');
	// 		Auth.login(data.addUser.token);
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
			<H3 primary>Signup to List It!</H3>
			<H3>Enter your details below:</H3>
			<p></p>
			<Form>
				<Input
					type="text"
					placeholder="Enter username"
					// value={username}
					name="username"
				/>
				<Input
					type="email"
					placeholder="Enter your email"
					// value={email}
					name="email"
				/>
				<Input
					type="password"
					placeholder="Enter a password?"
					// value={password}
					name="password"
				/>
				<Button primary>Signup</Button>
			</Form>
		</>
	);
};

export default SignupForm;
