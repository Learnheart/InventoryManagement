import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import Sidebar from "../../../Components/Navbar/Sidebar";
import Header from "../../../Components/Header/Header";
import UpdateUser from "../../../Components/User/UpdateUser";

const UpdateEmpInfo = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not authenticated
    if (!user.isAuthenticated) {
      alert("Unauthorize access");
      navigate("/auth/signin");
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
              <UpdateUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateEmpInfo;
