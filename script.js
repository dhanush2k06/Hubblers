const events = [
    { id: 1, title: "AI Ethics Symposium 2026", category: "symposium", date: "Oct 12", price: "Free" },
    { id: 2, title: "React & Next.js Workshop", category: "workshop", date: "Nov 05", price: "$10" },
    { id: 3, title: "Bio-Medical Conference", category: "symposium", date: "Dec 01", price: "$25" },
    { id: 4, title: "Global Health Summit", category: "symposium", date: "Jan 15", price: "$50" },
    { id: 5, title: "Web Dev Bootcamp", category: "workshop", date: "Feb 10", price: "$99" },
    { id: 6, title: "Creative Writing Masterclass", category: "workshop", date: "Mar 05", price: "Free" },
    { id: 7, title: "Data Science Summit", category: "symposium", date: "Apr 20", price: "$45" },
    { id: 8, title: "Mobile App Design", category: "workshop", date: "May 12", price: "$15" },
    { id: 9, title: "Cybersecurity Forum", category: "symposium", date: "Jun 08", price: "Free" },
    { id: 10, title: "Python for Beginners", category: "workshop", date: "Jul 14", price: "$20" },
    { id: 11, title: "UI/UX Trends 2026", category: "symposium", date: "Aug 05", price: "$30" },
    { id: 12, title: "Machine Learning Lab", category: "workshop", date: "Sep 18", price: "$55" },
    { id: 13, title: "Cloud Computing Expo", category: "symposium", date: "Oct 05", price: "$40" },
    { id: 14, title: "JS Performance Workshop", category: "workshop", date: "Nov 20", price: "$15" },
    { id: 15, title: "AI in Medicine", category: "symposium", date: "Dec 10", price: "Free" },
];

const eventGrid = document.getElementById('eventGrid');
const searchInput = document.getElementById('eventSearch');
let currentCategory = 'all';

// Auth elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

function displayEvents(filteredEvents) {
    if (filteredEvents.length === 0) {
        eventGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #636e72;">
            <h3>No events found matching your search.</h3>
        </div>`;
        return;
    }
    eventGrid.innerHTML = filteredEvents.map(event => `
        <div class="card">
            <div class="card-content">
                <span class="card-tag">${event.category.toUpperCase()}</span>
                <h3>${event.title}</h3>
                <p>📅 ${event.date} | 💰 ${event.price}</p>
                <button class="btn-book" onclick="bookTicket(${event.id})">Get Ticket</button>
            </div>
        </div>
    `).join('');
}

function filterEvents() {
    if (!searchInput) return;
    const term = searchInput.value.toLowerCase().trim();
    const filtered = events.filter(ev => {
        const matchesSearch = ev.title.toLowerCase().includes(term) || 
                             ev.category.toLowerCase().includes(term);
        const matchesCategory = currentCategory === 'all' || ev.category === currentCategory;
        return matchesSearch && matchesCategory;
    });
    displayEvents(filtered);
}

// Event Listeners
if (searchInput) {
    searchInput.addEventListener('input', filterEvents);
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        filterEvents();
    });
});

// Auth Form Handling
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Logged in as ${email}. Your event participation and rewards are now synced!`);
        window.location.href = 'index.html';
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.querySelector('input[type="text"]').value;
        alert(`Welcome, ${name}! Your student account has been created. Start participating to earn rewards.`);
        window.location.href = 'login.html';
    });
}

// Initial Render
if (eventGrid) {
    const isEventsPage = window.location.pathname.includes('events.html');
    if (isEventsPage) {
        displayEvents(events);
    } else {
        displayEvents(events.slice(0, 3));
    }
}

function bookTicket(id) {
    alert(`Redirecting to checkout for Event ID: ${id}`);
    // In a real app, this would link to a Stripe checkout page
}