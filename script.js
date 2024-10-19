// Collapsible Sidebar
// const sidebar = document.getElementById('sidebar');
// const collapseBtn = document.getElementById('collapse-btn');
// const mainContent = document.getElementById('main-content');
// collapseBtn.addEventListener('click', () => {
//     sidebar.classList.toggle('collapsed');
// });

// Collapsible Sidebar Logic
// Select the sidebar once using either method
// Get elements once to avoid redeclaration
const sidebar = document.getElementById('sidebar'); // Get the sidebar element
const collapseBtn = document.getElementById('collapse-btn'); // Get the collapse button
const darkModeCheckbox = document.getElementById('dark-mode-checkbox'); // Get the dark mode checkbox
const collapseIcon = document.getElementById('collapse-icon'); // Get the collapse icon element

// Initialize dark mode based on saved preference
if (document.body.classList.contains('dark-mode')) {
    darkModeCheckbox.checked = true; // Set checkbox based on current mode
}

// Add event listener to the collapse button
collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');

    // Update the icon based on whether the sidebar is collapsed or not
    if (sidebar.classList.contains('collapsed')) {
        collapseIcon.innerHTML = '>>'; // Forward arrow when collapsed
        collapseBtn.innerHTML = '<span id="collapse-icon">>></span>'; // Arrow only when collapsed
    } else {
        collapseIcon.innerHTML = '<<'; // Backward arrow when open
        collapseBtn.innerHTML = '<span id="collapse-icon"><<</span> Collapse'; // Arrow + Collapse text
    }

    // Hide or show the dark mode toggle based on the sidebar state
    if (sidebar.classList.contains('collapsed')) {
        // Hide dark mode toggle when collapsed
        darkModeCheckbox.parentElement.style.display = 'none'; // Hides the toggle
    } else {
        // Show dark mode toggle when expanded
        darkModeCheckbox.parentElement.style.display = 'flex'; // Shows the toggle
    }
});

// Add event listener to the checkbox for dark mode
darkModeCheckbox.addEventListener('change', () => {
    // Toggle dark mode class on body and sidebar
    document.body.classList.toggle('dark-mode');
    sidebar.classList.toggle('dark-mode');

    // Toggle dark mode class on other elements if necessary
    const overviewCards = document.querySelectorAll('.overview-card');
    const chartContainers = document.querySelectorAll('.chart-container');
    const eventTables = document.querySelectorAll('.events-table');
    const modalContents = document.querySelectorAll('.modal-content');
    const navItems = document.querySelectorAll('.nav-item');
    const filters = document.querySelector('.filters');
    const filterInputs = document.querySelectorAll('.filters input[type="text"], .filters select');
    const resultsDisplay = document.querySelector('.results-display');
    const buttons = document.querySelectorAll('button');

    // Add for mobile navbar
    const mobileNavbar = document.querySelector('.mobile-navbar');
    if (mobileNavbar) {
        mobileNavbar.classList.toggle('dark-mode');
    }

    overviewCards.forEach(card => card.classList.toggle('dark-mode'));
    chartContainers.forEach(chart => chart.classList.toggle('dark-mode'));
    eventTables.forEach(table => table.classList.toggle('dark-mode'));
    modalContents.forEach(modal => modal.classList.toggle('dark-mode'));
    navItems.forEach(nav => nav.classList.toggle('dark-mode'));

    // Toggle dark mode for your filters section, inputs, and buttons
    filters.classList.toggle('dark-mode');
    filterInputs.forEach(input => input.classList.toggle('dark-mode'));
    resultsDisplay.classList.toggle('dark-mode');
    buttons.forEach(button => button.classList.toggle('dark-mode'));

    // Change button text based on mode
    if (document.body.classList.contains('dark-mode')) {
        darkModeCheckbox.nextElementSibling.textContent = ''; // Change to Light Mode
    } else {
        darkModeCheckbox.nextElementSibling.textContent = ''; // Change to Dark Mode
    }
});


