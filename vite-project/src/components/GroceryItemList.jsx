import React, {useState} from 'react';
import GroceryItemForm from './GroceryItemForm';
import GroceryItem from './GroceryItem';

export default function GroceryItemList() {
	const [groceryItems, setGroceryItem] = useState([]);

	// Function to add a grocery list item
	const addGroceryItem = (item) => {
		// Checks if the item text is empty
		if (!item.text) {
			return;
		}

		// Add the new list item to the existing array of objects
		const newGroceryItems = [item, ...groceryItems];
		console.log(newGroceryItems);

		// Call setGroceryItem to update state with our new set of grocery list items
		setGroceryItem(newGroceryItems);
	};

	// A function to mark grocery list item as complete
	const completeGroceryItem = (id) => {
		// If the ID passed to this function matches the ID of the item that was click, then mark it as complete.
		let updatedGroceryItem = groceryItems.map((item) => {
			if (item.id === id) {
				item.isComplete = !item.isComplete;
			}
			return item;
		});
		console.log(updatedGroceryItem);
		setGroceryItem(updatedGroceryItem);
	};

	// Function to remove grocery list item and update the state
	const removeGroceryItem = (id) => {
		const updatedGroceryItem = [...groceryItems].filter(
			(item) => item.id !== id
		);
		setGroceryItem(updatedGroceryItem);
	};

	// Function to edit the grocery list item
	const editGrocerylistItem = (itemId, newValue) => {
		if (!newValue.text) {
			return;
		}

		//Using the prev argument that is provided witht he useState hook to map through the list of items.
		// Then check to see if the item ID matches the ID of the item that was clicked, and if so we set it to a new value.
		setBucket((prev) => {
			prev.map((item) => (item.id === itemId ? newValue : item));
		});
	};

	return (
		<div>
			<GroceryItemForm onSubmit={addGroceryItem} />
			<GroceryItem
				groceryItems={groceryItems}
				completeGroceryItem={completeGroceryItem}
				removeGroceryItem={removeGroceryItem}
				editGrocerylistItem={editGrocerylistItem}
			/>
		</div>
	);
}
