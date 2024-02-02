import React from "react";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider,   } from "@mantine/core";

import LayOut from "./layOut";
import Home from "./intro";
import AddPosition from "./positionAdd";
import PositionContent from "./positionContent";
import DeletePosition from "./deletePosition";
import EditPosition from "./editPosition";
import EmployeeContent from "./employee/employeeContent";
import EmployeesCard from "./employee/employeeCard";
import EmployeeAdd from "./employee/employeeAdd";
import EditEmployee from "./employee/editEmployee";

const routes = [
  {
    path: "/",
    element: <LayOut />,
    children: [
      { index: true, element: <Home /> },
      { path: "/positions/new", element: <AddPosition />},
      { path: "/positions/:positionName", element: <PositionContent/>},
      { path: "/positions/:positionId/edit", element: <EditPosition />},
      { path: "/positions/:positionId/delete", element: <DeletePosition />},
      { path: '/employees/:employeeId', element: <EmployeeContent /> },
      { path: '/employees/', element: <EmployeesCard />},
      { path: '/employee/new', element: <EmployeeAdd/>},
      { path: '/employee/:employeeId/edit', element: <EditEmployee/>}
    
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  
  return (
    <div >
      <MantineProvider>
      <RouterProvider router={router} />
      </MantineProvider>
    </div>
  );
}

export default App;