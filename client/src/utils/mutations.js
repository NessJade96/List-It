import {gql} from '@apollo/client';

// USER MUTATIONS
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

// GROCERY LIST MUTATIONS
export const ADD_GROCERY_LIST = gql`
	mutation AddGroceryList($input: GroceryListInput!) {
		addGroceryList(input: $input) {
			listName
			users {
				username
				_id
			}
		}
	}
`;

export const REMOVE_GROCERY_LIST = gql`
	mutation RemoveGroceryList($removeGroceryListId: ID) {
		removeGroceryList(_id: $removeGroceryListId) {
			savedGroceryLists {
				_id
				listName
			}
		}
	}
`;

// GROCERY ITEM MUTATIONS
export const ADD_GROCERY_ITEM = gql`
	mutation AddGroceryItem($addGroceryItemInput: GroceryItemInput!) {
		addGroceryItem(input: $addGroceryItemInput) {
			_id
			username
			email
			savedGroceryLists {
				_id
				listName
				groceryItems {
					_id
					itemName
					amount
					measurement
				}
			}
		}
	}
`;

export const REMOVE_GROCERY_ITEM = gql`
	mutation RemoveGroceryItem($id: ID!, $groceryListId: String!) {
		removeGroceryItem(_id: $id, groceryListId: $groceryListId) {
			savedGroceryLists {
				groceryItems {
					itemName
				}
			}
		}
	}
`;
