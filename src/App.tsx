import { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';

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

import { auth } from "./services/api";

type Screen =
  | "start" | "login" | "register"
  | "forgot_password" | "verify_code" | "password_success" | "new_password" | "success_reset"
  | "map" | "profile" | "emergency" | "checkin" | "checkin_active"
  | "report" | "contacts" | "my_reports" | "menu";

export default function App() {
  // CORREÇÃO AQUI: Inicialização inteligente baseada na sessão e no estado do check-in
  const [screen, setScreen] = useState<Screen>(() => {
    const token = localStorage.getItem("token");
    const isCheckInAtivo = localStorage.getItem("checkin_status_ativo");

    if (token) {
      return isCheckInAtivo === "true" ? "checkin_active" : "map";
    }
    return "start";
  });

  // Inicializa os minutos recuperando o valor salvo do localStorage
  const [checkInMinutes, setCheckInMinutes] = useState<number>(() => {
    const minsSalvos = localStorage.getItem("checkin_minutos");
    return minsSalvos ? parseInt(minsSalvos, 10) : 30;
  });

  // Sincroniza o estado da tela com o localStorage
  useEffect(() => {
    if (screen === "checkin_active") {
      localStorage.setItem("checkin_status_ativo", "true");
    } else if (screen === "map" || screen === "checkin" || screen === "start") {
      localStorage.removeItem("checkin_status_ativo");
    }
  }, [screen]);

  const handleLogout = () => {
    auth.logout();
    localStorage.clear();
    setScreen("login");
  };

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
          onLogin={() => setScreen("map")} // Vai direto para o mapa ao logar
        />
      )}

      {screen === "register" && (
        <Register onBack={() => setScreen("start")} onGoToLogin={() => setScreen("login")} />
      )}

      {screen === "forgot_password" && (
        <ForgotPassword onBack={() => setScreen("login")} onNext={() => setScreen("verify_code")} />
      )}
      {screen === "verify_code" && (
        <VerifyCode onBack={() => setScreen("forgot_password")} onNext={() => setScreen("password_success")} />
      )}
      {screen === "password_success" && (
        <PasswordSuccess onBack={() => setScreen("verify_code")} onNext={() => setScreen("new_password")} />
      )}
      {screen === "new_password" && (
        <NewPassword onBack={() => setScreen("password_success")} onNext={() => setScreen("success_reset")} />
      )}
      {screen === "success_reset" && (
        <SuccessReset onContinue={() => setScreen("login")} />
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
        />
      )}

      {screen === "contacts" && (
        <EmergencyContacts onBack={() => setScreen("menu")} />
      )}

      {screen === "my_reports" && (
        <MyReports
          onBack={() => setScreen("menu")}
          onNewReport={() => setScreen("report")}
        />
      )}

      {screen === "menu" && (
        <Menu
          onClose={() => setScreen("map")}
          onProfile={() => setScreen("profile")}
          onReport={() => setScreen("report")}
          onContacts={() => setScreen("contacts")}
          onReports={() => setScreen("my_reports")}
          onLogout={handleLogout}
        />
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
          onConfirm={(payload) => {
            let mins = 30;
            if (payload.tempo.includes("15")) mins = 15;
            if (payload.tempo.includes("30")) mins = 30;
            if (payload.tempo.includes("1 hora")) mins = 60;
            if (payload.tempo.includes("2 horas")) mins = 120;

            localStorage.setItem("checkin_minutos", mins.toString());
            setCheckInMinutes(mins);
            setScreen("checkin_active");
          }}
          onEmergency={() => setScreen("emergency")}
        />
      )}

      {screen === "checkin_active" && (
        <CheckInActive
          initialMinutes={checkInMinutes}
          onConfirmArrival={() => {
            localStorage.removeItem("checkin_status_ativo");
            setScreen("map");
          }}
          onCancel={() => {
            localStorage.removeItem("checkin_status_ativo");
            setScreen("checkin");
          }}
          onEmergency={() => setScreen("emergency")}
        />
      )}
    </div>
  );
}