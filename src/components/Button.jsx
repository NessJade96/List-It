import styled, {css} from 'styled-components';

export const Button = styled.button`
	border-radius: 3px;
	background: transparent;
	color: var(--Purple);
	font-size: 1rem;
	padding: 0.25em 0.5em;
	min-width: 5rem;

	&:hover {
		background: var(--Xanadu);
		color: white;
	}

	${(props) =>
		props.primary &&
		css`
			background: var(--Xanadu);
			color: white;
			border: 1px solid var(--Gainsboro);
		`};

	${(props) =>
		props.secondary &&
		css`
			align-self: end;
			margin-bottom: 0.5rem;
			margin-left: 2rem;
		`};
`;
