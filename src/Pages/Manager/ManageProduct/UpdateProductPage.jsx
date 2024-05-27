import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import Sidebar from "../../../Components/Navbar/Sidebar";
import Header from "../../../Components/Header/Header";
import UpdateProduct from "../../../Components/Product/UpdateProduct";

const UpdateProductPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      alert("Unauthorized access");
      navigate("/auth/signin");
    } else if (user.role != "MANAGER") {
      alert("You don't have authorization to access this resource!");
      navigate("/products");
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
            <div className="chart-container">
              <UpdateProduct />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateProductPage;
