import ProviderForm from "../components/signups/SignUpProviderForm";

const SignUpProviders = () => {
  const submitFormHandle = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div>
      <h1>Laundry Service Provider Sign Up</h1>
      <ProviderForm submitHandle={submitFormHandle} />
    </div>
  );
};

export default SignUpProviders;
