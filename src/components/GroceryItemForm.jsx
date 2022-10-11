import React, {useState} from 'react';
import {Form} from './Form';
import {Input} from './Input';
import {Button} from './Button';

export default function GroceryItemForm(props) {
	const [input, setInput] = useState('');
	const [amount, setAmount] = useState('');
	const [measurement, setMeasurement] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// empty inputs after submit
		setInput('');
		setMeasurement('');
		setAmount('');
		setEagerness('');
	};

	// Maybe change this into a try/catch?
	const handleChange = (e) => {
		if (e.target.name === 'text') {
			setInput(e.target.value);
		} else if (e.target.name === 'amount') {
			setAmount(e.target.value);
		} else if (e.target.name === 'measurement') {
			setMeasurement(e.target.value);
		}
	};

	// Check to see if "edit" prop exists. If not, render the normal form
	// If the prop "edit" exists, we know to render the update form instead
	return !props.edit ? (
		<div>
			<Form onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder="+ Add item"
					value={input}
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
				<Button list>Add list item</Button>
			</Form>
		</div>
	) : (
		<div>
			<h3>Update engtry: {props.edit.value}</h3>
			<Form onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder={props.edit.value}
					value={input}
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
				<Button list>Update</Button>
			</Form>
		</div>
	);
}
