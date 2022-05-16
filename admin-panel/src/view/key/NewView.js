import { Stepper, Button, Typography, Step, StepLabel, CircularProgress, Stack, DialogContent } from "@mui/material"

import { RadioButtonCheckedRounded } from "@mui/icons-material"
import { SensorsRounded } from "@mui/icons-material"
import { DoneAllRounded } from "@mui/icons-material"
import BoxPopupHeader from "../../components/BoxPopupHeader"

export const NFC_SCAN_STEPS = {
	LOADING: "0",
	WAITING_FOR_BUTTON_PRESS: "1",
	WAITING_FOR_NFC_SCAN: "2",
	NFC_SCANNED: "3",
}

export default function NewKeyView({ back, startScanProcess, currentStep, nfcScanStep, uid, children, save }) {
	function ShowNfcScanStep() {
		switch (nfcScanStep) {
			case NFC_SCAN_STEPS.LOADING:
				return (
					<Stack direction="row" justifyContent="center">
						<CircularProgress />
					</Stack>
				)
			case NFC_SCAN_STEPS.WAITING_FOR_BUTTON_PRESS:
				return (
					<Stack direction="column" alignItems="center">
						<RadioButtonCheckedRounded
							sx={{
								fontSize: 80,
								animation: `iconPulse 1000ms infinite ease-in-out`,
								"@keyframes iconPulse": {
									"0%": {
										transform: "scale(1)",
									},
									"50%": {
										transform: "scale(1.1)",
									},
									"100%": {
										transform: "scale(1)",
									},
								},
							}}
							color="primary"
						/>
						<Typography variant="h3" sx={{ mt: 3 }}>
							Press the button to activate the nfc pad
						</Typography>
					</Stack>
				)
			case NFC_SCAN_STEPS.WAITING_FOR_NFC_SCAN:
				return (
					<Stack direction="column" alignItems="center">
						<SensorsRounded sx={{ fontSize: 80 }} color="primary" />
						<Typography variant="h3" sx={{ mt: 3 }}>
							Scan nfc tag
						</Typography>
						<Typography variant="body1" sx={{ mt: 1 }}>
							Bring the nfc tag near the marked scanner to register it.
						</Typography>
					</Stack>
				)
			case NFC_SCAN_STEPS.NFC_SCANNED:
				return (
					<Stack direction="column" alignItems="center">
						<DoneAllRounded sx={{ fontSize: 80 }} color="primary" />
						<Typography variant="h3" sx={{ mt: 3 }}>
							NFC scanned successfully
						</Typography>
						<Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
							Please wait while nfc data is gathered...
						</Typography>
						<CircularProgress />
					</Stack>
				)
			default:
				return <div>Something went wrong</div>
		}
	}

	const steps = [
		<>
			<Typography variant="h3">Before starting</Typography>
			<Typography variant="body1">Make sure you are close to the key box and have a nfc tag ready.</Typography>
			<Button variant="contained" onClick={startScanProcess} sx={{ mt: 5 }}>
				Ready!
			</Button>
		</>,
		<ShowNfcScanStep />,
		<>
			<Typography variant="h3">Enter additional information</Typography>
			<Typography variant="body1">NFC uid: {uid}</Typography>
			{children}
			<Button onClick={save} fullWidth variant="contained">
				Save
			</Button>
		</>,
	]
	return (
		<>
			<BoxPopupHeader title="Add new key" close={back} />
			<DialogContent>
				<Stepper activeStep={currentStep} sx={{ mb: 3 }}>
					<Step>
						<StepLabel>Get ready</StepLabel>
					</Step>
					<Step>
						<StepLabel>Scan nfc</StepLabel>
					</Step>
					<Step>
						<StepLabel>Fill information</StepLabel>
					</Step>
				</Stepper>
				{steps[currentStep]}
			</DialogContent>
		</>
	)
}
