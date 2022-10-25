import styled, {css} from 'styled-components';

export const Button = styled.button`
	border-radius: 3px;
	font-size: 1rem;
	padding: 0.25em 0.25em;
	min-width: 5rem;
	min-height: 2rem;
	background: var(--Xanadu);
	color: white;
	border: 1px solid var(--Gainsboro);
	align-self: center;

	&:hover {
		background: var(--Green);
		border-color: var(--Xanadu);
	}

	&:visited {
		color: white;
	}

	${(props) =>
		props.item &&
		css`
			margin: 0 0 0 0.5rem;
		`};
`;
