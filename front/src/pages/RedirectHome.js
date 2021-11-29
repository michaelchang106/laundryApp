/* MICHAEL CHANG */

import { useNavigate } from "react-router-dom";

function RedirectHome() {
  const navigate = useNavigate();

  function delayedRedirectHome() {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  delayedRedirectHome();

  return (
    <div>
      <p>Thanks! Redirecting to Home....</p>
    </div>
  );
}

export default RedirectHome;
