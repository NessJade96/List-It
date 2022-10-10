import React from 'react';
import profilePic from '../../public/assets/profilepic.jpg';
import {Button} from './Button';

export default function Nav() {
	return (
		<header>
			<div>
				<ul>
					<li>
						<Button test>your lists</Button>
					</li>
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
