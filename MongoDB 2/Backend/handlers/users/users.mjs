import { app } from "../../App.mjs";
import { User } from "./users.model.mjs";
import { guard } from "../../Guard.mjs";

app.get("/users", guard, async (req, res) => {
    res.send(await User.find({ isDeleted: [false, undefined]}));
});

app.get("/users/:id", guard, async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(403).send("User not found");
        return;
    }

    res.send(user);
});

app.post("/users", guard, async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
    });

    const newUser = await user.save();

    res.send(newUser);
});

app.put("/users/:id", guard,  async (req, res) => {
    const { firstName, lastName, email, phone } = req.body;

    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(403).send("User not found");
        return;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;

    await user.save();

    res.send(user);
})

app.delete("/users/:id", guard, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isDeleted: true });

    res.end();
});