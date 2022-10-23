import {gql} from '@apollo/client';

export const ADD_USER = gql`
	mutation Mutation($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				username
			}
		}
	}
`;

export const ADD_GROCERY_LIST = gql`
	mutation AddGroceryList($listName: String!) {
		addGroceryList(input: {listName: $listName}) {
			listName
			groceryItems {
				_id
				itemName
				amount
				measurement
			}
		}
	}
`;

export const ADD_GROCERY_ITEM = gql`
	mutation AddGroceryItem($addGroceryItemInput: GroceryItemInput!) {
		addGroceryItem(input: $addGroceryItemInput) {
			listName
			groceryItems {
				_id
				itemName
				amount
				measurement
			}
		}
	}
`;
export const REMOVE_GROCERY_ITEM = gql`
	mutation RemoveGroceryItem(
		$removeGroceryItemId: ID!
		$removeGroceryItemGroceryListId: String!
	) {
		removeGroceryItem(
			_id: $removeGroceryItemId
			groceryListId: $removeGroceryItemGroceryListId
		) {
			listName
			groceryItems {
				_id
				itemName
				amount
				measurement
			}
		}
	}
`;

export const REMOVE_GROCERY_LIST = gql`
	mutation RemoveGroceryList($removeGroceryListId: String!) {
		removeGroceryList(_id: $removeGroceryListId) {
			listName
		}
	}
`;

export const UPDATE_GROCERY_LIST = gql`
	mutation UpdateGroceryList($input: UpdateGrocerylistInput!) {
		updateGroceryList(input: $input) {
			listName
			users {
				_id
				username
				email
			}
			users {
				_id
			}
		}
	}
`;

export const UPDATE_GROCERY_ITEM = gql`
	mutation UpdateGroceryItem($updateGroceryItemInput: UpdateGroceryItemInput!) {
		updateGroceryItem(input: $updateGroceryItemInput) {
			_id
			itemName
			amount
			measurement
		}
	}
`;
