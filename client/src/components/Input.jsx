import styled, {css} from 'styled-components';

export const Input = styled.input`
	border: 1px solid var(--Gainsboro);
	margin: 0.5rem;
	flex-grow: 1;
	background: var(--Gainsboro);
	color: var(--Purple);
	min-height: 2rem;
	min-width: 20rem;
	display: block;

	${(props) =>
		props.item &&
		css`
			min-height: 2rem;
			min-width: 20rem;
		`};
`;
