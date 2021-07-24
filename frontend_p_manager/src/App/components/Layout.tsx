import styled from "styled-components"

export const Sidebar = styled.div`
border-left: 1px solid #ddd;
background-color: ${props => props.theme["panelBackground"]};
flex: 1 1 30%;
max-width: 250px;
height: 100vh;
`

export const Content = styled.div`
background-color: ${props => props.theme["appBg"]};
flex: 1 1 70%;
height: 100vh;
`