import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import Transactions from "./pages/Transactions";
import CreateAccount from "./pages/CreateAccount";

import Layout from "./layout/Layout";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import Users from "./admin/Users";
import Accounts from "./admin/Accounts";
import AdminTransactions from "./admin/Transactions";

import { getUserRole } from "./utils/decodeToken";


// 🔐 Private Route
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// 🔐 Admin Route
function AdminRoute({ children }) {
  const role = getUserRole();

  if (role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/deposit"
          element={
            <PrivateRoute>
              <Layout>
                <Deposit />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/withdraw"
          element={
            <PrivateRoute>
              <Layout>
                <Withdraw />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/transfer"
          element={
            <PrivateRoute>
              <Layout>
                <Transfer />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Layout>
                <Transactions />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/create-account"
          element={
            <PrivateRoute>
              <Layout>
                <CreateAccount />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminLayout>
                  <Users />
                </AdminLayout>
              </AdminRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/accounts"
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminLayout>
                  <Accounts />
                </AdminLayout>
              </AdminRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/transactions"
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminLayout>
                  <AdminTransactions />
                </AdminLayout>
              </AdminRoute>
            </PrivateRoute>
          }
        />

        {/* Default fallback */}
        <Route
          path="*"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

      </Routes>
    </Router>
  );
}