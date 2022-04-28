import { Container } from "@mui/material"

import Header from "./components/Header"
import BoxPresenter from "./presenter/Box"
import StartPagePresenter from "./presenter/StartPage"

import OverviewPresenter from "./presenter/Overview"
import BookingsPresenter from "./presenter/Bookings"
import TimelinePresenter from "./presenter/Timeline"
import EventsPresenter from "./presenter/Events"

import { Route, Routes } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"
import Login from "./components/Login"

import { useAuthState } from "react-firebase-hooks/auth"

const auth = getAuth()

export default function App() {
	const [user, loading, error] = useAuthState(auth)

	if (loading) return <div>Loading...</div>
    if (error) return <div>Could not authenticate... {/* TODO */}</div>

	if (!user) return <Login />

	return (
		<div>
			<Header />
			<Container maxWidth="lg" sx={{ mt: 5 }}>
				<Routes>
					<Route path="/" element={<StartPagePresenter />} />
					<Route path=":boxId" element={<BoxPresenter />}>
						<Route index element={<OverviewPresenter />} />
						<Route path="bookings" element={<BookingsPresenter />} />
						<Route path="timeline" element={<TimelinePresenter />} />
						<Route path="events" element={<EventsPresenter />} />
					</Route>
					<Route
						path="*"
						element={
							<main style={{ padding: "1rem" }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Routes>
			</Container>
			<button onClick={() => signOut(auth)}>Sign out</button>
		</div>
	)
}
