import React, {useState} from 'react';
import GroceryItemForm from './GroceryItemForm';
import {Icons} from './Icons';
import {useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';

import {GET_GROCERY_LIST} from '../utils/queries';

// Styled Components
import styled, {css} from 'styled-components';

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

import {UPDATE_GROCERY_ITEM} from '../utils/mutations';
import {REMOVE_GROCERY_ITEM} from '../utils/mutations';

function GroceryItem(props) {
	const {groceryItem} = props;

	const {id} = useParams();

	const {refetch} = useQuery(GET_GROCERY_LIST, {
		variables: {id},
	});
	const [removeItem] = useMutation(REMOVE_GROCERY_ITEM);

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

	// console.log(
	// 	'🚀 ~ file: GroceryItem.jsx ~ line 9 ~ GroceryItem ~ groceryItem',
	// 	groceryItem
	// );

	//   const [updateGroceryItem] = useMutation(UPDATE_GROCERY_ITEM)

	//   const removeGroceryItem = async (_id)=>{
	//     try {
	//       await updateGroceryItem({variables: {
	//         updateGroceryItemInput: {
	//           groceryListId,
	//           _id,
	//           itemName: text,
	//           amount,
	//           measurement
	//         }
	//       }})
	//     }

	//   }

	// OLD CODE - WILL NEED TO REDO FOR UPDATING LIST ITEMS
	// const [edit, setEdit] = useState({
	// 	id: null,
	// 	text: '',
	// 	amount: '',
	// 	measurement: '',
	// });

	// const submitUpdate = (text) => {
	// 	props.editGroceryListItem(text);
	// 	setEdit({id: null, text: '', amount: '', measurement: ''});
	// };

	// if (edit.id) {
	// 	return <GroceryItemForm edit={edit} onSubmit={submitUpdate} />;
	// }

	return (
		<GroceryRow key={groceryItem._id}>
			<div>
				{groceryItem.itemName} {groceryItem.amount} {groceryItem.measurement}
			</div>
			<div style={{display: 'flex'}}>
				<Icons
					onClick={() =>
						setEdit({
							id: groceryItem.id,
							text: groceryItem.itemName,
							amount: groceryItem.amount,
							measurement: groceryItem.measurement,
						})
					}
				>
					✎
				</Icons>
				<Icons onClick={handleRemoveItem}>✔</Icons>
			</div>
		</GroceryRow>
	);
}

export default GroceryItem;
