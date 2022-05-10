import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../api/firebase';
import React, { useState } from 'react';
import { ref, set } from "firebase/database";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



function RegisterView(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [loginState, setLoginState] = useState('false');

    const [username, setUsername] = useState('');

    const [emailErrorText, setEmailErrorText] = useState('')
    const [passwordErrorText, setPasswordErrorText] = useState('')

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const theme = createTheme();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email == '') {
            setEmailError(true);

        }
        else {
            setEmailError(false);
            setEmailErrorText('');
        }
        if (password == '') {
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
            setPasswordErrorText('');
        }
        
        if(!loginState){
            signInWithEmailAndPassword(getAuth(),email,password);
        }
        else {
            if (email != '' && password != '') {
    
                const data = new FormData(event.currentTarget);
    
                createUserWithEmailAndPassword(getAuth(), email, password)
                    .then((userCredentials) => {
                        console.log(userCredentials);
                        (async () => {
                            try {
                                await set(ref(db, 'users/' + userCredentials.user.uid), {
                                    username: username,
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
                                setEmailError(true);
                                setEmailErrorText("Email Required")
                                break;
                            case "auth/invalid-email":
                                setEmailError(true);
                                setEmailErrorText("Email is Invalid")
                                break;
                            case "auth/email-already-in-use":
                                setEmailError(true);
                                setEmailErrorText("Email already in use")
                                break;
                            case "auth/weak-password":
                                setPasswordError(true);
                                setPasswordErrorText("Password not strong enough. A password containing a combination of 6 numbers and/or letters required.");
                                break;
                            case "auth/internal-error":
                                setPasswordError(true);
                                setPasswordErrorText("Password required");
                                break;
                            default:
                                setPasswordErrorText("Unknown Error");
                                break;
                        }
                        console.log(error);
                    });
            }

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
                        {loginState ? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                            helperText={emailErrorText}
                            error={emailError}
                        />
                        {loginState ?
                            <TextField
                                onChange={(e) => setUsername(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="Username (Optional)"
                                type="username"
                                id="username"
                                autoComplete="current-password"
                            />
                            :
                            null
                        }

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
                            helperText={passwordErrorText}
                            error={passwordError}
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
                            {loginState ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Grid container style={{ textAlign: "center", display: "block" }}>
                            <Grid item>
                                <Button onClick={(e) => setLoginState(!loginState)} variant="text">
                                {!loginState ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default RegisterView;
