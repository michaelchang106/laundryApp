import { useState } from "react";
import Services from "../components/provider/Services.js";

const ProviderPage = () => {
  let [displayServices, setDisplaySerivces] = useState(false);
  let [editServices, setEditServices] = useState(false);

  return (
    <div>
      <div>
        <h1>Provider Page</h1>
        <div className="serviceDetails">
          <h3>Services By You:</h3>
          <Services
            displayServices={displayServices}
            setDisplaySerivces={setDisplaySerivces}
            editServices={editServices}
            setEditServices={setEditServices}
          />
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;
