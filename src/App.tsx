import { useState } from "react";

import { Start } from "./pages/Start";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import PasswordSuccess from "./pages/PasswordSuccess";
import NewPassword from "./pages/NewPassword";
import SuccessReset from "./pages/SuccessReset";

import Profile from "./pages/Profile";
import ReportIncident from "./pages/ReportIncident";
import EmergencyContacts from "./pages/EmergencyContacts";
import MyReports from "./pages/MyReports";
import Menu from "./pages/Menu";
import Emergency from "./pages/Emergency";
import CheckIn from "./pages/CheckIn";
import CheckInActive from "./pages/CheckInActive";
import MapSafe from "./pages/MapSafe";

type Screen =
  | "start"
  | "login"
  | "register"
  | "forgot_password"
  | "verify_code"
  | "password_success"
  | "new_password"
  | "success_reset"
  | "map"
  | "profile"
  | "emergency"
  | "checkin"
  | "checkin_active"
  | "report"
  | "contacts"
  | "my_reports"
  | "menu";

interface Report {
  id: number;
  type: string;
  location: string;
  description: string;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [reports, setReports] = useState<Report[]>([]);

  return (
    <div className="min-h-screen bg-white">
      {screen === "start" && (
        <Start onLogin={() => setScreen("login")} onRegister={() => setScreen("register")} />
      )}

      {screen === "login" && (
        <Login
          onBack={() => setScreen("start")}
          onGoToRegister={() => setScreen("register")}
          onForgotPassword={() => setScreen("forgot_password")}
          onLogin={() => setScreen("map")}
        />
      )}

      {screen === "map" && (
        <MapSafe
          onMenu={() => setScreen("menu")}
          onEmergency={() => setScreen("emergency")}
          onCheckIn={() => setScreen("checkin")}
          onProfile={() => setScreen("profile")}
        />
      )}

      {screen === "report" && (
        <ReportIncident
          onBack={() => setScreen("menu")}
          onNext={() => setScreen("my_reports")}
          onSave={(reportData) => {
            const newReport = { id: Date.now(), ...reportData };
            setReports((prev) => [...prev, newReport]);
            console.log("Salvo no estado global:", newReport);
          }}
        />
      )}

      {screen === "contacts" && (
        <EmergencyContacts onBack={() => setScreen("menu")} />
      )}

      {screen === "my_reports" && (
        <MyReports
          onBack={() => setScreen("menu")}
          onNewReport={() => setScreen("report")}
          reports={reports}
        />
      )}

      {screen === "menu" && (
        <Menu
          onClose={() => setScreen("map")}
          onProfile={() => setScreen("profile")}
          onReport={() => setScreen("report")}
          onContacts={() => setScreen("contacts")}
          onReports={() => setScreen("my_reports")}
          onLogout={() => setScreen("login")}
        />
      )}

      {screen === "register" && (
        <Register onBack={() => setScreen("start")} onGoToLogin={() => setScreen("login")} />
      )}

      {screen === "forgot_password" && (
        <ForgotPassword 
          onBack={() => setScreen("login")} 
          onNext={() => setScreen("verify_code")} 
        />
      )}

      {screen === "verify_code" && (
        <VerifyCode 
          onBack={() => setScreen("forgot_password")} 
          onNext={() => setScreen("password_success")} 
        />
      )}

      {screen === "password_success" && (
        <PasswordSuccess 
          onBack={() => setScreen("verify_code")} 
          onNext={() => setScreen("new_password")} 
        />
      )}

      {screen === "new_password" && (
        <NewPassword 
          onBack={() => setScreen("password_success")} 
          onNext={() => setScreen("success_reset")} 
        />
      )}

      {screen === "success_reset" && (
        <SuccessReset onContinue={() => setScreen("login")} />
      )}

      {screen === "emergency" && (
        <Emergency onBack={() => setScreen("map")} onCheckIn={() => setScreen("checkin")} />
      )}

      {screen === "profile" && (
        <Profile
          onBack={() => setScreen("map")}
          onMenu={() => setScreen("menu")}
          onEmergency={() => setScreen("emergency")}
          onCheckIn={() => setScreen("checkin")}
        />
      )}

      {screen === "checkin" && (
        <CheckIn
          onBack={() => setScreen("map")}
          onConfirm={() => setScreen("checkin_active")}
          onEmergency={() => setScreen("emergency")}
        />
      )}

      {screen === "checkin_active" && (
        <CheckInActive
          onBack={() => setScreen("checkin")}
          onConfirmArrival={() => setScreen("map")}
          onCancel={() => setScreen("checkin")}
          onEmergency={() => setScreen("emergency")}
        />
      )}
    </div>
  );
}