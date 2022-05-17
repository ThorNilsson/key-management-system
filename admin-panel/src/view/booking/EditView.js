import CircularProgress from '@mui/material/CircularProgress'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'

import BoxPopupHeader from '../../components/BoxPopupHeader'

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
