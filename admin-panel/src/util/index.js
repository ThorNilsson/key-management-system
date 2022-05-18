export function submitForm(ref) {
	const form = ref.current

	if (form) {
		if (typeof form.requestSubmit === "function") {
			form.requestSubmit()
		} else {
			form.dispatchEvent(new Event("submit", { cancelable: true }))
		}
	}
}
