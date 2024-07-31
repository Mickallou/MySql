import { app } from "../../App.mjs";
import { User } from "./users.model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config.mjs";
import { UserLogin, UserSignup } from "./users.joi.mjs";


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const validate = UserLogin.validate({ email, password });

    const user = await User.findOne({ email, isDeleted: { $ne: true } });

    if(validate.error) {
        return res.status(403).send(validate.error.details[0].message);
    }

    if (!user) {
        res.status(403).send("Email or Password is incorrect");
        return;
    }

    if (!user.password || !(await bcrypt.compare(password, user.password))) {
        res.status(403).send("Email or Password is incorrect");
        return;
    }

    const token = jwt.sign({ 
        userId: user._id, 
        firstName: user.firstName,
        lastName: user.lastName,
    }, JWT_SECRET, { expiresIn: '1h'} );

    res.send(token);
});

app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    const validate = UserSignup.validate(req.body, { allowUnknown: true });

    if(validate.error) {
        return res.status(403).send(validate.error.details[0].message);
    }

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
    return res.status(401).send("Please login to access this page");
});
