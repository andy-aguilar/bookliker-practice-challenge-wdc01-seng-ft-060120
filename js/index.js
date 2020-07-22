const BOOKSURL = "http://localhost:3000/books"
const USERURL = "http://localhost:3000/users/1"

document.addEventListener("DOMContentLoaded", function() {
    
    fetchBooks()

});

const listUl = document.getElementById("list")
const showDiv = document.getElementById("show-panel")

function fetchBooks() {
    fetch(BOOKSURL)
    .then(resp => resp.json())
    .then(books => {
        renderBooksList(books)
    })
}

function renderBooksList(books) {
    books.forEach(renderBookLi)

}

function renderBookLi(book) {
    
    const bookLi = document.createElement("li")
    bookLi.innerText = book.title
    bookLi.addEventListener("click", (e) => {
        showDiv.innerHTML = "";
        renderBookShow(book)
    })
    listUl.appendChild(bookLi)
}

function renderBookShow(book){
    // Render Image
    const image = document.createElement("img")
    image.src = book.img_url
    image.alt= `Cover of ${book.title}`
    showDiv.appendChild(image)
    // Render Title
    const title = document.createElement("h1")
    title.innerText = book.title
    showDiv.appendChild(title)
    // Render Subtitle
    if (book.subtitle){
        const subTitle = document.createElement("h2")
        subTitle.innerText = book.subtitle
        showDiv.appendChild(subTitle)
    }
    // Render Author
    const authorH2 = document.createElement("h2")
    authorH2.innerText = book.author
    showDiv.appendChild(authorH2)
    // Render Description
    const description = document.createElement("p")
    description.innerText = book.description
    showDiv.appendChild(description)
    // Render Users Li
    const likers = document.createElement("ul")
    likers.className = "likers"
    showDiv.appendChild(likers)
    book.users.forEach (renderUser)
    // Render Button
    const button = document.createElement("button")
    const user1 = book.users.find(function(user){return user.id === 1})
    const userIndex = book.users.findIndex(function(user){return user.id === 1})
    if (user1){
        button.innerText = "UNLIKE"
    }
    else {
        button.innerText = "LIKE"
    }
    
    showDiv.appendChild(button)
    button.addEventListener("click", (e)=> {
        if (user1){
            delete book.users[userIndex]
            console.log(book)
            let bookConfig = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(book)
            }
            fetch(`${BOOKSURL}/${book.id}`, bookConfig )
            .then(resp => resp.json)

        }
        else{}
    })
}

function renderUser(user) {
    let likers = document.querySelector(".likers")
    let li = document.createElement("li")
    li.innerText = user.username
    likers.appendChild(li)
}
