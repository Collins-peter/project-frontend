import {createBrowserRouter, RouterProvider} from "react-router-dom";
import TrackerGen from "./components/TrackerGen Page/TrackerGen"
import UpdateStatus from "./components/Update Status Page/UpdateStatus";
import TrackPackage from "./components/Track Package Page/TrackPackage";

//CREATING ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <div><TrackerGen/></div>
  },
  {
    path: "/updatestatus",
    element: <div><UpdateStatus/></div>
  },
  {
    path: "/trackpackage",
    element: <div><TrackPackage/></div>
  }
])

function App() {
  
  return (
    <div>
      <RouterProvider router= {router}/>
    </div>
  )
}

export default App
