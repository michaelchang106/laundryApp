async function createLoginHandler(data) {
  await fetch("/createLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export default createLoginHandler;
