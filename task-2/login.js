const login = () => {
  const validEmail = "example@example.com";
  const validEmailSecond = "example2@example2.com";
  const validPassword = "password123";
  const validPasswordSecond = "secondpassword123";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (
    (email === validEmail && password === validPassword) ||
    (email === validEmailSecond && password === validPasswordSecond)
  ) {
    let user = {
      email: email,
      username: "exampleUser",
      age: null,
    };
    if (email === validEmail) {
      user.age = 29;
    } else {
      user.age = 31;
    }
    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "./products.html";
  } else {
    alert("ERROR: Invalid email or password");
  }
};
