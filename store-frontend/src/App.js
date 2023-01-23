import './App.css';
import Dashboard from './components/dashboard';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Store from './components/store';
import Model from './components/model';
import { ModalRoute } from './components/utils';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "models/:id",
        element: <ModalRoute><Model/></ModalRoute>,
        // loader: teamLoader,
      },
      {
        path: "stores/:id",
        element: <ModalRoute><Store/></ModalRoute>,
      }

    ],
  }
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
