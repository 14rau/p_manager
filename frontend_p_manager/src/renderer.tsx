/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */


import './index.css'; 

import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from './App/App';
import { ThemeProvider } from 'styled-components';
import { ThemeDark } from './App/theme/DarkTheme';
import { AppWrapper } from './App/components/AppWrapper';
import { AppState, appStateCtx } from './App/lib/AppState';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';




ReactDOM.render(
    <appStateCtx.Provider value={new AppState()}>
        <ThemeProvider theme={ThemeDark}>
            <AppWrapper>
                <App/>
            </AppWrapper>
        </ThemeProvider>
    </appStateCtx.Provider>
, document.getElementById("root-react"));

