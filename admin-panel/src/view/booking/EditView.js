import BoxPopupHeader from '../../components/BoxPopupHeader'


import { CircularProgress, DialogActions, DialogContent, Button } from '@mui/material'


import React from "react"
import { submitForm } from '../../util/index'

export default function EditBookingView({children, loading, close, back, name, formRef}) {
	return (
		<>
			<BoxPopupHeader title={`Edit booking for ${name || ""}`} close={close} back={back} />
			{loading ? (
				<CircularProgress />
			) : (
				<>
					<DialogContent>{children}</DialogContent>
					<DialogActions>
						<Button onClick={() => submitForm(formRef)} variant="contained">
							Update booking
						</Button>
					</DialogActions>
				</>
			)}
		</>
	)
}
