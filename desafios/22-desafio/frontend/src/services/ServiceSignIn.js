async function SignIn(email, password) {
  console.log(email, password);

  return fetch("http://localhost:8007/api/usuario/signIn", {
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "PHPSESSID=be7656af4fff8e23d70e1afb110c0594",
    },
    method: "POST",
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("Invalid Request");
    })
    .then((data) => data)
    .catch(() => {
      return "Datos incorrectos";
    });
}
export default SignIn;
