import AdminRoute from "@/middleware/AdminRoute";

export default function DashboardLayout({ children }) {
  return (
    <AdminRoute>
      <div className="p-6">
        {children}
      </div>
    </AdminRoute>
  );
}
