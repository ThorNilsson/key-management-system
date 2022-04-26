import React from "react"

import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
	typography: {
		h1: {
			fontSize: 30,
			fontWeight: 700,
		},
		h2: {
			fontSize: 24,
			fontWeight: 700,
		},
		h3: {
			fontSize: 20,
			fontWeight: 700,
		},
		h4: {
			fontSize: 18,
			fontWeight: 500,
		},
		h5: {
			fontSize: 16,
			fontWeight: 500,
		},
		h6: {
			fontSize: 14,
			fontWeight: 700,
		},
		subtitle1: "h2",
		subtitle2: "h2",
		body1: {
			fontSize: 14,
		},
		body2: {
			fontSize: 12,
		},
	},
})

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
)
