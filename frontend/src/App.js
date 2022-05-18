import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConvoScreen from "./screens/ConvoScreen";
import FreelancersScreen from "./screens/FreelancersScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CompanyDashboardScreen from "./screens/CompanyDashboardScreen";
import ErrorScreen from "./screens/ErrorScreen";
import OfferScreen from "./screens/OfferScreen";
import TrainingScreen from "./screens/TrainingScreen";
import InternshipScreen from "./screens/InternshipScreen";
import AllScreen from "./screens/AllScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import AdminScreen from "./screens/AdminScreen";
import BookmarksScreen from "./screens/BookmarksScreen";
import OffersAdminScreen from "./screens/OffersAdminScreen";
import DashboardScreen from "./screens/DashboardScreen";
import TrainingAdminScreen from "./screens/TrainingAdminScreen";
import InternshipAdminScreen from "./screens/InternshipAdminScreen";
import StudentProfileScreen from "./screens/StudentProfileScreen";
import CompanyProfileScreen from "./screens/CompanyProfileScreen";
import HelpScreen from "./screens/HelpScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/admin/users' element={<AdminScreen />} />
        <Route path='/admin/offers' element={<OffersAdminScreen />} />
        <Route path='/admin/trainings' element={<TrainingAdminScreen />} />
        <Route path='/admin/internships' element={<InternshipAdminScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
        <Route path='/reset-password/:resetToken' element={<ResetPasswordScreen />} />
        <Route path='/positions' element={<AllScreen />} />
        <Route path='/bookmarks' element={<BookmarksScreen />} />
        <Route path='/dashboard' element={<DashboardScreen />} />
        <Route path='/freelancers' element={<FreelancersScreen />} />
        <Route path='/freelancers' element={<FreelancersScreen />} />
        <Route path='/freelancers/search/:keyword' element={<FreelancersScreen />} />
        <Route path='/freelancers/:id' element={<StudentProfileScreen />} />
        <Route path='/freelancers/entreprise/:id' element={<CompanyProfileScreen />} />
        <Route path='/offers/:id' element={<OfferScreen />} />
        <Route path='/trainings/:id' element={<TrainingScreen />} />
        <Route path='/internships/:id' element={<InternshipScreen />} />
        <Route path='/settings' element={<SettingsScreen />} />
        <Route path='/dashboard' element={<CompanyDashboardScreen />} />
        <Route path='/conversations/:id' element={<ConvoScreen />} />
        <Route path='/faq' element={<HelpScreen />} />
        <Route path='*' element={<ErrorScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
