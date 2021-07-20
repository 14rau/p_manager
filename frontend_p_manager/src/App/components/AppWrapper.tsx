import styled from "styled-components";

export const AppWrapper = styled.div`
height: 100vh;
width: 100vw;
background-color: ${props => props.theme.appBg};
color: ${props => props.theme.mainColor}
`