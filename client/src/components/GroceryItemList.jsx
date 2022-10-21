import React, {useState} from 'react';
import GroceryItemForm from './GroceryItemForm';
import GroceryItem from './GroceryItem';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';

import {GET_GROCERY_LIST} from '../utils/queries';

export default function GroceryItemList() {
	const {id} = useParams();
	const {loading, data} = useQuery(GET_GROCERY_LIST, {variables: {id}});

	const groceryList = data?.groceryList || {};
	const listName = groceryList.listName;
	const groceryItems = groceryList.groceryItems;

	return (
		<>
			<GroceryItemForm />
			{groceryItems?.map((item) => {
				return (
					<GroceryItem
						groceryItem={item}
						completeGroceryItem={completeGroceryItem}
						removeGroceryItem={removeGroceryItem}
						editGroceryListItem={editGroceryListItem}
					/>
				);
			})}
		</>
	);
}
