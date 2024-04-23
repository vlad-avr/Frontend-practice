
import './App.css'
import Login from './components/Login/Login.jsx'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import Unauthorized from './components/Unauthorized.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Brigades from './components/pages/Brigades.jsx'
import EditBrigades from './components/admin_pages/EditBrigades.jsx'
import Flights from './components/pages/Flights.jsx'
import FlightEdit from './components/admin_pages/EditFlights.jsx'
import Crew from './components/pages/Crew.jsx'
import EditCrew from './components/admin_pages/EditCrew.jsx'
import Planes from './components/pages/Planes.jsx'
import EditPlanes from './components/admin_pages/EditPlanes.jsx'
import Races from './components/pages/Races.jsx'
import EditRaces from './components/admin_pages/EditRaces.jsx'
import View from './components/pages/View.jsx'
import AdminView from './components/admin_pages/AdminView.jsx'
import DispatchView from './components/admin_pages/DispatchView.jsx'
import CrewDispatch from './components/admin_pages/DispatchCrew.jsx'

const ROLES = {
  Admin: "admin",
  Dispatch: "dispatch",
  User: "user"
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Login />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin_view" element={<AdminView />} />
          <Route path='crew_edit' element={<EditCrew />} />
          <Route path='plane_edit' element={<EditPlanes />} />
          <Route path='race_edit' element={<EditRaces />} />
          <Route path='flight_edit' element={<FlightEdit />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Dispatch, ROLES.User]} />}>
          <Route path='brigade_view' element={<Brigades />} />
          <Route path='crew_view' element={<Crew />} />
          <Route path='flights_view' element={<Flights />} />
          <Route path='planes_view' element={<Planes />} />
          <Route path='races_view' element={<Races />} />
          <Route path='view' element={<View />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Dispatch]} />}>
          <Route path="dispatch_view" element={<DispatchView />} />
          <Route path='brigade_edit' element={<EditBrigades />} />
          <Route path='crew_dispatch' element={<CrewDispatch />} />
        </Route>
        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='home' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
