import styled, {css} from 'styled-components';

export const H3 = styled.h3`
	background: transparent;
	color: var(--Purple);
	font-size: 1.2rem;
	padding: 0.25em 0.5em;
	margin-bottom: 0;
	margin-left: 3rem;

	${(props) =>
		props.primary &&
		css`
			font-size: 2rem;
			margin-left: 2.5rem;
		`};
`;
