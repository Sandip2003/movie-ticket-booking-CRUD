import React from "react";
import { loginStyles } from "../assets/dummyStyles.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ArrowLeft, Clapperboard, EyeOff, Eye, Popcorn } from "lucide-react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password || formData.password.length < 6) {
      toast.error("password must be atleast of 6 characters long");
      console.warn("Login Blocked");
      return;
    }
    console.log("Login Data:", formData);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      try {
        const authObj = { isLoggedIn: true, email: formData.email };
        localStorage.setItem("cine_auth", JSON.stringify(authObj));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", formData.email || "");
        localStorage.setItem("cine_user_email", formData.email || "");
        console.log("Auth saved to localStorage:", authObj);
      } catch (error) {
        console.error("Error saving auth to localStorage:", error);
      }
      toast.success("Login Successful! Redirecting to your cinema");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }, 1500);
  };

  const goBack = () => {
    window.history.back();
  };
  return (
    <div className={loginStyles.pageContainer}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="relative w-full max-w-md z-10">
        <div className={loginStyles.backButtonContainer}>
          <button onClick={goBack} className={loginStyles.backButton}>
            <ArrowLeft size={20} className={loginStyles.backButtonIcon} />
            <span className={loginStyles.backButtonText}>Back to Home</span>
          </button>
        </div>

        <div className={loginStyles.cardContainer}>
          <div className={loginStyles.cardHeader}></div>

          <div className={loginStyles.cardContent}>
            <div className={loginStyles.headerContainer}>
              <div className={loginStyles.headerTextContainer}>
                <h2 className={loginStyles.headerText}>Login</h2>
              </div>
              <p className={loginStyles.headerSubtitle}>
                Enter your credentials to continue the experience
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={loginStyles.inputGroup}>
                <label htmlFor="email" className={loginStyles.label}>
                  Email
                </label>
                <div className={loginStyles.inputContainer}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={loginStyles.input}
                    placeholder="Your Email Address"
                  />
                  <div className={loginStyles.inputIcon}>
                    <Clapperboard size={16} className="text-red-500" />
                  </div>
                </div>
              </div>

              <div className={loginStyles.inputGroup}>
                <label htmlFor="password" className={loginStyles.label}>
                  PASSWORD
                </label>
                <div className={loginStyles.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={loginStyles.inputWithIcon}
                    placeholder="Enter Your Password"
                  />
                  <button
                    type="button"
                    className={loginStyles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                        className={loginStyles.passwordToggleIcon}
                      />
                    ) : (
                      <Eye
                        size={18}
                        className={loginStyles.passwordToggleIcon}
                      />
                    )}
                  </button>
                </div>
              </div>
              <button
                disabled={isLoading}
                className={`${loginStyles.submitButton} ${
                  isLoading ? loginStyles.submitButtonDisabled : ""
                }`}
              >
                {isLoading ? (
                  <div className={loginStyles.buttonContent}>
                    <div className={loginStyles.loadingSpinner}></div>
                    <span className={loginStyles.buttonText}>
                      SIGNING IN...
                    </span>
                  </div>
                ) : (
                  <div className={loginStyles.buttonContent}>
                    <Popcorn size={18} className={loginStyles.buttonIcon} />
                    <span className={loginStyles.buttonText}>
                      Access Your Account
                    </span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className={loginStyles.footerContainer}>
          <p className={loginStyles.footerText}>
            Don't Have An Account?{" "}
            <a href="/signup" className={loginStyles.footerLink}>
              Create One Now
            </a>
          </p>

        </div>
      </div>

      <style>{loginStyles.customCSS} </style>
    </div>
  );
};

export default LoginPage;
