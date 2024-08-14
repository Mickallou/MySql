import { app } from "../../App.mjs";
import { bussinessGuard, getUser, guard } from "../../Guard.mjs";
import { Card } from "./cards.model.mjs";

app.get("/cards", async (req, res) => {
    res.send(await Card.find());
});

app.get("/cards/my-cards", guard, async (req, res) => {
    const user = getUser(req);
    res.send(await Card.find({ user_id: user.userId }));
});

app.post("/cards", guard, bussinessGuard, async (req, res) => {
    const item = req.body;
    const card = new Card({
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        phone: item.phone,
        email: item.email,
        address: {
            state: item.address.state,
            country: item.address.country,
            city: item.address.city,
            street: item.address.street,
            houseNamber: item.address.houseNamber,
            zip: item.address.zip,
        },
        image: {
            url: item.image.url,
            alt: item.image.alt,
        },
        web: item.web,
        user_id: getUser(req)?.userId,
    });
    const newCard = await card.save();
    res.send(newCard);
});