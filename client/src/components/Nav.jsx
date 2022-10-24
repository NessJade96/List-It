import React from 'react';
import avocado from '../assets/avo.svg';
import {Button} from './Button';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';
import Auth from '../utils/auth';

export const Header = styled.header`
	border-radius: 3px;
	border-bottom: 2px solid var(--Gainsboro);
	background: var(--Green);
	padding: 1rem 1rem;
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
	margin-right: 1rem;
`;

export const YourList = styled.div`
	@media (min-width: 1020px) {
		display: flex;
		flex-direction: row-reverse;
		align-items: end;
	}
`;

export default function Nav(props) {
	return (
		<Header>
			<YourList>
				{Auth.loggedIn() ? (
					<div>
						<NavLink to="/yourlists" exact="true">
							<Button>your lists</Button>
						</NavLink>
						<NavLink to="/createlist" exact="true">
							<Button style={{margin: '0 0 1rem 0.7rem'}}>create list</Button>
						</NavLink>
						<NavLink onClick={Auth.logout} to="/login" exact="true">
							<Button style={{margin: '0 0 1rem 0.7rem'}}>logout</Button>
						</NavLink>
						<H1>{props.header}</H1>
					</div>
				) : (
					<div>
						<NavLink to="/signup" exact="true">
							<Button>Signup</Button>
						</NavLink>
						<NavLink to="/login" exact="true">
							<Button style={{margin: '0 0 1rem 1.5rem'}}>Login</Button>
						</NavLink>
						<H1>Welcome to List It!</H1>
					</div>
				)}
			</YourList>
			<img className="avocado" src={avocado} alt="avocado"></img>
		</Header>
	);
}
