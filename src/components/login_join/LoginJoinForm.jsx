import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogin, onSignUp } from "../../apis/request";

const LoginJoinForm = () => {
  const [signup, setSignup] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (ACCESS_TOKEN) {
      navigate("/todo");
    }
  }, [ACCESS_TOKEN, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (signup) {
      const res = await onSignUp({ email, password }).catch((error) => console.log(error));
      setLocalStorage(res, 201);
    } else {
      const res = await onLogin({ email, password }).catch((error) => console.log(error));
      setLocalStorage(res, 200);
    }
  };

  const setLocalStorage = (res, statusCode) => {
    if (res.status === statusCode) {
      localStorage.setItem("accessToken", `Bearer ${res.data.access_token}`);
      navigate("/todo");
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      case "signup":
        return setSignup(checked);
      default:
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <input name="email" type="text" placeholder="Email" value={email} onChange={onChange} required />
      <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} />
      <div>
        <input name="signup" id="signup" type="checkbox" onChange={onChange} checked={signup} />
        <label htmlFor="signup">아직 회원이 아니세요?</label>
      </div>
      <button type="submit" disabled={!email.includes("@") || password.length < 8}>
        {signup ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

export default LoginJoinForm;
