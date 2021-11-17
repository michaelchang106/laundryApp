import ProviderForm from "../components/signups/SignUpProviderForm";
import { useNavigate } from "react-router-dom";

const SignUpProviders = () => {
  let navigate = useNavigate();
  const postProviderData = async (data) => {
    delete data.confirmPassword;

    fetch("api/createCustomer", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Laundry Service Provider Sign Up</h1>
      <ProviderForm postProviderData={postProviderData} />
    </div>
  );
};

export default SignUpProviders;
