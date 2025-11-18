import mongoose from "mongoose";
import User from "../models/user.model.js";

mongoose
  .connect("mongodb+srv://tsarao1:Sugar%402340@cluster0.tuux54n.mongodb.net/Portfolio?appName=Cluster0", { useNewUrlParser: true })
  .then(async () => {
    const exists = await User.findOne({ email: "tabyakaursarao@gmail.com" });

    if (exists) {
      console.log("Admin already exists");
      process.exit();
    }

    await User.create({
      email: "tabyakaursarao@gmail.com",
      password: "tabya11110",
      role: "admin",
    });

    console.log("Admin created: tabyakaursarao@gmail.com / tabya11110");
    process.exit();
  })
  .catch((err) => console.error(err));
