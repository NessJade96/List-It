import styled, {css} from 'styled-components';

export const Button = styled.button`
	border-radius: 3px;
	background: transparent;
	color: var(--Purple);
	font-size: 1rem;
	padding: 0.25em 0.5em;

	&:hover {
		background: var(--Xanadu);
		color: white;
	}

	${(props) =>
		props.test &&
		css`
			background: var(--Xanadu);
			color: white;
		`};
`;
