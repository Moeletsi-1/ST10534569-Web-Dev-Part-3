document.addEventListener("DOMContentLoaded", () => {
    const servicesData = [
        {
            id: 1,
            title: "Local News Broadcasts",
            category: "Media",
            priority: 1,
            description: "We produce regular news broadcasts covering events, announcements and stories from across the Mangaung Metropolitan area. Our broadcasts give residents access to information that is relevant to their local communities. We aim to highlight important developments, community achievements, public announcements, and stories that may otherwise receive limited attention."
        },
        {
            id: 2,
            title: "Community Event Coverage",
            category: "Media",
            priority: 2,
            description: "We attend and cover local community events, sports days, school activities and municipal announcements, and share them with everyone in our community. Our coverage helps showcase the people and organisations that contribute to community life. We capture important moments and share stories that celebrate local participation and achievement."
        },
        {
            id: 3,
            title: "Skills Development Workshops",
            category: "Education",
            priority: 3,
            description: "We host workshops that teach valuable skills to members of the community, free of charge. Our workshops focus on practical knowledge that can be useful in everyday life, education, and the workplace. Topics may include digital skills, communication, entrepreneurship, career preparation, and other areas based on community needs."
        },
        {
            id: 4,
            title: "Advertising and Sponsorship Slots",
            category: "Business",
            priority: 4,
            description: "Local businesses and organisations can advertise on our channel or sponsor a segment to reach the Mangaung community. These opportunities provide businesses with a way to introduce their products, services, and initiatives to a local audience. Sponsors can also support community-focused content while gaining visibility for their organisation."
        },
        {
            id: 5,
            title: "Volunteer Programmes",
            category: "Community",
            priority: 5,
            description: "We offer volunteer opportunities for residents who want to gain experience in the public service. Volunteers can assist with community activities, events, and other local initiatives. The volunteer opportunities allow participants to contribute their time and skills while gaining practical experience."
        }
    ];

    const servicesContainer = document.getElementById("services-container");
    if (servicesContainer) {
        servicesData.forEach(service => {
            const li = document.createElement("li");
            li.className = "service-item";
            li.innerHTML = `
                <div class="service-header">
                    <b>${service.title}</b>
                    <span class="toggle-icon">+</span>
                </div>
                <div class="service-content">
                    <p>${service.description}</p>
                </div>
            `;
            servicesContainer.appendChild(li);
        });

    
        const headers = servicesContainer.querySelectorAll(".service-header");
        headers.forEach(header => {
            header.addEventListener("click", function() {
                this.parentElement.classList.toggle("active");
                const icon = this.querySelector(".toggle-icon");
                icon.textContent = this.parentElement.classList.contains("active") ? "-" : "+";
            });
        });
    }



    const featureImages = document.querySelectorAll(".feature-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");

    if (featureImages.length > 0 && lightbox) {
        featureImages.forEach(img => {
            img.addEventListener("click", () => {
                lightbox.style.display = "block";
                lightboxImg.src = img.src;
            });
        });

        closeBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

 

    const revealElements = document.querySelectorAll("h2, h3, p, ul, form");
    
    revealElements.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

});
    const postForm = document.getElementById("post-form");
    const postsContainer = document.getElementById("posts-container");
    const postSearch = document.getElementById("post-search");

    let bulletinPosts = JSON.parse(localStorage.getItem("mangaungPosts")) || [
   
    ];

    function renderPosts(filterText = "") {
        if (!postsContainer) return;
        postsContainer.innerHTML = "";

  
        const filteredPosts = bulletinPosts.filter(post => 
            post.title.toLowerCase().includes(filterText.toLowerCase()) ||
            post.content.toLowerCase().includes(filterText.toLowerCase()) ||
            post.category.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filteredPosts.length === 0) {
            postsContainer.innerHTML = "<p style='width:100%; text-align:center;'>No posts found matching your search.</p>";
            return;
        }

     
        filteredPosts.forEach(post => {
            const postCard = document.createElement("div");
            postCard.className = "bulletin-card";
            
            const categoryClass = `cat-${post.category.toLowerCase().replace(/\s+/g, '-')}`;

            postCard.innerHTML = `
                <div class="bulletin-header">
                    <span class="bulletin-category ${categoryClass}">${post.category}</span>
                    <span class="bulletin-date">${post.date}</span>
                </div>
                <h4>${post.title}</h4>
                <p class="bulletin-author"><strong>By:</strong> ${post.name}</p>
                <p class="bulletin-desc">${post.content}</p>
                <button class="delete-btn" onclick="deleteBulletinPost(${post.id})">Delete Post</button>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    window.deleteBulletinPost = function(id) {
        if(confirm("Are you sure you want to delete this post?")) {
            bulletinPosts = bulletinPosts.filter(post => post.id !== id);
            localStorage.setItem("mangaungPosts", JSON.stringify(bulletinPosts));
            renderPosts(postSearch ? postSearch.value : "");
        }
    }

    if (postForm) {
        renderPosts();

        postForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const newPost = {
                id: Date.now(), 
                name: document.getElementById("post-name").value,
                category: document.getElementById("post-category").value,
                title: document.getElementById("post-title").value,
                content: document.getElementById("post-content").value,
                date: new Date().toLocaleDateString()
            };

            bulletinPosts.unshift(newPost); 
            localStorage.setItem("mangaungPosts", JSON.stringify(bulletinPosts)); 
            
            renderPosts(postSearch ? postSearch.value : ""); 
            postForm.reset(); 
            alert("Post published successfully!");
        });

        if (postSearch) {
            postSearch.addEventListener("input", (e) => {
                renderPosts(e.target.value);
            });
        }
    }


    const enquiryForm = document.getElementById("enquiry-form");
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function(e) {
            e.preventDefault(); 
            
            let isValid = true;
  
            const name = document.getElementById("fullname").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const enquiryType = document.querySelector('input[name="enquiryType"]:checked');
            const service = document.getElementById("service-interest").value;
            const message = document.getElementById("message").value.trim();

            document.querySelectorAll('.error-msg').forEach(el => el.textContent = "");

            if (name.length < 3) { showError("error-fullname", "Name must be at least 3 characters."); isValid = false; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("error-email", "Please enter a valid email address."); isValid = false; }
            if (!/^0\d{2}\s?\d{3}\s?\d{4}$/.test(phone)) { showError("error-phone", "Please enter a valid SA phone number (e.g., 051 123 4567)."); isValid = false; }
            if (!enquiryType) { showError("error-enquiryType", "Please select an enquiry type."); isValid = false; }
            if (service === "") { showError("error-service", "Please select a service."); isValid = false; }
            if (message.length < 10) { showError("error-message", "Message must be at least 10 characters."); isValid = false; }

            if (isValid) {
                const btn = document.getElementById("enquiry-submit");
                btn.value = "Processing...";
                btn.disabled = true;

                setTimeout(() => {
                    btn.value = "Send Enquiry";
                    btn.disabled = false;
                    enquiryForm.reset();

                    const responseBox = document.getElementById("enquiry-response");
                    responseBox.style.display = "block";
                    responseBox.className = "response-box success-box";
                    
                    let costResponse = "";
                    if(service === "News" || service === "Events") {
                        costResponse = "This service is free for community members.";
                    } else if (service === "Advertising") {
                        costResponse = "Costs start at R500 for a 30-second slot. Availability is currently open for next month.";
                    } else {
                        costResponse = "Workshops are fully booked for this month, but new sessions open next week.";
                    }

                    responseBox.innerHTML = `
                        <h4>Thank you, ${name}!</h4>
                        <p><strong>Regarding your enquiry about: ${service}</strong></p>
                        <p>${costResponse}</p>
                        <p>We have received your message and will contact you at ${email} shortly.</p>
                    `;
                    window.scrollTo({ top: responseBox.offsetTop - 100, behavior: 'smooth' });
                }, 1500); 
            }
        });
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const type = document.getElementById("message-type").value;
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            document.querySelectorAll('.error-msg').forEach(el => el.textContent = "");

            if (name.length < 3) { showError("error-name", "Name is too short."); isValid = false; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("error-email-contact", "Invalid email format."); isValid = false; }
            if (type === "") { showError("error-type", "Please select a message type."); isValid = false; }
            if (subject.length < 5) { showError("error-subject", "Subject must be at least 5 characters."); isValid = false; }
            if (message.length < 15) { showError("error-message-contact", "Message must be at least 15 characters."); isValid = false; }

            if (isValid) {
                const btn = document.getElementById("contact-submit");
                btn.value = "Sending...";
                btn.disabled = true;

                setTimeout(() => {
                    btn.value = "Send Message";
                    btn.disabled = false;
                    
                    const responseBox = document.getElementById("contact-response");
                    responseBox.style.display = "block";
                    responseBox.className = "response-box success-box";
          
                    const emailBody = `From: ${name} (${email})%0D%0AType: ${type}%0D%0ASubject: ${subject}%0D%0A%0D%0A${message}`;
                    const mailtoLink = `mailto:info@mangaungcommunity.co.za?subject=${encodeURIComponent(subject)}&body=${emailBody}`;

                    responseBox.innerHTML = `
                        <h4>Message Compiled Successfully!</h4>
                        <p>Your message has been processed. Click the button below to open your default email app and send it to our head office.</p>
                        <a href="${mailtoLink}" class="email-btn">Open Email App & Send</a>
                    `;
                    
                    contactForm.reset();
                    window.scrollTo({ top: responseBox.offsetTop - 100, behavior: 'smooth' });
                }, 1500);
            }
        });
    }

    function showError(id, message) {
        const el = document.getElementById(id);
        if(el) el.textContent = message;
    }