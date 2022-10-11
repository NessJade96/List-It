import React from 'react';
import profilePic from '../../public/assets/profilepic.jpg';
import {Button} from './Button';
import styled, {css} from 'styled-components';

export const Header = styled.header`
	border-radius: 3px;
	border: 2px solid var(--Gainsboro);
	background: var(--Green);
	padding: 0.25rem 1rem;
	display: flex;
	min-width: 3rem;
	font-size: 0.6rem;
	place-items: center;
	justify-content: space-between;
`;

export const H1 = styled.h1`
	font-size: 2.5rem;
	color: var(--Purple);
	margin: 0.5rem;
`;

export const YourList = styled.div``;

export default function Nav() {
	return (
		<Header>
			<YourList>
				<Button>your lists</Button>
				<H1>Shopping List</H1>
			</YourList>
			<img
				className="profilePic"
				src={profilePic}
				alt="users profile picture"
			></img>
		</Header>
	);
}
