import React, {useState} from 'react';
import GroceryItemForm from './GroceryItemForm';
import styled, {css} from 'styled-components';
import {Icons} from './icons';

const GroceryItemRow = styled.div`
	display: flex;
	justify-content: space-between;
	border: 1px solid var(--Gainsboro);
	padding: 0.5rem;
	margin: 0.5rem;
	color: var(--Purple);
	background: var(--Xanadu);
	font-size: 1.5rem;
	place-items: center;
`;

function GroceryItem(props) {
	const {groceryItems} = props;
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

	return groceryItems.map((item, i) => (
		<GroceryItemRow
			className={
				item.isComplete ? `groceryItem-row complete` : `groceryItem-row`
			}
			key={i}
		>
			<div key={item.id} onClick={() => props.completeGroceryItem(item.id)}>
				{item.text} {item.amount} {item.measurement}
			</div>
			<div style={{display: 'flex'}} className="icons">
				<Icons
					onClick={() =>
						setEdit({
							id: item.id,
							text: item.text,
							amount: item.amount,
							measurement: item.measurement,
						})
					}
				>
					✎
				</Icons>
				<Icons onClick={() => props.removeGroceryItem(item.id)}>✔</Icons>
			</div>
		</GroceryItemRow>
	));
}

export default GroceryItem;
