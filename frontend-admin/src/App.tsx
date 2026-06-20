import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminSidebar from "./components/layout/AdminSidebar";
import AdminTopbar from "./components/layout/AdminTopbar";

// Import Halaman Utama
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import PengajuanPage from "./features/pengajuan/pages/PengajuanPage";
import UsersList from "./features/users/pages/UserList";
import MasterDataPage from "./features/master-data/pages/MasterDataPage";

// Import Halaman Detail
import PengajuanDetailPage from "./features/pengajuan/pages/PengajuanDetailPage";

// Import Halaman Auth
import LoginPage from "./features/auth/pages/LoginPage";

// Import ProtectedRoute
import ProtectedRoute from "./features/auth/routes/ProtectedRoute";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans selection:bg-[#FFC800]/30">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 scrollbar-hide">
          <div className="max-w-[1440px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes (tidak perlu proteksi) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect Root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Admin Routes (dilindungi dengan ProtectedRoute) */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <DashboardPage />
              </AdminLayout>
            }
          />

          {/* Kreditur */}
          {/* <Route path="/admin/kreditur" element={
                        <AdminLayout>
                            <KrediturListPage />
                        </AdminLayout>
                    } />
                    <Route path="/admin/kreditur/detail/:id" element={
                        <AdminLayout>
                            <KrediturDetailPage />
                        </AdminLayout>
                    } /> */}

          {/* Pengajuan */}
          <Route
            path="/admin/pengajuan"
            element={
              <AdminLayout>
                <PengajuanPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/pengajuan/detail/:id"
            element={
              <AdminLayout>
                <PengajuanDetailPage />
              </AdminLayout>
            }
          />

          {/* Users */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route
              path="/admin/users"
              element={
                <AdminLayout>
                  <UsersList />
                </AdminLayout>
              }
            />
            {/* <Route
              path="/admin/users/detail/:id"
              element={
                <AdminLayout>
                  <UsersDetailPage />
                </AdminLayout>
              }
            /> */}

            {/* Master Data */}
            <Route
              path="/admin/master-data"
              element={
                <AdminLayout>
                  <MasterDataPage />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/master-data/:category"
              element={
                <AdminLayout>
                  <MasterDataPage />
                </AdminLayout>
              }
            />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
