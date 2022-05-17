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
})

afterEach(() => {
	// cleanup on exiting
	container.remove()
	container = null
})

it("Renders differently depending on props", () => {
	act(() => {
        root = createRoot(container)
		root.render(<BoxPopupHeader />)
	})
	expect(container.querySelectorAll("button").length).toBe(0)

	act(() => {
        root.unmount()
        root = createRoot(container)
		root.render(<BoxPopupHeader close={() => console.log("Dummy function")} />)
	})
	expect(container.querySelectorAll("button").length).toBe(1)

	act(() => {
        root.unmount()
        root = createRoot(container)
		root.render(<BoxPopupHeader back={() => console.log("Dummy function")} />)
	})
	expect(container.querySelectorAll("button").length).toBe(1)

	act(() => {
        root.unmount()
        root = createRoot(container)
		root.render(
			<BoxPopupHeader back={() => console.log("Dummy function")} close={() => console.log("Dummy function")} />
		)
	})
	expect(container.querySelectorAll("button").length).toBe(2)

	act(() => {
        root.unmount()
        root = createRoot(container)
		root.render(<BoxPopupHeader title="Hello world!" />)
	})
	expect(container.textContent).toContain("Hello world!")
})
