import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Programs from './pages/Programs.jsx';
import ProgramDetail from './pages/ProgramDetail.jsx';
import Admissions from './pages/Admissions.jsx';
import Support from './pages/Support.jsx';
import FAQs from './pages/FAQs.jsx';
import Feedback from './pages/Feedback.jsx';
import Careers from './pages/Careers.jsx';
import JobDetails from './pages/JobDetails.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

import { AdminAuthProvider } from './admin/AuthContext.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminAdmissions from './admin/pages/AdminAdmissions.jsx';
import AdminContacts from './admin/pages/AdminContacts.jsx';
import AdminCareers from './admin/pages/AdminCareers.jsx';
import AdminFeedback from './admin/pages/AdminFeedback.jsx';
import AdminSubscribers from './admin/pages/AdminSubscribers.jsx';
import AdminChat from './admin/pages/AdminChat.jsx';
import AdminPrograms from './admin/pages/AdminPrograms.jsx';
import AdminFAQs from './admin/pages/AdminFAQs.jsx';
import AdminUsers from './admin/pages/AdminUsers.jsx';

function App() {
  return (
    <AdminAuthProvider>
      <ScrollToTop/>
      <Routes>
        {/* Public marketing/admissions site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/support" element={<Support />} />
          <Route path="/support/faqs" element={<FAQs />} />
          <Route path="/support/feedback" element={<Feedback />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobDetails />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-conditions" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin panel */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="admissions"
            element={<ProtectedRoute roles={['super_admin', 'admissions_officer']}><AdminAdmissions /></ProtectedRoute>}
          />
          <Route
            path="contact"
            element={<ProtectedRoute roles={['super_admin', 'content_editor']}><AdminContacts /></ProtectedRoute>}
          />
          <Route
            path="careers"
            element={<ProtectedRoute roles={['super_admin', 'hr_manager']}><AdminCareers /></ProtectedRoute>}
          />
          <Route
            path="chat"
            element={<ProtectedRoute roles={['super_admin', 'support_agent']}><AdminChat /></ProtectedRoute>}
          />
          <Route
            path="feedback"
            element={<ProtectedRoute roles={['super_admin', 'content_editor']}><AdminFeedback /></ProtectedRoute>}
          />
          <Route
            path="subscribers"
            element={<ProtectedRoute roles={['super_admin', 'content_editor']}><AdminSubscribers /></ProtectedRoute>}
          />
          <Route
            path="programs"
            element={<ProtectedRoute roles={['super_admin', 'content_editor']}><AdminPrograms /></ProtectedRoute>}
          />
          <Route
            path="faqs"
            element={<ProtectedRoute roles={['super_admin', 'content_editor']}><AdminFAQs /></ProtectedRoute>}
          />
          <Route
            path="users"
            element={<ProtectedRoute roles={['super_admin']}><AdminUsers /></ProtectedRoute>}
          />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}

export default App;