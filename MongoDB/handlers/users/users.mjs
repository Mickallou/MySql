import { app } from "../../App.mjs";
import { User } from "./users.model.mjs";

app.get("/users", async (req, res) => {
    res.send(await User.find());
});

app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(403).send("User not found");
        return;
    }

    res.send(user);
});

app.post("/users", async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
    });

    const newUser = await user.save();

    res.send(newUser);
});

app.put("/users/:id", async (req, res) => {
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

app.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    res.end();
});