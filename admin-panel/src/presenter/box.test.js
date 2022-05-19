import React from "react"
import { createRoot } from "react-dom/client"
import { act } from "react-dom/test-utils"
import {
    waitFor,
  } from "@testing-library/react";
import { Route, Router, Routes } from "react-router-dom"
import { createMemoryHistory } from "history"
import BoxPresenter from "./Box"



// npm test -- --coverage
globalThis.IS_REACT_ACT_ENVIRONMENT = true

let container = null
let root = null
beforeEach(() => {
	container = document.createElement("div")
	document.body.appendChild(container)
	act(() => {
		root = createRoot(container)
	})
})

afterEach(() => {
	act(() => {
		root.unmount()
	})
	container.remove()
	container = null
})

it("The correct tab is marked depending on location", async () => {
    const history = createMemoryHistory()
    let tabsContainer, selectedButton
	await act(async () => {
        history.push("/helloThere")

		root.render(
			<Router location={history.location}>
                <Routes>
                    <Route path=":boxId" element={<BoxPresenter />}>
                        <Route path="bookings" element={<div></div>} />
                    </Route>
                </Routes>
			</Router>
		)
        
        await waitFor(() => expect(container.textContent).not.toMatch(/not found/i))
	})

    tabsContainer = container.querySelector(".MuiTabs-root")
    expect(tabsContainer).not.toBeNull()
    selectedButton = tabsContainer.querySelector("[aria-selected=true]")
    expect(selectedButton).not.toBeNull()
    expect(selectedButton.textContent).toMatch(/overview/i)

    await act(async () => {
        history.push("/helloThere/bookings")

        root.render(
			<Router location={history.location}>
                <Routes>
                    <Route path=":boxId" element={<BoxPresenter />} />
                </Routes>
			</Router>
		)
        
        await waitFor(() => expect(container.textContent).not.toMatch(/not found/i))
	})

    tabsContainer = container.querySelector(".MuiTabs-root")
    expect(tabsContainer).not.toBeNull()
    selectedButton = tabsContainer.querySelector("[aria-selected=true]")
    expect(selectedButton).not.toBeNull()
    expect(selectedButton.textContent).toMatch(/bookings/i)

    expect()
})
