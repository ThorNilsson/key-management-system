import {
	getAuth,
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	browserSessionPersistence,
	sendPasswordResetEmail,
} from "firebase/auth"
import { useState } from "react"

import { Container, Box, Typography, TextField, Grid, FormControlLabel, Checkbox, Button, Link } from "@mui/material"

export default function Login() {
	const auth = getAuth()
	const [email, setEmail] = useState("")
	const [emailError, setEmailError] = useState(null)

	const [password, setPassword] = useState("")
	const [passwordError, setPasswordError] = useState(null)

	const [persist, updatePersist] = useState(true)

	async function handleSubmit(e) {
		e.preventDefault()
		setEmailError(null)
		setPasswordError(null)

		if (email === "") return setEmailError("Enter an email")
		if (password === "") return setPasswordError("Enter a password")

		const usedPersistance = persist ? browserLocalPersistence : browserSessionPersistence

		try {
			await setPersistence(auth, usedPersistance)
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					setPasswordError("Wrong password")
					break
				case "auth/user-not-found":
					setEmailError("No user with that email")
					break
				case "auth/invalid-email":
					setEmailError("Invalid email")
					break

				default:
					alert(error.message)
					break
			}
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<img src="/logo-box.png" alt="logo" width="170px" />
				<Typography component="h1" variant="h3" sx={{ mt: 5 }}>
					Sign in
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								error={emailError !== null}
								helperText={emailError || ""}
								onInput={e => setEmail(e.target.value)}
								value={email}
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								error={passwordError !== null}
								helperText={passwordError || ""}
								onInput={e => setPassword(e.target.value)}
								value={password}
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="password"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										value="keep-logged-in"
										checked={persist}
										onInput={e => updatePersist(!persist)}
										color="primary"
									/>
								}
								label="Keep me logged in"
							/>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
						Sign In
					</Button>
					<Typography
						variant="body1"
						onClick={() => {
							const email = prompt("Enter your email")
							sendPasswordResetEmail(auth, email)
						}}
						sx={{ cursor: "pointer" }}
					>
						Forgot password?
					</Typography>
				</Box>
			</Box>
		</Container>
	)
}
