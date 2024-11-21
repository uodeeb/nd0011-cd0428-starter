# Project Portfolio with Responsive Navigation

This project is a dynamic, responsive portfolio website designed to showcase projects and an "About Me" section. It features smooth navigation, project spotlight functionality, and a contact form with validation. The navigation adapts to mobile and desktop layouts, enabling vertical scrolling on desktops and horizontal scrolling on mobile devices.

---

## Features

- **Dynamic Content Loading**
  - Fetches "About Me" and project data from JSON files.
  - Dynamically renders project cards and a detailed spotlight view.

- **Responsive Navigation**
  - Smooth vertical scrolling for desktop users.
  - Horizontal scrolling for mobile users with adaptive arrow functionality.

- **Contact Form Validation**
  - Real-time validation for email and message inputs.
  - Ensures proper email formatting and message length restrictions (max 300 characters).

- **Interactive Project Spotlight**
  - Click on project cards to view detailed descriptions and images.

---

## File Structure

```plaintext
starter/
│
├── data/
│   ├── aboutMeData.json       # Contains "About Me" section data
│   └── projectsData.json      # Contains project details
│
├── images/
│   ├── blog_card.webp         # Placeholder image for project cards
│   └── blog_spotlight.webp    # Placeholder image for project spotlight
│
├── css/
│   └── styles.css             # Contains responsive and mobile-first styles
│
└── js/
    └── main.js                # Core JavaScript logic
