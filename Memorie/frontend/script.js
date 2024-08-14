let player1 = 0;
let player2 = 0;
let isFirstPlayer = true;

(async () => {
    const board = document.getElementById("board");
    const cards = [];

    const res = await fetch("/images");
    const images = await res.json();
    images.forEach((image, i) => {

        cards.push({i, image}, {i, image});
    });

    cards.sort(() => Math.random() - 0.5);

    cards.forEach(c => {
        const div = document.createElement("div");
        div.style.backgroundImage = `url("/images/${c.image}")`;
        board.appendChild(div);
        c.div = div;

        div.addEventListener("mouseover", () => {
            cards.filter(x => x.i == c.i).forEach(c => {
                c.div.classList.add("cheat");
            })
        })

        div.addEventListener("mouseout", () => {
            cards.forEach(c => {
                c.div.classList.remove("cheat");
            })
        })

        div.addEventListener("click", () => {
            if (c.showed) return;

            const showed = cards.filter(c => c.showed);

            if (showed.length < 2) {
                div.classList.add("showed");
                c.showed = true;
            }

            if (showed.length === 2) return;
            if (showed.length) {
                const prev = showed[0];
                const current = c;

                if (prev.i === current.i) {
                    setTimeout(() => {
                        prev.div.classList.add("found");
                        current.div.classList.add("found");
                        prev.div.classList.remove("showed");
                        current.div.classList.remove("showed");

                        prev.showed = false;
                        current.showed = false;
                        if (isFirstPlayer) {
                            player1++;
                        } else {
                            player2++;
                        }
                    }, 500); 
                } else {
                    setTimeout(() => {
                        prev.div.classList.remove("showed");
                        current.div.classList.remove("showed");

                        prev.showed = false;
                        current.showed = false;

                        isFirstPlayer = !isFirstPlayer;
                    }, 1500)
                }
            }
        })
    })
})();

