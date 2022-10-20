import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {NavLink} from 'react-router-dom';

// Importing queries and mutaitons
import {ADD_GROCERY_LIST} from '../utils/mutations';
import {GET_ME} from '../utils/queries';

//Styled Components
import {Button} from './Button';
import {Form} from './Form';
import {H3} from './H3';
import {Input} from './Input';
import {GroceryRow} from './GroceryRow';

export default function YourLists() {
	const {data, refetch, loading} = useQuery(GET_ME);

	const usersLists = data?.me?.savedGroceryLists ?? [];

	if (loading) {
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
						{list}
						<Button>✖</Button>
					</GroceryRow>
				);
			})}
		</>
	);
}
