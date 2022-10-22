import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

// Styled Components
import {Form} from './Form';
import {Input} from './Input';
import {Button} from './Button';
import {H3} from './H3';

import {ADD_GROCERY_ITEM} from '../utils/mutations';

export default function GroceryItemForm(props) {
	const {id} = useParams();
	const [addGroceryItem] = useMutation(ADD_GROCERY_ITEM);

	const [text, setText] = useState(props.edit?.text ?? '');
	const [amount, setAmount] = useState(props.edit?.amount ?? '');
	const [measurement, setMeasurement] = useState(props.edit?.measurement ?? '');

	const handleChange = (e) => {
		if (e.target.name === 'text') {
			setText(e.target.value);
		} else if (e.target.name === 'amount') {
			setAmount(e.target.value);
		} else if (e.target.name === 'measurement') {
			setMeasurement(e.target.value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await addGroceryItem({
				variables: {
					addGroceryItemInput: {
						groceryListId: id,
						itemName: text,
						amount: Number(amount),
						measurement,
					},
				},
			});
			console.log('Created grocery item');
		} catch (err) {
			console.log(err);
		}

		setText('');
		setMeasurement('');
		setAmount('');
		props.onSubmit();
	};

	// Check to see if "edit" prop exists. If not, render the normal form
	// If the prop "edit" exists, we know to render the update form instead
	return !props.edit ? (
		<div>
			<Form onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder="+ Add item"
					value={text}
					name="text"
					onChange={handleChange}
				/>
				<Input
					type="number"
					placeholder="How many?"
					value={amount}
					name="amount"
					onChange={handleChange}
				/>
				<Input
					type="text"
					placeholder="measurement?"
					value={measurement}
					name="measurement"
					onChange={handleChange}
				/>
				<Button>Add list item</Button>
			</Form>
		</div>
	) : (
		<div>
			<H3>Updating: {props.edit.text}</H3>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					props.onSubmit({
						_id: props.edit?._id,
						text,
						amount,
						measurement,
					});
				}}
			>
				<Input type="text" value={text} name="text" onChange={handleChange} />
				<Input
					type="number"
					value={amount}
					name="amount"
					onChange={handleChange}
				/>
				<Input
					type="text"
					value={measurement}
					name="measurement"
					onChange={handleChange}
				/>
				<Button>Update</Button>
			</Form>
		</div>
	);
}
