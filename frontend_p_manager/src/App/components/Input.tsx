import styled from "styled-components";
import { Sizes, ThemeColors } from "../theme/Theme";
import Color from "color";

export const Input = styled.input<{ variant?: ThemeColors, nSize?: Sizes }>`
  font-size: ${(props) => {
    switch(props.nSize) {
      case "x0": return "12px";
      case "x1": return "16px";
      case "x2": return "18px";
      case "x3": return "21px";
      case "x4": return "32px";
    }
  }};
  padding: ${(props) => {
    switch(props.nSize) {
      case "x0": return "0px";
      case "x1": return "12px";
      case "x2": return "0.25em 1em";
      case "x3": return "21px";
      case "x4": return "32px";
    }
  }};
  border-radius: 3px;
  border: 2px solid ${(props) => props.theme[props.variant]};
  color: ${(props) => new Color(props.theme[props.variant]).isLight() ? "#000000" : "#ffffff"};
`;


Input.defaultProps = {
    variant: "mainColor",
    nSize: "x2",
};