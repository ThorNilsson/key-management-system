import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import logo from '../logo-box.png'

export function LoginView({
    email,
    setEmail,
    emailErrorText,
    loginDisable,
    handleSubmit,
    sendEmail

}) {
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
                <img src={logo} alt="logo" width="170px" />
                <Typography component="h5" variant="h3" fontSize={20} sx={{fontWeight: 'bold', my: 2}}>
                    Sign In
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
                    <Button type="submit" disabled={loginDisable} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container style={{ textAlign: "center", display: "block" }}>
                        <Grid item>
                            <Button type="submit" fullWidth variant="contained" sx={{  mb: 2 }} onClick={sendEmail}>
                                Send Email
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
