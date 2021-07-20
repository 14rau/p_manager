import styled from "styled-components";

export const Pane = styled.div`
padding: 10px 12px;
border: 1px solid ${props => props.theme.primaryBorder};
background-color: ${props => props.theme.panelBackground};
text-align: center;
color: ${props => props.theme.mainColor}
`