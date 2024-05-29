import React, { useEffect, useState } from "react";
import UserService from "../../Api/UserService";
import { useNavigate } from "react-router-dom";
import "../Product/Product.css";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await UserService.getUserList();
      console.log("Fetched Users:", data);
      if (Array.isArray(data)) {
        // Filter out users with role MANAGER
        const filteredUsers = data.filter((user) => user.role !== "MANAGER");
        setUsers(filteredUsers);
      } else {
        setError("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (empId) => {
    try {
      await UserService.deleteUser(empId);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentProducts = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="header">
        <h2>Employee List</h2>
        <button onClick={() => navigate("/auth/signup")}>Create account</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((user) => (
            <tr key={user.empId}>
              <th>{user.empId}</th>
              <td>{user.empName}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => navigate(`/updateUser/${user.empId}`)}>
                  Update
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.empId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => setCurrentPage(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserList;
