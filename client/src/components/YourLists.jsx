import React from 'react';
import {useQuery} from '@apollo/client';

// Importing queries and mutaitons
import {GET_ME} from '../utils/queries';

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
						<Button>✖</Button>
					</GroceryRow>
				);
			})}
		</>
	);
}
