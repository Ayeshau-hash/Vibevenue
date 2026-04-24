// Homepage background image changer
console.log('script.js loaded');
document.addEventListener('DOMContentLoaded', function () {
    const images = [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=898&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1640882343644-63b72ab9e60a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://cloudfrontgharpediabucket.gharpedia.com/uploads/2023/12/Autumn-Inspired-Home-Outdoor-Wedding-Decor-18-0503010110.jpg',
        'https://plus.unsplash.com/premium_photo-1676838259090-81b78f1c5d11?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];

    let index = 0;
    const homepage = document.getElementById('home');

    function changeBg() {
        if (homepage) {
            homepage.style.backgroundImage = `url(${images[index]})`;
            index = (index + 1) % images.length;
        }
    }

    changeBg();
    setInterval(changeBg, 3000);
});

// Contact background image changer
document.addEventListener('DOMContentLoaded', function () {
    const image = [
        'https://www.paperlesspost.com/blog/wp-content/uploads/080822_Blog_DecorationsForAnOutdoorWedding_01-hero.png',
        'https://www.greenvelope.com/blog/wp-content/uploads/lights-and-flowers-on-a-wall.jpeg',
        'https://www.greenvelope.com/blog/wp-content/uploads/bride-and-groom-holding-hands.jpg',
        'https://cloudfrontgharpediabucket.gharpedia.com/uploads/2023/12/Image-Shows-Arrangement-of-Table-and-Chairs-for-Food-06-0503010110.jpg'
    ];

    let index = 0;
    const contactpage = document.getElementById('contbg');

    function changecontactBg() {
        if (contactpage) {
            contactpage.style.backgroundImage = `url(${image[index]})`;
            index = (index + 1) % image.length;
        }
    }

    changecontactBg();
    setInterval(changecontactBg, 3000);
});

// Modal for gallery image zoom
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");
    const galleryImgs = document.querySelectorAll(".gallery-img");

    galleryImgs.forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
            document.body.classList.add("modal-open");
            setTimeout(() => modal.classList.add("show"), 10);
        });
    });
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            modal.classList.remove("show");
            document.body.classList.remove("modal-open");
        });

        // Close on outside click
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                modal.classList.remove("show");
                document.body.classList.remove("modal-open");
            }
        });
    }
});
//humburger navbar show
function toggleMenu() {
    document.getElementById('nav-link').classList.toggle("show");
}
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("nav-link").classList.remove("show");
    });
});


//AJAX req for form submission
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
bookingForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    // Create FormData object (fix: was misspelled as 'dataform')
    const formData = new FormData(this);

    // Send the data via fetch
    fetch("process_booking.php", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Get the response as text
        })
        .then(data => {
            // Display the response (success or error from PHP)
            document.getElementById("responseMessage").innerHTML = data;
        })
        .catch(error => {
            // Handle fetch/network errors
            console.error("Fetch error:", error);
            document.getElementById("responseMessage").innerHTML = "Error: " + error.message;
        });
});
}

// Reviews functionality - wrapped in guard to only run on reviews.html
(function initReviews() {
    const container = document.getElementById('reviewContainer');
    const form = document.getElementById('reviewForm');
    
    // Exit immediately if not on reviews page
    if (!container || !form) return;
    
    function loadReviews() {
        const container = document.getElementById('reviewContainer');
        if (!container) return;
        fetch('get_reviews.php')
            .then(res => res.json())
            .then(data => {
                container.innerHTML = '';
                container.style.display = "flex";
                container.style.flexDirection = "column";
                container.style.alignItems = "center";
                container.style.justifyContent = "space-evenly";
                container.style.width = "60vw";
                container.style.height = "100vh";
                for (let i = 0; i < data.length; i += 4) {
                    const row = document.createElement('div');
                    row.style.display = "flex";
                    row.style.flexDirection = "row";
                    row.style.justifyContent = "space-evenly";
                    row.style.alignItems = "center";
                    row.style.width = "100%";
                    row.style.marginBottom = "20px";
                    row.style.padding = "0";
                    const reviewsInRow = data.slice(i, i + 4);
                    reviewsInRow.forEach(r => {
                        let stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
                        const box = document.createElement('div');
                        box.className = 'review-box';
                        box.style.flex = "1";
                        box.style.margin = " 0 10px 0 0";
                        box.style.maxWidth = "25%";
                        box.innerHTML = `
                            <div class="stars">${stars}</div>
                            <p>${r.review}</p>
                            <small>- ${r.name}</small>
                        `;
                        row.appendChild(box);
                    });
                    container.appendChild(row);
                }
            })
            .catch(err => console.error('Review load error:', err));
    }

    loadReviews();

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch('save_review.php', {
                method: 'POST',
                body: formData
            }).then(() => {
                this.reset();
                loadReviews();
            });
        });
    }
})();

// Function to navigate to booking contact page (not used - using modal instead)
// function openBookingPage() {
//     window.location.href = 'contactbooking.html';
// }

// Event delegation for booking buttons is at the bottom of this file

// Booking Modal Functions
let basePrice = 0;
let currentService = '';

