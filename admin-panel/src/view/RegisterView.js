import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import { useEffect } from 'react'

function RegisterView({
	email,
	setEmail,
	password,
	setPassword,
	username,
	setUsername,
	emailErrorText,
	passwordErrorText,
	handleSubmit,
	shouldLogin,
	setLoginState,
	remember,
	setRemember,
    forgotPassword
}) {
	useEffect(() => {
		document.title = "Login"
	  }, [])

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<img src="/logo-box.png" alt="logo" width="170px" />
				<Typography component="h1" variant="h3" sx={{ my: 2 }}>
					{shouldLogin ? "Sign In" : "Sign Up"}
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						onInput={e => setEmail(e.target.value)}
						margin="normal"
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						helperText={emailErrorText}
						error={emailErrorText !== ""}
					/>
					{shouldLogin || (
						<TextField
							onInput={e => setUsername(e.target.value)}
							value={username}
							margin="normal"
							fullWidth
							name="username"
							label="Username (Optional)"
							type="username"
							id="username"
							autoComplete="current-password"
						/>
					)}

					<TextField
						onChange={e => setPassword(e.target.value)}
						value={password}
						margin="normal"
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						helperText={passwordErrorText}
						error={passwordErrorText !== ""}
					/>
					<FormControlLabel
						control={
							<Checkbox
								value="remember"
								checked={remember}
								onInput={() => setRemember(!remember)}
								color="primary"
							/>
						}
						label="Remember me"
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						{shouldLogin ? "Sign In" : "Sign Up"}
					</Button>
					<Stack direction="row" justifyContent="space-between">
						{shouldLogin && (
							<Button onClick={forgotPassword} variant="outlined" size="small">
								Forgot password
							</Button>
						)}
						<Button onClick={() => setLoginState(!shouldLogin)} variant="text" size="small">
							{shouldLogin ? "Don't have an account?" : "I already have an account"}
						</Button>
					</Stack>
				</Box>
			</Box>
		</Container>
	)
}

export default RegisterView
