import { Navigate, Outlet, useParams } from "react-router-dom"
import { Note } from "../types";

type LayoutProps = {
    notes: Note[];
}

const Layout = ({notes}: LayoutProps) => {
    const {id} = useParams();

    const found = notes.find((note) => note.id === id);

    if(!found) return <Navigate to={'/'} />

  return (
    <Outlet context={found} />
  )
}

export default Layout