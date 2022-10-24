import React from 'react';
import GroceryItemForm from './GroceryItemForm';
import GroceryItem from './GroceryItem';
import {useParams} from 'react-router-dom';
import Nav from './Nav';
import {useQuery} from '@apollo/client';
import {Link} from 'react-router-dom';
import {Button} from './Button';

import {GET_GROCERY_LIST} from '../utils/queries';

export default function GroceryItemList() {
	const {id} = useParams();

	const {data, refetch} = useQuery(GET_GROCERY_LIST, {
		variables: {id},
	});

	const groceryList = data?.groceryList || {};
	const groceryItems = groceryList.groceryItems;

	return (
		<>
			<Nav header={groceryList.listName} />
			<GroceryItemForm onSubmit={refetch} />
			{groceryItems?.map((item) => {
				return <GroceryItem key={item._id} groceryItem={item} />;
			})}
			<Link to={`/yourlists`}>
				<Button item>Back</Button>
			</Link>
		</>
	);
}
