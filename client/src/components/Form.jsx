import styled, {css} from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	border: 1px solid var(--Gainsboro);
	padding: 0.5rem;
	margin: 0.5rem;
	background: var(--Xanadu);

	${(props) =>
		props.items &&
		css`
			background: var(--Xanadu);
			color: white;
		`};
`;
