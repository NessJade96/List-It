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

// export const ADD_GROCERY_ITEM = gql`
// addGroceryItem(input: $addGroceryItemInput) {
//   username
//   email
//   savedGroceryLists {
//     groceryItems {
// 			_id
//       itemName
//       amount
//       measurement
//     }
//     users {
//       username
//     }
//   }
// }
// }`;
