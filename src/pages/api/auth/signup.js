import { hash } from "bcrypt";
import Users from "@/models/userModel";
import dbConnect from "@/dbConnect";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { fullname, email, password } = req.body;

    const emailCheck = await Users.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await hash(password, 10);
    const user = await Users.create({
      fullname,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({ msg: "User Already Registered" });
    }

    delete user.password;
    return res.status(200).json({ user });
  } else {
    res.status(500).json({ msg: "Only Post Request is Allowed" });
  }
}
