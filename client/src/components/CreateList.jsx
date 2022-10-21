import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {useNavigate} from 'react-router-dom';

// Importing queries and mutaitons
import {ADD_GROCERY_LIST} from '../utils/mutations';

//Styled Components
import {Button} from './Button';
import {Form} from './Form';
import {H3} from './H3';
import {Input} from './Input';

export default function CreateList() {
	const [listName, setListName] = useState('');

	const [addGroceryList, args] = useMutation(ADD_GROCERY_LIST);

	const handleInputChange = (event) => {
		if (event.target.name === 'listName') {
			setListName(event.target.value);
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await addGroceryList({variables: {listName}});
			console.log('Created Grocery List');
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
				<H3>Create a new list!</H3>
				<Input
					type="text"
					placeholder="Enter list name"
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
