/* MICHAEL CHANG & DANIEL LISKO */

import homeLandingLaundry from "../images/homeLandingLaundry.jpg";

function Home() {
  return (
    <div>
      <h1>Hamper Dash</h1>
      <div className="row">
        <div className="col-12">
          <p>
            Welcome to Hamper Dash!! We connect you to the best launderers
            around so you can save time and focus on what matters, instead of
            laundry chores. We offer registration as a laundry provider (to
            provide laundry services) on our platform, or as a laundry user (get
            your laundry cleaned).
          </p>
        </div>
        <div className="col-12">
          <img
            style={{
              height: "100%",
              width: "100%",
              "object-fit": "contain",
            }}
            src={homeLandingLaundry}
            alt="Nice and neat laundry room"
          />
          Picture from{" "}
          <a href="https://www.rd.com/wp-content/uploads/2021/09/GettyImages-1181334518-MLedit.jpg?resize=700,467">
            rd.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
