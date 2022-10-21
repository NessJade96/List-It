import React, {useState} from 'react';
import GroceryItemForm from './GroceryItemForm';
import {Icons} from './Icons';

import {GroceryRow} from './GroceryRow';

function GroceryItem(props) {
	const {groceryItem} = props;
	const [edit, setEdit] = useState({
		id: null,
		text: '',
		amount: '',
		measurement: '',
	});

	const submitUpdate = (text) => {
		props.editGroceryListItem(text);
		setEdit({id: null, text: '', amount: '', measurement: ''});
	};

	if (edit.id) {
		return <GroceryItemForm edit={edit} onSubmit={submitUpdate} />;
	}

	return (
		<GroceryRow key={groceryItem.id}>
			<div onClick={() => props.completeGroceryItem(item.id)}>
				{groceryItem.text} {groceryItem.amount} {groceryItem.measurement}
			</div>
			<div style={{display: 'flex'}}>
				<Icons
					onClick={() =>
						setEdit({
							id: groceryItem.id,
							text: groceryItem.text,
							amount: groceryItem.amount,
							measurement: groceryItem.measurement,
						})
					}
				>
					✎
				</Icons>
				<Icons onClick={() => props.removeGroceryItem(groceryItem.id)}>✔</Icons>
			</div>
		</GroceryRow>
	);
}

export default GroceryItem;
