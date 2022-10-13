import styled, {css} from 'styled-components';

export const Button = styled.button`
	border-radius: 3px;
	font-size: 1rem;
	padding: 0.25em 0.5em;
	min-width: 5rem;
	background: var(--Xanadu);
	color: white;
	border: 1px solid var(--Gainsboro);
	align-self: end;

	&:hover {
		background: var(--Xanadu);
		color: white;
	}
`;
