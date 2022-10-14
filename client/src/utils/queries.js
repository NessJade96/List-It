import {gql} from '@apollo/client';

export const GET_ME = gql`
	query Query {
		me {
			_id
			username
			email
			savedGroceryLists {
				listName
				users {
					username
				}
				groceryItems {
					itemName
					amount
					measurement
				}
			}
		}
	}
`;
