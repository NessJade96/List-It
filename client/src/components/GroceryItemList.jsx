import React from 'react';
import GroceryItemForm from './GroceryItemForm';
import GroceryItem from './GroceryItem';
import {useParams} from 'react-router-dom';
import Nav from './Nav';
import {useQuery} from '@apollo/client';

import {GET_GROCERY_LIST} from '../utils/queries';

export default function GroceryItemList() {
	const {id} = useParams();

	const {loading, data, error, refetch} = useQuery(GET_GROCERY_LIST, {
		variables: {id},
	});

	const groceryList = data?.groceryList || {};
	const listName = groceryList.listName;
	const groceryItems = groceryList.groceryItems;

	return (
		<>
			<Nav header={groceryList.listName} />
			<GroceryItemForm onSubmit={refetch} />
			{groceryItems?.map((item) => {
				return <GroceryItem key={item._id} groceryItem={item} />;
			})}
		</>
	);
}
