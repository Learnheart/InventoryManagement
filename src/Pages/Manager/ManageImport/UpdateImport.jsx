import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import Sidebar from "../../../Components/Navbar/Sidebar";
import Header from "../../../Components/Header/Header";
import UpdateGrn from "../../../Components/Grn/GrnUpdate";

const UpdateImport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not authenticated
    if (!user.isAuthenticated) {
      alert("Unauthorize access");
      navigate("/auth/signin");
    } else if (user.role != "MANAGER" && user.role != "INVENTORY_STAFF") {
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
              <UpdateGrn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateImport;
