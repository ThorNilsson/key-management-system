import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"

import { useEffect, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"
import { db } from "../api/firebase"
import { off, onValue, ref } from "firebase/database"

export default function Header() {
	const auth = getAuth()
    const [username, setUsername] = useState("")
    useEffect(() => {
        const usernameRef = ref(db, `users/${auth.currentUser.uid}/username`)
        const handleUsername = snapshot => setUsername(snapshot.val())
        onValue(usernameRef, handleUsername)
        return () => off(usernameRef, 'value', handleUsername)
    }, [])
	const navigate = useNavigate()

	const [anchorElUser, setAnchorElUser] = useState(null)

	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	return (
		<Paper sx={{ px: 2 }} square elevation={1}>
			<Toolbar disableGutters>
				<Box sx={{ flexGrow: 1 }}>
					<Link
						to={"/"}
						onClick={e => {
							e.preventDefault()
							navigate("/")
						}}
					>
						<img src="/logo-box.png" alt="logo" height="30px" />
					</Link>
				</Box>

				<Stack direction="row" alignItems="center" spacing={2}>
					<Typography>Logged in as {username}</Typography>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: "45px" }}
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						<MenuItem onClick={() => {
                            handleCloseUserMenu()
                            navigate("/edit")
                            }}>
							<Typography variant="body1" component="span" textAlign="center">
								Edit profile
							</Typography>
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleCloseUserMenu()
								signOut(auth)
							}}
						>
							<Typography variant="body1" component="span" textAlign="center">
								Sign out
							</Typography>
						</MenuItem>
					</Menu>
				</Stack>
			</Toolbar>
		</Paper>
	)
}
