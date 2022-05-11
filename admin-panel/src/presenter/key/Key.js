import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";


export default function KeyPresenter() {
  return (
    <Container maxWidth="sm" >
        <Outlet />
    </Container>
  )
}
