import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {useNavigate} from 'react-router-dom';

// Importing queries and mutaitons
import {UPDATE_GROCERY_LIST} from '../utils/mutations';

//Styled Components
import {Button} from './Button';
import {Form} from './Form';
import {H3} from './H3';
import {Input} from './Input';

export default function EditGroceryList() {
	const [listName, setListName] = useState('');

	const [updateGroceryList] = useMutation(UPDATE_GROCERY_LIST);

	const handleInputChange = (event) => {
		if (event.target.name === 'listName') {
			setListName(event.target.value);
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await updateGroceryList({variables: {users: {_id: userId}}});
			console.log('Updated Grocery List');
		} catch (err) {
			console.log(err);
		}

		setListName('');
		navigate('/yourlists');
	};

	const navigate = useNavigate();

	return (
		<>
			<Form onSubmit={handleFormSubmit}>
				<H3>Add another user to your list!</H3>
				<Input
					type="text"
					placeholder="Enter their "
					value={listName}
					name="listName"
					onChange={handleInputChange}
					required
				/>
				<Button type="submit">Create</Button>
			</Form>
		</>
	);
}
