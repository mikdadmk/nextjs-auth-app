"use client";
// import AdminDashboard from "@/components/AdminDashboard";
import AdminRoute from "@/middleware/AdminRoute";
import Layout from "@/app/(DashboardLayout)/layout"
import Dashboard from "../(DashboardLayout)/dashboard";

export default function DashboardPage() {
  return (
  <AdminRoute>
    <Layout>
      {/* <AdminDashboard /> */}
<Dashboard/>
      </Layout>
      </AdminRoute>
  
  );
}
