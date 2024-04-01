import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditBill from "./pages/edit-bill/edit-bill";
import AssignBill from "./pages/assign-bill";
import BillResult from "./pages/bill-result";

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <EditBill />,
  },
  {
    path: "/edit",
    element: <EditBill />,
  },
  {
    path: "/assign",
    element: <AssignBill />,
  },
  {
    path: "/result",
    element: <BillResult />,
  },
]);

  return (
    <div className="page-wrapper">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
