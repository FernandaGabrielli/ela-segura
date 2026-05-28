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

/* NOVAS TELAS */
import MapScreen from "./pages/MapScreen";
import CheckinScreen from "./pages/CheckinScreen";
import EmergencyScreen from "./pages/EmergencyScreen";
import CheckinConfirmed from "./pages/CheckinConfirmed";

/* TODAS AS TELAS */
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
  | "menu"

  /* NOVAS */
  | "map"
  | "checkin"
  | "checkinconfirmed"
  | "emergency";

export default function App() {
  const [screen, setScreen] =
    useState<Screen>("start");

  return (
    <div className="min-h-screen bg-white">
      {/* START */}
      {screen === "start" && (
        <Start
          onLogin={() =>
            setScreen("login")
          }
          onRegister={() =>
            setScreen("register")
          }
        />
      )}

      {/* LOGIN */}
      {screen === "login" && (
        <Login
          onBack={() =>
            setScreen("start")
          }
          onGoToRegister={() =>
            setScreen("register")
          }
          onForgotPassword={() =>
            setScreen("forgot_password")
          }
          onLogin={() =>
            setScreen("map")
          }
        />
      )}

      {/* PROFILE */}
      {screen === "profile" && (
        <Profile
          onBack={() =>
            setScreen("login")
          }
          onMenu={() =>
            setScreen("menu")
          }
        />
      )}

      {/* REPORT */}
      {screen === "report" && (
        <ReportIncident
          onBack={() =>
            setScreen("menu")
          }
          onNext={() =>
            setScreen("my_reports")
          }
        />
      )}

      {/* CONTACTS */}
      {screen === "contacts" && (
        <EmergencyContacts
          onBack={() =>
            setScreen("menu")
          }
        />
      )}

      {/* REPORTS */}
      {screen === "my_reports" && (
        <MyReports
          onBack={() =>
            setScreen("menu")
          }
          onNewReport={() =>
            setScreen("report")
          }
        />
      )}

      {/* MENU */}
      {screen === "menu" && (
        <Menu
          onClose={() =>
            setScreen("map")
          }
          onProfile={() =>
            setScreen("profile")
          }
          onReport={() =>
            setScreen("report")
          }
          onContacts={() =>
            setScreen("contacts")
          }
          onReports={() =>
            setScreen("my_reports")
          }
          onLogout={() =>
            setScreen("login")
          }
        />
      )}

      {/* REGISTER */}
      {screen === "register" && (
        <Register
          onBack={() =>
            setScreen("start")
          }
          onGoToLogin={() =>
            setScreen("login")
          }
        />
      )}

      {/* FORGOT PASSWORD */}
      {screen === "forgot_password" && (
        <ForgotPassword
          onBack={() =>
            setScreen("login")
          }
          onNext={() =>
            setScreen("verify_code")
          }
        />
      )}

      {/* VERIFY CODE */}
      {screen === "verify_code" && (
        <VerifyCode
          onBack={() =>
            setScreen("forgot_password")
          }
          onNext={() =>
            setScreen("password_success")
          }
        />
      )}

      {/* PASSWORD SUCCESS */}
      {screen === "password_success" && (
        <PasswordSuccess
          onBack={() =>
            setScreen("verify_code")
          }
          onNext={() =>
            setScreen("new_password")
          }
        />
      )}

      {/* NEW PASSWORD */}
      {screen === "new_password" && (
        <NewPassword
          onBack={() =>
            setScreen("password_success")
          }
          onNext={() =>
            setScreen("success_reset")
          }
        />
      )}

      {/* SUCCESS RESET */}
      {screen === "success_reset" && (
        <SuccessReset
          onContinue={() =>
            setScreen("login")
          }
        />
      )}

      {/* MAPA */}
      {screen === "map" && (
        <MapScreen
          onEmergency={() =>
            setScreen("emergency")
          }
          onCheckin={() =>
            setScreen("checkin")
          }
        />
      )}

      {/* CHECK-IN */}
      {screen === "checkin" && (
        <CheckinScreen
          onBack={() =>
            setScreen("map")
          }
          onMap={() =>
            setScreen("map")
          }
          onEmergency={() =>
            setScreen("emergency")
          }

          /* ADICIONE ESSE */
          onConfirm={() =>
            setScreen("checkinconfirmed")
          }
        />
      )}

      {/* CHECK-IN CONFIRMADO */}
      {screen === "checkinconfirmed" && (
        <CheckinConfirmed
          onBack={() =>
            setScreen("checkin")
          }
          onMap={() =>
            setScreen("map")
          }
          onEmergency={() =>
            setScreen("emergency")
          }
          onCancel={() =>
            setScreen("checkin")
          }
        />
      )}

      {/* EMERGÊNCIA */}
      {screen === "emergency" && (
        <EmergencyScreen
          onBack={() =>
            setScreen("map")
          }
          onMap={() =>
            setScreen("map")
          }
          onCheckin={() =>
            setScreen("checkin")
          }
        />
      )}
    </div>
  );
}