import React, {useState} from 'react';
import {Form} from './Form';
import {Input} from './Input';
import {Button} from './Button';
import {H3} from './H3';

export default function GroceryItemForm(props) {
	const [input, setInput] = useState(props.edit?.value ?? '');
	const [amount, setAmount] = useState(props.edit?.amount ?? '');
	const [measurement, setMeasurement] = useState(props.edit?.measurement ?? '');

	const handleSubmit = (e) => {
		e.preventDefault();

		props.onSubmit({
			id: Math.random(Math.floor() * 1000),
			text: input,
			amount: amount,
			measurement: measurement,
		});
		// empty inputs after submit
		setInput('');
		setMeasurement('');
		setAmount('');
	};

	// Maybe change this into a try/catch switch/case?
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
				<Button primary>Add list item</Button>
			</Form>
		</div>
	) : (
		<div>
			<H3>Updating: {props.edit.value}</H3>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					props.onSubmit({
						id: props.edit?.id,
						value: input,
						amount,
						measurement,
					});
				}}
			>
				<Input type="text" value={input} name="text" onChange={handleChange} />
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
				<Button primary>Update</Button>
			</Form>
		</div>
	);
}
