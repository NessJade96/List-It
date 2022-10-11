import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root{
  --Xanadu: rgb(114, 134, 107);
  --Purple: rgb(41, 25, 46);
  --Brown: rgb(139, 112, 113);
  --Green: rgb(169, 183, 155 );
  --Gainsboro: rgb(221, 218, 222); 
}

#root{
  margin: 0;
  padding: 0;
  text-align: left;
}

body {
  width: auto;
  margin: 0;
  padding: 0;
  background:  var(--Green) ;
  font-family: 'Dosis', sans-serif;
  display: block;
}

img {
  height: 3rem;
  width: auto;
  border-radius: 100%;
  margin: 0 1rem 0 0
`;

export default GlobalStyle;
