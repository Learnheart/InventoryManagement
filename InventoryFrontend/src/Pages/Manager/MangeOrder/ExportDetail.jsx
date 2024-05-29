import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import Sidebar from "../../../Components/Navbar/Sidebar";
import Header from "../../../Components/Header/Header";
import OrderDetail from "../../../Components/Order/OrderDetail";

const ExportDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not authenticated
    if (!user.isAuthenticated) {
      alert("Unauthorize access");
      navigate("/auth/signin");
    } else if (user.role != "MANAGER" && user.role != "SALES") {
      alert("You don't have authorization to access this resource!");
      navigate("/public/transaction-report");
    }
  }, [user, navigate]);

  return (
    <div className="main">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Header />
          <div className="main-content">
            <div className="grnList ">
              <OrderDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExportDetail;
