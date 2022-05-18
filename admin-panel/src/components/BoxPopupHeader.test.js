import React from "react"
import { createRoot } from "react-dom/client"
import BoxPopupHeader from "./BoxPopupHeader"
import { act } from "react-dom/test-utils"

// npm test -- --coverage
globalThis.IS_REACT_ACT_ENVIRONMENT = true

let container = null
let root = null
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div")
	document.body.appendChild(container)
    root = createRoot(container)
})

afterEach(() => {
	// cleanup on exiting
    root.unmount()
	container.remove()
	container = null
})

it("Component renders successfully without props", () => {
	act(() => {
		root.render(<BoxPopupHeader />)
	})
	expect(container.querySelectorAll("button").length).toBe(0)
	expect(container.textContent).toEqual("")
})

it("Component Adds buttons when props are passed", () => {
	act(() => {
		root.render(<BoxPopupHeader close={() => console.log("Dummy function")} />)
	})
	expect(container.querySelectorAll("button").length).toBe(1)

	act(() => {
		root.render(<BoxPopupHeader back={() => console.log("Dummy function")} />)
	})
	expect(container.querySelectorAll("button").length).toBe(1)

	act(() => {
		root.render(
			<BoxPopupHeader back={() => console.log("Dummy function")} close={() => console.log("Dummy function")} />
		)
	})
	expect(container.querySelectorAll("button").length).toBe(2)
})

it("Displays title", () => {
	act(() => {
		root.render(<BoxPopupHeader title="Hello world!" />)
	})
	expect(container.textContent).toContain("Hello world!")
})
