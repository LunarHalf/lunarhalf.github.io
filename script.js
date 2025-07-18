// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
  
  // Simple Scroll-Fade-In Animation for sections
  const faders = document.querySelectorAll(".fade-in-section");
  
  const appearOptions = {
    threshold: 0.2, // When 20% of the section is visible
    rootMargin: "0px 0px -50px 0px" // Start animation 50px before it's fully visible
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("is-visible");
        appearOnScroll.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, appearOptions);
  
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
  
  
  // Toggle Case Study Details within portfolio items
  document.querySelectorAll(".toggle-case-study").forEach(button => {
    button.addEventListener("click", function() {
      const portfolioItem = this.closest(".portfolio-item");
      const details = portfolioItem.querySelector(".case-study-details");
  
      if (portfolioItem.classList.contains("expanded")) {
        // If already expanded, collapse it
        portfolioItem.classList.remove("expanded");
        this.innerHTML = 'View Case Study <span class="arrow">&rarr;</span>';
      } else {
        // If not expanded, expand it and collapse others
        // First, collapse all other expanded items
        document.querySelectorAll(".portfolio-item.expanded").forEach(openItem => {
          openItem.classList.remove("expanded");
          openItem.querySelector(".toggle-case-study").innerHTML = 'View Case Study <span class="arrow">&rarr;</span>';
        });
  
        // Then, expand the clicked item
        portfolioItem.classList.add("expanded");
        this.innerHTML = 'Hide Details <span class="arrow">&uarr;</span>';
  
        // Scroll to the opened case study to make sure it's fully visible
        // Use setTimeout to allow the max-height transition to start before scrolling
        setTimeout(() => {
          portfolioItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500); // Adjust delay if needed based on transition speed
      }
    });
  });