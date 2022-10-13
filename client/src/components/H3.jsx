import styled, {css} from 'styled-components';

export const H3 = styled.h3`
	background: transparent;
	color: var(--Purple);
	font-size: 1.2rem;
	padding: 0.25em 0.5em;
	margin-bottom: 0;
	margin-left: 1rem;
	margin-right: 1rem;

	${(props) =>
		props.primary &&
		css`
			font-size: 2rem;
			padding: 0.12em 0.25em;
		`};
`;
