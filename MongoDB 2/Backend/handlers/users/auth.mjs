import { app } from "../../App.mjs";
import { User } from "./users.model.mjs";
import bcrypt from "bcrypt";

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(403).send("Email or Password is incorrect");
        return;
    }

    if (!user.password || !(await bcrypt.compare(password, user.password))) {
        res.status(403).send("Email or Password is incorrect");
        return;
    }

    req.session.user = user;
    res.send(user)
});

app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    if (await User.findOne({ email })) {
        res.status(403).send("Email already exists");
        return;
    }

    const user = new User({
        firstName,
        lastName,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
    });

    const newUser = await user.save();

    res.send(newUser);
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        return res.status(401).send("Not logged in");
    }
});

app.get("/logout", (req, res) => {
    delete req.session.user;
    res.send("Logged out");
});