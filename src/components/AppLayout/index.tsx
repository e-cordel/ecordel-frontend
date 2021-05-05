
import AppNavbar from "../AppNavbar";

export default function AppLayout({ children }) {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  )
}
