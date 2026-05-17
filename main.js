/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== EVENTS DATA & RENDER ===============*/
const events = [
    {
        id: 1,
        title: "St. Antony Feast Celebration",
        duration: "3 Hours",
        date: "Jan 30, 2026",
        img: "https://images.unsplash.com/photo-1545627638-761358ef9ddf?q=80&w=1000&auto=format&fit=crop",
        description: "A special liturgical celebration honoring our patron saint."
    },
    {
        id: 2,
        title: "Spiritual Trip to Monastery",
        duration: "2 Days",
        date: "Feb 15-16, 2026",
        img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop",
        description: "A spiritual retreat to the Monastery of St. Antony in the Eastern Desert."
    },
    {
        id: 3,
        title: "Youth Annual Conference",
        duration: "3 Days",
        date: "Mar 10-12, 2026",
        img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop",
        description: "Three days of spiritual talks, workshops, and community building."
    }
]

const eventsList = document.getElementById('events-list')

const renderEvents = () => {
    eventsList.innerHTML = events.map(event => `
        <article class="event__card">
            <img src="${event.img}" alt="${event.title}" class="event__img">
            <div class="event__data">
                <h3 class="event__title">${event.title}</h3>
                <div class="event__info">
                    <i class="ri-calendar-line"></i>
                    <span>${event.date}</span>
                </div>
                <div class="event__info">
                    <i class="ri-time-line"></i>
                    <span>${event.duration}</span>
                </div>
                <p class="event__description">${event.description}</p>
                <button class="button event__btn" onclick="openBooking('${event.title}')">Book Now</button>
            </div>
        </article>
    `).join('')
}

renderEvents()

/*=============== BOOKING MODAL ===============*/
const modal = document.getElementById('booking-modal'),
      modalClose = document.getElementById('modal-close'),
      eventNameDisplay = document.getElementById('selected-event-name'),
      bookingForm = document.getElementById('booking-form'),
      bookingSuccess = document.getElementById('booking-success')

const openBooking = (eventName) => {
    eventNameDisplay.textContent = eventName
    modal.classList.add('show-modal')
    bookingForm.style.display = 'grid'
    bookingSuccess.style.display = 'none'
}

modalClose.addEventListener('click', () => {
    modal.classList.remove('show-modal')
})

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.remove('show-modal')
    }
})

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // Simulate booking process
    bookingForm.style.display = 'none'
    bookingSuccess.style.display = 'flex'
})
