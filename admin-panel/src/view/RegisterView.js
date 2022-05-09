import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../api/firebase';
import React, { useState } from 'react';
import { ref, set } from "firebase/database";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



function RegisterView(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const theme = createTheme();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email == '') {
            setEmailError(true);
        }
        if (password == ''){
            setPasswordError(true);
        }

        if(email != '' && password != ''){
            const data = new FormData(event.currentTarget);
            createUser(data.get('email'), data.get('password'));
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error = {emailError}
                        />

                        <TextField
                        onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error = {passwordError}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container style={{textAlign: "center", display: "block"}}>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

function createUser(email, password) {

    const user = {
        email: {
            email: email,
            username: "",
        }
    }

    console.log(db)
    createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredentials) => {
            console.log(userCredentials);
            (async () => {
                try {
                    await set(ref(db, 'users/' + userCredentials.user.uid), {
                        username: "",
                        email: email,
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })();
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/missing-email":
                    const emailError = document.getElementById('email');
                    emailError.innerHTML = "EMAIL REQUIRED";
                    break;
                // case "auth/invalid-email":
                //     emailErrorMessage.style.opacity = 1;
                //     emailErrorMessage.innerHTML = "Email is invalid.";
                //     break;
                // case "auth/email-already-in-use":
                //     emailErrorMessage.style.opacity = 1;
                //     emailErrorMessage.innerHTML = "Email already in use!";
                //     break;
                // case "auth/weak-password":
                //     passwordErrorMessage.style.opacity = 1;
                //     passwordErrorMessage.innerHTML =
                //         "Password not strong enough. A password containing a combination of 6 numbers and/or letters required.";
                //     break;
                // case "auth/internal-error":
                //     passwordErrorMessage.style.opacity = 1;
                //     passwordErrorMessage.innerHTML =
                //         "Password is required.";
                //     break;
                // default:
                //     passwordErrorMessage.style.opacity = 1;
                //     passwordErrorMessage.innerHTML = "Unknown error.";
                //     break;
            }
            console.log(error);
        });

}


export default RegisterView;
