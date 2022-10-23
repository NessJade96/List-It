import {gql} from '@apollo/client';

export const GET_ME = gql`
	query Query {
		me {
			_id
			username
			email
			savedGroceryLists {
				listName
				_id
			}
		}
	}
`;

export const GET_GROCERY_LIST = gql`
	query GroceryList($id: ID!) {
		groceryList(_id: $id) {
			listName
			groceryItems {
				_id
				itemName
				amount
				measurement
			}
			users {
				_id
				email
			}
		}
	}
`;

export const GET_GROCERY_ITEM = gql`
	query GroceryItem($groceryItemId: ID!) {
		groceryItem(_id: $groceryItemId) {
			_id
			itemName
			amount
			measurement
		}
	}
`;
