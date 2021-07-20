import styled, { css } from "styled-components";
import { Sizes, ThemeColors } from "../theme/Theme";
import Color from "color";

export const Button = styled.button<{ variant?: ThemeColors, inverse?: boolean, size?: Sizes, fullWidth?: boolean }>`
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  cursor: pointer;
  font-size: ${(props) => {
    switch(props.size) {
      case "x0": return "8px";
      case "x1": return "12px";
      case "x2": return "16px";
      case "x3": return "21px";
      case "x4": return "32px";
    }
  }};
  ${props => {
    if(props.inverse) {
      return css`
        background-color: ${() => props.theme[props.variant]};
        border: 2px solid ${() => props.theme[props.variant]};
        color: ${new Color(props.theme[props.variant]).isLight() ? "#000000" : "#ffffff"};
        `
      } else {
        return css`
          color: ${() => props.theme[props.variant]};
          border: 2px solid ${() => props.theme[props.variant]};
          background: transparent;
        `
      }
  }}
  ${props => {
    if(props.fullWidth) {
      return css`
        width: 100%;
      `
    }
  }}
`;


Button.defaultProps = {
    variant: "deeporange",
    size: "x3",
};