
fetch('http://localhost:4444/files')
    .then(res => res.json())
    .then(data => {
        data.forEach(imgUrl => {
            const div = document.createElement('div')
            div.className = 'img';
            div.style.backgroundImage = `url('http://localhost:4444/files/${imgUrl}')`
            document.querySelector('#grid').appendChild(div)

            const btn = document.createElement('button')
            btn.innerHTML = 'X'
            btn.className = 'remove'
            btn.addEventListener('click', () => {
                if(!confirm('Are you sure?')) return
                fetch(`http://localhost:4444/files/${imgUrl}`, { method: 'DELETE' })
                    .then(() => {
                        div.remove()
                    })
            })
            div.appendChild(btn)
        })
        showSlides(slideIndex)
    })
