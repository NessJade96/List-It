import React from 'react';
import {useMutation, useQuery} from '@apollo/client';

// Importing queries and mutaitons
import {GET_ME} from '../utils/queries';
import {REMOVE_GROCERY_LIST} from '../utils/mutations';

//Styled Components
import {Button} from './Button';
import {H3} from './H3';
import {GroceryRow} from './GroceryRow';

export default function YourLists() {
	const user = useQuery(GET_ME);
	const refetch = user.refetch;
	const usersLists = user.data?.me?.savedGroceryLists ?? [];

	// This refreshes the users saved grocery lists on page load.
	refetch();

	const [removeList] = useMutation(REMOVE_GROCERY_LIST);

	const handleRemoveList = async (listId) => {
		try {
			await removeList({
				variables: {
					removeGroceryListId: listId,
				},
			});
		} catch (err) {
			console.log('something went wrong :(');
			console.error(err);
		}
	};

	if (user.loading) {
		return <H3>loading your lists</H3>;
	}

	return (
		<>
			<H3>
				{usersLists.length
					? `Viewing ${usersLists.length} saved ${
							usersLists.length === 1 ? 'list' : 'lists'
					  }:`
					: `you have no saved lists`}
			</H3>

			{usersLists.map((list) => {
				return (
					<GroceryRow key={list._id}>
						{list.listName}
						<Button onClick={() => handleRemoveList(list._id)}>✖</Button>
					</GroceryRow>
				);
			})}
		</>
	);
}
