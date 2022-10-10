import React, {useState} from 'react';
import GroceryItemForm from './GroceryItemForm';

function GroceryItem(props) {
	const {groceryItems} = props;
	const [edit, setEdit] = useState({
		id: null,
		value: '',
		eagerness: '',
	});

	console.log(props);

	const submitUpdate = (value) => {
		props.editGroceryItem(edit.id, value);
		setEdit({id: null, value: '', eagerness: ''});
	};

	console.log(groceryItems);
	if (edit.id) {
		return <GroceryItemForm edit={edit} onSubmit={submitUpdate} />;
	}

	return groceryItems.map((item, i) => (
		<div
			className={
				item.isComplete
					? `groceryItem-row complete ${item.eagerness}`
					: `groceryItem-row ${item.eagerness}`
			}
			key={i}
		>
			<div key={item.id} onClick={() => props.completeGroceryItem(item.id)}>
				{item.text}
			</div>
			<div className="icons">
				{console.log(item)}
				<p
					onClick={() =>
						setEdit({id: item.id, value: item.text, eagerness: item.eagerness})
					}
				>
					{' '}
					✏️
				</p>
				<p onClick={() => props.removeGroceryItem(item.id)}> 🗑️</p>
			</div>
		</div>
	));
}

export default GroceryItem;