function openBookingModal(serviceName, price, venueName = '') {
    currentService = serviceName;
    basePrice = price;
    
    const modal = document.getElementById('bookingModal');
    const selectedService = document.getElementById('selectedService');
    const totalPrice = document.getElementById('totalPrice');
    const bookingDetailsForm = document.getElementById('bookingDetailsForm');
    const venueSelect = document.getElementById('venueSelect');
    const decorCheckboxes = document.querySelectorAll('.decor-checkbox');
    const bookingSuccess = document.getElementById('bookingSuccess');
    const bookingConfirm = document.querySelector('.booking-confirm');
    
    if (!modal || !selectedService || !totalPrice) {
        console.error('Modal elements not found!');
        return;
    }
    
    selectedService.textContent = serviceName + ' - Rs ' + price.toLocaleString();
    totalPrice.textContent = price.toLocaleString();
    
    // Reset form
    if (bookingDetailsForm) bookingDetailsForm.reset();
    decorCheckboxes.forEach(cb => cb.checked = false);
    if (bookingSuccess) bookingSuccess.style.display = 'none';
    if (bookingConfirm) bookingConfirm.style.display = 'block';
    
    // Handle venue pre-selection
    if (venueSelect) {
        if (venueName) {
            // Check if venue option already exists
            let venueExists = false;
            for (let i = 0; i < venueSelect.options.length; i++) {
                if (venueSelect.options[i].value === venueName) {
                    venueExists = true;
                    break;
                }
            }
            if (venueExists) {
                venueSelect.value = venueName;
                updateVenuePrice();
            } else {
                // Will be set after dropdown loads
                window.pendingVenue = venueName;
            }
        } else {
            window.pendingVenue = '';
        }
    }
    
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    console.log('Modal opened for:', serviceName, 'Venue pending:', window.pendingVenue);
}

function updateVenuePrice() {
    const venueSelect = document.getElementById('venueSelect');
    if (!venueSelect) return;
    const selectedOption = venueSelect.options[venueSelect.selectedIndex];
    const venuePrice = selectedOption && selectedOption.getAttribute('data-price') ? 
        parseInt(selectedOption.getAttribute('data-price')) : 0;
    calculateTotal(venuePrice);
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

function calculateTotal(venuePrice = 0) {
    let total = basePrice + (venuePrice || 0);
    document.querySelectorAll('.decor-checkbox:checked').forEach(cb => {
        total += parseInt(cb.getAttribute('data-price'));
    });
    const totalPriceEl = document.getElementById('totalPrice');
    if (totalPriceEl) {
        totalPriceEl.textContent = total.toLocaleString();
    }
}

function confirmBooking() {
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const phone = document.getElementById('bookingPhone').value;
    const date = document.getElementById('bookingDate').value;
    const notes = document.getElementById('bookingNotes').value;
    const venueSelect = document.getElementById('venueSelect');
    const venue = venueSelect ? venueSelect.value : '';
    const venuePrice = venueSelect && venueSelect.options[venueSelect.selectedIndex] ? 
        parseInt(venueSelect.options[venueSelect.selectedIndex].getAttribute('data-price') || 0) : 0;

    if (!name || !email || !phone || !date || !venue) {
        alert('Please fill all required fields (*)');
        return;
    }

    // Collect selected decor items
    const decorItems = [];
    document.querySelectorAll('.decor-checkbox:checked').forEach(cb => {
        decorItems.push(cb.nextElementSibling.textContent.trim());
    });

    // Calculate final total
    let total = parseInt(basePrice) + parseInt(venuePrice || 0);
    document.querySelectorAll('.decor-checkbox:checked').forEach(cb => {
        total += parseInt(cb.getAttribute('data-price'));
    });

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('date', date);
    formData.append('service', currentService);
    formData.append('venue', venue);
    formData.append('notes', notes);
    formData.append('total', total);
    formData.append('decor', JSON.stringify(decorItems));
    formData.append('num_of_guest', 0);

    // Show loading state
    const confirmYes = document.querySelector('.confirm-yes');
    const originalText = confirmYes ? confirmYes.textContent : 'Yes, Book Now';
    if (confirmYes) {
        confirmYes.textContent = 'Saving...';
        confirmYes.disabled = true;
    }

    // Submit booking
    fetch('process_booking.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (confirmYes) {
            confirmYes.textContent = originalText;
            confirmYes.disabled = false;
        }

        if (result.success) {
            document.querySelector('.booking-confirm').style.display = 'none';
            document.getElementById('bookingSuccess').innerHTML = `
                <h3>✅ Booking Sent Successfully!</h3>
                <p>We will contact you soon.</p>
                <p><strong>Booking ID:</strong> #${result.booking_id}</p>
            `;
            document.getElementById('bookingSuccess').style.display = 'block';

            setTimeout(() => {
                closeBookingModal();
                document.getElementById('bookingDetailsForm').reset();
                document.querySelectorAll('.decor-checkbox').forEach(cb => cb.checked = false);
                document.getElementById('totalPrice').textContent = basePrice;
            }, 3000);
        } else {
            alert('Error: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Booking error:', error);
        if (confirmYes) {
            confirmYes.textContent = originalText;
            confirmYes.disabled = false;
        }
        alert('Failed to send booking. Please try again.');
    });
}

// Close modal when clicking outside
(function initBooking() {
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }
    
    // Event delegation for booking buttons
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.booking-btn');
        if (btn) {
            const service = btn.getAttribute('data-service');
            const price = parseInt(btn.getAttribute('data-price'));
            const venue = btn.getAttribute('data-venue') || '';
            console.log('Button clicked:', service, price, venue);
            if (service && price) {
                openBookingModal(service, price, venue);
            }
        }
    });
    
    console.log('Services page - booking system initialized');
})();