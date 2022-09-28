//Variables
const carrito = document.querySelector("#carrito")

const containerCarrito = document.querySelector("#lista-carrito tbody")

const emptyCarrito = document.querySelector("#vaciar-carrito")

const courseList = document.querySelector("#lista-cursos")

//Variable with the articles in the cart
let cartArticles = []



chargeEventListeners()
//Function with all event listener, because we are going to need at least for the moment each event listenar for delete and add course to the carrito

function chargeEventListeners() {

    //When you add a course presioning "agregar al carrito"
    courseList.addEventListener("click", addCourse)

    //Remove courses from cart
    carrito.addEventListener("click", removeCourses)

    //Empty cart
    emptyCarrito.addEventListener("click", () => {
        cartArticles = [] //Restart the cartArticlesArray
        deleteCourses() //To clean all HTML
    })
}


//Functions
function addCourse(e) {

    e.preventDefault()

    if (e.target.classList.contains("agregar-carrito")) {
        const selectedCourse = e.target.parentElement.parentElement
        readDataCourse(selectedCourse)
    }
}

//Remove course from the cart
function removeCourses(e) {
    // console.log(e.target.classList)
    if (e.target.classList.contains("borrar-curso")) {
        const courseId = e.target.getAttribute("data-id")

        //Delete from the array "cartArticles" through "data-id"
        cartArticles = cartArticles.filter(curso => curso.id !== courseId)

        htmlCart()
    }
}


//Read the contain we gave click and to take the information about the course
function readDataCourse(curso) {
    console.log("-----------------", curso)

    //Creating and object with all the info of course selected
    const infoCourse = {
        image: curso.querySelector("img").src,
        title: curso.querySelector("h4").textContent,
        price: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        quantity: 1
    }

    //Checking if an element is already exist in the cart
    const articleExist = cartArticles.some(curso => curso.id === infoCourse.id)
    if (articleExist) {
        //Update the article exist
        const courses = cartArticles.map(curso => {
            if (curso.id === infoCourse.id) {
                curso.quantity++
                return curso //it returns the updated object
            } else {
                return curso
            }
        })
        cartArticles = [...courses]
    } else {
        //Adding elements to the cart array
        cartArticles = [...cartArticles, infoCourse]
    }

    console.log(cartArticles)

    htmlCart()
}


//Show cart in the HTML

function htmlCart() {

    //Clean the HTML
    deleteCourses()


    //Run cart and create HTML
    cartArticles.forEach(article => {
        const { image, title, price, quantity, id } = article
        const row = document.createElement("tr")
        row.innerHTML = `
            <td><img src="${image}"></td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `

        //Add HTML del carrito en el tbody
        containerCarrito.appendChild(row)
    })

}

//Delete courses from tbody

function deleteCourses() {

    //Slow way, not too recommend
    // containerCarrito.innerHTML = ""

    //Faster
    while (containerCarrito.firstChild) {
        containerCarrito.removeChild(containerCarrito.firstChild)
    }
}



