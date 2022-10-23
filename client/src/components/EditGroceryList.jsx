import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';

// Importing queries and mutaitons
import {UPDATE_GROCERY_LIST} from '../utils/mutations';
import {GET_GROCERY_LIST} from '../utils/queries';

//Styled Components
import {Button} from './Button';
import {Form} from './Form';
import {H3} from './H3';
import {Input} from './Input';

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
`;

export default function EditGroceryList() {
	const {id} = useParams();

	const [newUser, setNewUser] = useState('');

	const [updateGroceryList] = useMutation(UPDATE_GROCERY_LIST);
	const {data, refetch} = useQuery(GET_GROCERY_LIST, {
		variables: {id},
	});

	const groceryList = data?.groceryList || {};
	const usersLists = groceryList?.users;

	const handleInputChange = (event) => {
		if (event.target.name === 'newUser') {
			setNewUser(event.target.value);
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await updateGroceryList({
				variables: {input: {groceryListId: id, email: newUser}},
			});
			console.log('Updated Grocery List');
		} catch (err) {
			console.log(err);
		}

		setNewUser('');
	};
	refetch();

	return (
		<>
			<Form onSubmit={handleFormSubmit}>
				<H3>Add a user to share your list:</H3>
				<Input
					type="text"
					placeholder="Enter their email"
					value={newUser}
					name="newUser"
					onChange={handleInputChange}
					required
				/>
				<Button type="submit">Share</Button>
			</Form>
			<H3>
				{usersLists?.length
					? `The ${usersLists.length} ${
							usersLists.length === 1 ? 'user that has' : 'users that have'
					  } access to this list:`
					: `you have not share this list with anyone`}
			</H3>
			{usersLists?.map((user) => {
				return (
					<List key={user._id}>
						<StyledLink key={user._id} to={`/${user._id}`}>
							{user.email}
						</StyledLink>
					</List>
				);
			})}
		</>
	);
}
