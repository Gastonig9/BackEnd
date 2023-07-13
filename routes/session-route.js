import { Router } from "express";
import UserManager from "../src/dao/models/user.manager.js";

const router = Router();
const uManager = new UserManager();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, age, password } = req.body;
    console.log(req.body)
    let getUser = await uManager.register(
      firstName,
      lastName,
      email,
      age,
      password
    );
    console.log(getUser)

    if (getUser) {
      res.status(200).send("User register");
    } else {
      res.status(401).send("Could not register user");
    }
  } catch (error) {
    res.send("An error ocurred" + error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await uManager.login(email, password);

    if (user) {
      let userRole = false;
      
      if (email.includes("admin")) {
        userRole = true;
      }

      req.session.user = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        role: userRole,
      };

      res.send({
        status: "success",
        payload: req.session.user,
        message: "¡Inicio de sesión exitoso!"
      });
    } else {
      res.status(401).send("Could not login user");
    }
  } catch (error) {
    res.send("An error occurred" + error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

export default router;
