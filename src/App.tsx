import { Route, Routes } from "react-router"
import RootLayout from "./layouts/root.layout"
import PublicLayout from "./layouts/public.layout"
import AdminLayout from "./layouts/admin.layout"
import AuthLayout from "./layouts/auth.layout"
import HomePage from "./pages/public/home.page"
import DashboardPage from "./pages/admin/dashboard.page"
import ProfilePage from "./pages/admin/profile.page"
import ChatPage from "./pages/admin/chat.page"
import LoginPage from "./pages/auth/login.page"
import RegisterPage from "./pages/auth/register.page"
import NotFoundPage from "./pages/public/not-found.page"
import TaskPage from "./pages/admin/task.page"
import PomodoroPage from "./pages/admin/pomodoro.page"
import PromedioPage from "./pages/admin/promedio.page"
import HorarioPage from "./pages/admin/horario.page"
import GastosPage from "./pages/admin/gastos.page"


//rutas de nuestra aplicacion  
const App = () => {
  return (
    <Routes>

      <Route element={<RootLayout></RootLayout>}>

        <Route element={<PublicLayout></PublicLayout>}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>

        </Route>

        <Route path="admin" element={<AdminLayout></AdminLayout>}>

          <Route index element={<DashboardPage></DashboardPage>}></Route>
          <Route path="profile" element={<ProfilePage></ProfilePage>}></Route>
          <Route path="chat" element={<ChatPage></ChatPage>}></Route>
          <Route path="tasks" element={<TaskPage></TaskPage>}></Route>
          <Route path="pomodoro" element={<PomodoroPage ></PomodoroPage>}></Route>
          <Route path="promedio" element={<PromedioPage ></PromedioPage>}></Route>
          <Route path="horario" element={<HorarioPage ></HorarioPage>}></Route>
          <Route path="gastos" element={<GastosPage ></GastosPage>}></Route>

        </Route>

        <Route path="auth" element={<AuthLayout></AuthLayout>}>

          <Route element={<LoginPage></LoginPage>} path="login"></Route>
          <Route element={<RegisterPage></RegisterPage>} path="register"></Route>

        </Route>

      </Route>

    </Routes>
  )
}
export default App