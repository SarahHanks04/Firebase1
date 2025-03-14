import React from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import HeroPage from "./pages/HeroPage";
import Navbar from "./components/HeroNavbar/Navbar";
import ComplaintUserView from "./views/Users/ComplaintUserView";
import EventFeedbackUserView from "./views/Users/EventFeedbackUserView";
import GenericFormView from "./utils/GenericFormView";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/feedback" />} />
        <Route path="/feedback" element={<HeroPage />} />
        {/* User Routes */}
        <Route path="form/complaint/:formId" element={<ComplaintUserView />} />
        <Route path="form/event/:formId" element={<EventFeedbackUserView />} />
        <Route path="form/:formType/:formId" element={<GenericFormView />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /responses/{document} {
//       allow read, write: if true;
//     }
//   }
// }