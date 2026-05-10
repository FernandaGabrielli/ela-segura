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

// Adicionamos todos os nomes das novas telas ao tipo
type Screen =
  | "start"
  | "login"
  | "register"
  | "forgot_password"
  | "verify_code"
  | "password_success"
  | "new_password"
  | "success_reset"
  | "profile"
  | "report"
  | "contacts"
  | "my_reports"
  | "menu";

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");

  return (
    <div className="min-h-screen bg-white">
      {/* Fluxo Principal */}
      {screen === "start" && (
        <Start onLogin={() => setScreen("login")} onRegister={() => setScreen("register")} />
      )}

      {screen === "login" && (
        <Login
        onBack={() => setScreen("start")}
        onGoToRegister={() => setScreen("register")}
        onForgotPassword={() => setScreen("forgot_password")}
        onLogin={() => setScreen("profile")}
        />
      )}
      {screen === "profile" && (
        <Profile
            onBack={() => setScreen("login")}
            onMenu={() => setScreen("menu")}
        />
        )}

        {screen === "report" && (
        <ReportIncident
            onBack={() => setScreen("menu")}
            onNext={() => setScreen("my_reports")}
        />
        )}

        {screen === "contacts" && (
        <EmergencyContacts
            onBack={() => setScreen("menu")}
        />
        )}

        {screen === "my_reports" && (
        <MyReports
            onBack={() => setScreen("menu")}
            onNewReport={() => setScreen("report")}
        />
        )}

        {screen === "menu" && (
        <Menu
            onClose={() => setScreen("profile")}
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

      {/* Fluxo de Recuperação de Senha */}
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
    </div>
  );
}