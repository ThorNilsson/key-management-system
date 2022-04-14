import { Container } from "@mui/material"

import Header from "./components/Header"
import BoxPresenter from "./presenter/Box"
import StartPagePresenter from "./presenter/StartPage"

import OverviewPresenter from './presenter/Overview'
import BookingsPresenter from './presenter/Bookings'
import TimelinePresenter from './presenter/Timeline'
import EventsPresenter from './presenter/Events'

import { Route, Routes } from "react-router-dom"

export default function App() {
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
						<Route path="events" element={<EventsPresenter/>} />
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
		</div>
	)
}
