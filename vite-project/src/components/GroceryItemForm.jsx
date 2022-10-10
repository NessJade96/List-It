import React, {useState} from 'react';

export default function GroceryItemForm(props) {
	const [input, setInput] = useState('');
	let [eagerness, setEagerness] = useState('');

	const eagernessLevel = ['high', 'medium', 'low'];

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!eagerness) {
			eagerness = 'low';
		}

		props.onSubmit({
			id: Math.random(Math.floor() * 1000),
			text: input,
			eagerness: eagerness,
		});
		setInput('');
		setEagerness('');
	};
	const handleChange = (e) => {
		setInput(e.target.value);
	};

	console.log(props, 'GroceryItemFormProps');
	// Check to see if "edit" prop exists. If not, render the normal form
	// If the prop "edit" exists, we know to render the update form instead
	return !props.edit ? (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Add to your list"
					value={input}
					name="text"
					onChange={handleChange}
				/>
				<div>
					<button className={eagerness}>{eagerness || `Priority`} </button>
					<div>
						<p onClick={() => setEagerness(eagernessLevel[0])}>Must do</p>
						<p onClick={() => setEagerness(eagernessLevel[1])}>Want to do</p>
						<p onClick={() => setEagerness(eagernessLevel[2])}>
							Take it or leave it
						</p>
					</div>
				</div>
				<button>Add list item</button>
			</form>
		</div>
	) : (
		<div>
			<h3>Update engtry: {props.edit.value}</h3>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder={props.edit.value}
					value={input}
					name="text"
					onChange={handleChange}
				/>
				<div>
					<button className={eagerness}>{eagerness || `Priority`}</button>
					<div>
						<p onClick={() => setEagerness(eagernessLevel[0])}>Must do</p>
						<p onClick={() => setEagerness(eagernessLevel[1])}>Want to do</p>
						<p onClick={() => setEagerness(eagernessLevel[2])}>
							Take it or leave it
						</p>
					</div>
				</div>
				<button>Update</button>
			</form>
		</div>
	);
}
