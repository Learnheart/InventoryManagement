import "./App.css";
import LoginPage from "./Components/Authentication/LoginPage";
import Dashboard from "./Pages/Reports/Dashboard";
import ProductTable from "./Pages/Manager/ManageProduct/ProductTable";
import { AuthProvider } from "./Context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import RegistrationPage from "./Components/Authentication/RegistrationPage";
import AddProductPage from "./Pages/Manager/ManageProduct/AddProductPage";
import UpdateProductPage from "./Pages/Manager/ManageProduct/UpdateProductPage";
import ImportList from "./Pages/Manager/ManageImport/ImportList";
import ImportDetail from "./Pages/Manager/ManageImport/ImportDetail";
import AddImport from "./Pages/Manager/ManageImport/AddImport";
import UpdateImport from "./Pages/Manager/ManageImport/UpdateImport";
import ExportList from "./Pages/Manager/MangeOrder/ExportList";
import NewExport from "./Pages/Manager/MangeOrder/NewExport";
import ExportDetail from "./Pages/Manager/MangeOrder/ExportDetail";
import ExportUpdated from "./Pages/Manager/MangeOrder/ExportUpdated";
import TrackingList from "./Pages/Manager/Tracking/TrackingList";
import History from "./Pages/Manager/Tracking/History";
import UpdateTracking from "./Pages/Manager/Tracking/UpdateTracking";
import EmpList from "./Pages/Manager/ManageUser/EmpList";
import CreateAccount from "./Pages/Manager/ManageUser/CreateAccount";
import UpdateEmpInfo from "./Pages/Manager/ManageUser/UpdateEmpInfo";

// root component
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth/signin" element={<LoginPage />} />
          {/* <Route path="/auth/signup" element={<RegistrationPage />} /> */}
          <Route path="/products" element={<ProductTable />} />
          <Route
            path="/manager/updateProduct/:productId"
            element={<UpdateProductPage />}
          />
          <Route path="/manager/addProduct" element={<AddProductPage />} />

          {/* Import */}
          <Route path="/grnList" element={<ImportList />} />
          <Route path="/grnDetail/:grnId" element={<ImportDetail />} />
          <Route path="/staff/createNote" element={<AddImport />} />
          <Route path="/staff/updateGrn/:grnId" element={<UpdateImport />} />

          {/* Export */}
          <Route path="/orderList" element={<ExportList />} />
          <Route path="/sale/createOrder" element={<NewExport />} />
          <Route path="/orderDetail/:orderId" element={<ExportDetail />} />
          <Route
            path="/sale/updateOrder/:orderId"
            element={<ExportUpdated />}
          />

          {/* Tracking */}
          <Route path="/listTracking" element={<TrackingList />} />
          <Route path="/staff/history/:trackingId" element={<History />} />
          <Route
            path="/staff/updateTracking/:trackingId"
            element={<UpdateTracking />}
          />

          {/* User */}
          <Route path="//manager/userList" element={<EmpList />} />
          <Route path="/auth/signup" element={<CreateAccount />} />
          <Route path="/updateUser/:empId" element={<UpdateEmpInfo />} />

          {/* Dash board */}
          <Route element={<PrivateRoute />}>
            <Route path="/public/transaction-report" element={<Dashboard />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/public/transaction-report" />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
