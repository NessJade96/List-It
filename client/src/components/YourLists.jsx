import React from 'react';
import {useMutation, useQuery} from '@apollo/client';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import Nav from './Nav';

// Importing queries and mutaitons
import {GET_ME} from '../utils/queries';
import {REMOVE_GROCERY_LIST} from '../utils/mutations';

//Styled Components
import {Button} from './Button';
import {H3} from './H3';

const List = styled.div`
	display: flex;
	justify-content: space-between;
	border: 1px solid var(--Gainsboro);
	padding: 0.5rem;
	margin: 0.5rem;
	background: var(--Xanadu);
	font-size: 1.5rem;
	place-items: center;
`;

const StyledLink = styled(Link)`
	color: var(--Purple);
	flex-grow: 1;

	&:hover {
		color: var(--Gainsboro);
	}
`;

export default function YourLists() {
	const user = useQuery(GET_ME);
	const refetch = user.refetch;
	const usersLists = user.data?.me?.savedGroceryLists ?? [];

	// This refreshes the users saved grocery lists on page load.
	refetch();
	const [removeList] = useMutation(REMOVE_GROCERY_LIST);

	const handleRemoveList = async (event, listId) => {
		event.stopPropagation();
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
			<Nav header={'Your Lists'} />
			<H3>
				{usersLists.length
					? `Viewing your ${usersLists.length} saved ${
							usersLists.length === 1 ? 'list' : 'lists'
					  }:`
					: `you have no saved lists`}
			</H3>

			{usersLists.map((list) => {
				return (
					<List key={list._id}>
						<StyledLink key={list._id} to={`/${list._id}`}>
							{list.listName}
						</StyledLink>
						<Link to={`/${list._id}/users`}>
							<Button>🔗</Button>
						</Link>
						<Button item onClick={(e) => handleRemoveList(e, list._id)}>
							✖
						</Button>
					</List>
				);
			})}
		</>
	);
}