// // Chart.js Implementation
// const ctx = document.getElementById('eventChart').getContext('2d');
// const eventChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         datasets: [{
//             label: '',
//             data: [1200, 1900, 3000, 5000, 2300, 3000, 5000, 2000, 3000, 4000, 2500, 3500],
//             backgroundColor: '#8576FF',
//             borderColor: '#7019e2',
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });


// Assuming you have a dark mode check in your code
const isDarkMode = true; // or detect dark mode dynamically

const ctx = document.getElementById('eventChart').getContext('2d');
const eventChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: '',
            data: [1200, 1900, 3000, 5000, 2300, 3000, 5000, 2000, 3000, 4000, 2500, 3500],
            backgroundColor: '#8576FF',
            borderColor: '#7019e2',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                ticks: {
                    color: isDarkMode ? '#ffffff' : '#000000', // Changes the X-axis label color
                },
                grid: {
                    color: isDarkMode ? '#444' : '#grey' // Grid color for dark mode
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: isDarkMode ? '#ffffff' : '#000000', // Changes the Y-axis label color
                },
                grid: {
                    color: isDarkMode ? '#444' : '#grey' // Grid color for dark mode
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: isDarkMode ? '#ffffff' : '#000000' // Changes the legend text color
                }
            }
        }
    }
});


// Carousel Slider
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Event listeners for next and previous buttons
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length; // Loop through slides
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Loop backwards through slides
    updateCarousel();
});

// Update the carousel based on current index
function updateCarousel() {
    const offset = -currentIndex * 100; // Calculate the offset for the current slide
    items.forEach((item) => {
        item.style.transform = `translateX(${offset}%)`; // Move the items
    });
}

// Select the modal and close button
const modal = document.getElementById('eventModal');
const closeBtn = document.querySelector('.close-btn');

// Function to open the modal and populate it with event data
function openModal(eventData) {
    document.getElementById('modal-event-name').textContent = eventData.name;
    document.getElementById('modal-event-date').textContent = eventData.date;
    document.getElementById('modal-event-description').textContent = eventData.description;

    const speakersContainer = document.getElementById('modal-speakers');
    speakersContainer.innerHTML = ''; // Clear previous speakers

    eventData.speakers.forEach(speaker => {
        const img = document.createElement('img');
        img.src = speaker.image;
        img.alt = speaker.name;
        speakersContainer.appendChild(img);
    });

    document.getElementById('modal-attendees').textContent = 
        `${eventData.speakers.length} Guest Speakers: ${eventData.speakers.map(s => s.name).join(', ')}.\n${eventData.attendees} Attendees`;
    
    modal.style.display = 'flex'; // Show the modal
}

// Close modal when clicking on close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Example event data to test with
const eventData = {
    name: 'Sample Event',
    date: 'October 18, 2024',
    description: 'This is a sample description of the event.',
    speakers: [
        { name: 'Speaker name A', image: '/img/Container.png' },
        { name: 'Speaker name B', image: '/img/Container (1).png' },
        { name: 'Speaker name C', image: '/img/Container (2).png' }
    ],
    attendees: 300
};

// Attach event listeners to all rows with class 'event-row'
document.querySelectorAll('.event-row').forEach(row => {
    row.addEventListener('click', () => {
        openModal(eventData); // Pass the event data to openModal function
    });
});



// Toggle sidebar on mobile menu icon click
const menuToggle = document.getElementById('menu-toggle');
// const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const closeIcon = document.getElementById('close-icon');

// Toggle sidebar and icons
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open'); // Toggle sidebar open/close

    // Toggle between hamburger and close icons
    if (sidebar.classList.contains('open')) {
        hamburger.style.display = 'none';  // Hide hamburger icon
        closeIcon.style.display = 'block'; // Show close icon
    } else {
        hamburger.style.display = 'block';  // Show hamburger icon
        closeIcon.style.display = 'none';   // Hide close icon
    }
});




