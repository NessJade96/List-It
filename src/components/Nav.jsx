import React from 'react';
import profilePic from '../../public/assets/profilepic.jpg';

export default function Nav() {
	return (
		<header>
			<div>
				<ul>
					<li>your lists</li>
					<li>recipies</li>
				</ul>
				<h1>Shopping List</h1>
			</div>
			<img
				className="profilePic"
				src={profilePic}
				alt="users profile picture"
			></img>
		</header>
	);
}
