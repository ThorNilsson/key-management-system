import {
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
	Grid,
	Stack,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemButton,
} from "@mui/material"
import React from "react"

import { EmailRounded } from "@mui/icons-material"
import { LockClockRounded } from "@mui/icons-material"
import { CheckRounded } from "@mui/icons-material"
import { Error } from "@mui/icons-material"

export default function EditProfileView({
	user,
	handleUpdateUsername,
	handleUpdateEmail,
	handleVerifyEmail,
	handleUpdatePassword,
	handleDeleteAccount,
	newUsername,
	newEmail,
	oldPassword,
	newPassword,
	newRepeatPassword,
	setNewUsername,
	setNewEmail,
	setOldPassword,
	setNewPassword,
	setNewRepeatPassword,
}) {
	return (
		<Grid container columns={{ xs: 1, sm: 2 }} spacing={2}>
			<Grid item xs={1} sm={2}>
				<Card variant="outlined">
					<CardContent>
						<Typography variant="h3" sx={{ mb: 1 }}>
							User information:
						</Typography>
						<List>
							{user.emailVerified || (
								<ListItem>
									<ListItemButton onClick={handleVerifyEmail}>
										<ListItemAvatar>
											<Error />
										</ListItemAvatar>
										<ListItemText
											primary="Verify email"
											secondary="Your email is not verified, click here to send verificaiton email"
										/>
									</ListItemButton>
								</ListItem>
							)}
							<ListItem>
								<ListItemAvatar>
									<EmailRounded />
								</ListItemAvatar>
								<ListItemText primary="email" secondary={user.email} />
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<LockClockRounded />
								</ListItemAvatar>
								<ListItemText primary="Account created" secondary={user.metadata.creationTime} />
							</ListItem>
							{user.emailVerified && (
								<ListItem>
                                    <ListItemAvatar>
                                        <CheckRounded />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Email verified"
                                        secondary="Your email is verified. Good job!"
                                    />
								</ListItem>
							)}
						</List>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={1}>
				<Card variant="outlined">
					<CardContent>
						<Stack direction="column" spacing={1}>
							<Typography variant="h3" sx={{ mb: 1 }}>
								Update username
							</Typography>

							<TextField
								label="Username"
								size="small"
								value={newUsername}
								onInput={e => setNewUsername(e.target.value)}
								fullWidth
							/>
							<Button fullWidth variant="outlined" onClick={handleUpdateUsername}>
								Update
							</Button>
						</Stack>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={1}>
				<Card variant="outlined">
					<CardContent>
						<Stack direction="column" spacing={1}>
							<Typography variant="h3" sx={{ mb: 1 }}>
								Update email
							</Typography>

							<TextField
								label="Email"
								placeholder="name@example.com"
								size="small"
								value={newEmail}
								onInput={e => setNewEmail(e.target.value)}
								fullWidth
							/>
							<Button fullWidth variant="outlined" onClick={handleUpdateEmail}>
								Update
							</Button>
						</Stack>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={1}>
				<Card variant="outlined">
					<CardContent>
						<Stack direction="column" spacing={1}>
							<Typography variant="h3" sx={{ mb: 1 }}>
								Update password
							</Typography>

							<TextField
								label="Old password"
								size="small"
								value={oldPassword}
								onInput={e => setOldPassword(e.target.value)}
								fullWidth
							/>
							<TextField
								label="New password"
								size="small"
								value={newPassword}
								onInput={e => setNewPassword(e.target.value)}
								fullWidth
							/>
							<TextField
								label="Repeat new password"
								size="small"
								value={newRepeatPassword}
								onInput={e => setNewRepeatPassword(e.target.value)}
								fullWidth
							/>
							<Button fullWidth variant="outlined" onClick={handleUpdatePassword}>
								Update
							</Button>
						</Stack>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={1}>
				<Card variant="outlined">
					<CardContent>
						<Stack direction="column" spacing={1}>
							<Typography variant="h3" sx={{ mb: 1 }}>
								Delete account
							</Typography>

							<TextField
								label="Old password"
								size="small"
								value={oldPassword}
								onInput={e => setOldPassword(e.target.value)}
								fullWidth
							/>
							<Button fullWidth variant="contained" color="error" onClick={handleDeleteAccount}>
								Delete account
							</Button>
						</Stack>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	)
}
