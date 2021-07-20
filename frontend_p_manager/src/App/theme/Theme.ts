import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		name: string;

		background: string;
		font: string;

		primary: string;
		success: string;
		danger: string;
		warning: string;
		info: string;

		deeporange: string;
		purple: string;

		panelBackground: string;
		primaryBorder: string;
		mainTheme: string;
		secondaryTheme: string;
		mainColor: string;

		appBg: string;

	}
}

export type ThemeColors = "primary" | "success" | "danger" | "warning" | "info" | "deeporange" | "purple" | "mainColor";

export type Sizes = "x0" | "x1" | "x2" | "x3" | "x4";