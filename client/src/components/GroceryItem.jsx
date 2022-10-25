import React, {useState} from 'react';
import GroceryItemForm from './GroceryItemForm';
import {Icons} from './Icons';
import {useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';

import {GET_GROCERY_LIST} from '../utils/queries';
import {UPDATE_GROCERY_ITEM} from '../utils/mutations';
import {REMOVE_GROCERY_ITEM} from '../utils/mutations';

// Styled Components
import styled from 'styled-components';

const GroceryRow = styled.div`
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
	const {groceryItem} = props;

	const {id} = useParams();

	const {refetch} = useQuery(GET_GROCERY_LIST, {
		variables: {id},
	});
	const [removeItem] = useMutation(REMOVE_GROCERY_ITEM);
	const [updateGroceryItem] = useMutation(UPDATE_GROCERY_ITEM);

	const handleRemoveItem = async () => {
		try {
			await removeItem({
				variables: {
					removeGroceryItemId: groceryItem._id,
					removeGroceryItemGroceryListId: id,
				},
			});
			refetch();
		} catch (err) {
			console.log(err);
		}
	};

	const editGroceryListItem = async (groceryItem, id) => {
		const {_id, text, amount, measurement} = groceryItem;
		try {
			await updateGroceryItem({
				variables: {
					updateGroceryItemInput: {
						groceryListId: id,
						_id,
						itemName: text,
						amount: Number(amount),
						measurement,
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	const [edit, setEdit] = useState({
		_id: null,
	});

	const submitUpdate = (text) => {
		editGroceryListItem(text, id);
		setEdit({_id: null, text: '', amount: '', measurement: ''});
		refetch();
	};

	if (edit._id) {
		return <GroceryItemForm edit={edit} onSubmit={submitUpdate} />;
	}

	return (
		<GroceryRow key={groceryItem._id}>
			<div>
				{groceryItem.itemName} {groceryItem.amount} {groceryItem.measurement}
			</div>
			<div style={{display: 'flex'}}>
				<Icons
					onClick={() =>
						setEdit({
							_id: groceryItem._id,
							text: groceryItem.itemName,
							amount: groceryItem.amount,
							measurement: groceryItem.measurement,
						})
					}
				>
					✎
				</Icons>
				<Icons onClick={handleRemoveItem}>✗</Icons>
			</div>
		</GroceryRow>
	);
}

export default GroceryItem;
