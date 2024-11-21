/*----------------------Store Elements ------------------------ */

const aboutMeContainer = document.querySelector("#aboutMeContainer");
const projectList = document.querySelector("#projectList");
const projectNavArrows = document.querySelector("#projectNavArrows");
const projectSpotlight = document.querySelector("#projectSpotlight");
const form = document.getElementById('formSection');
const email = document.getElementById('contactEmail');
const message = document.getElementById('contactMessage');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const charactersLeft = document.getElementById('charactersLeft');
// Variables for managing scroll interval
let scrollInterval;
const scrollSpeed = 5; // Pixels to scroll at a time
const scrollDelay = 20; // Delay between each scroll step (in ms)

/*----------------------Fetch Data ------------------------ */
// Fetch and render 'About Me' data
const fetchAboutMeData = async () => {
    try {
        const response = await fetch('./starter/data/aboutMeData.json');
        const aboutMeData = await response.json();
        renderAboutMeUI(aboutMeData);
    } catch (error) {
        console.error("Error fetching 'About Me' data:", error);
    }
};

// Fetch and render project data
const fetchProjectsData = async () => {
    try {
        const response = await fetch('./starter/data/projectsData.json');
        const projectsData = await response.json();
        renderProjectsUI(projectsData);
    } catch (error) {
        console.error("Error fetching project data:", error);
    }
};

/*----------------------Render UI ------------------------ */
// UI rendering for 'About Me' section
const renderAboutMeUI = (aboutMeData) => {
    aboutMeContainer.innerHTML = `
        <img src="${aboutMeData.headshot}" alt="Headshot">
        <p>${aboutMeData.aboutMe}</p>
    `;
};

// UI rendering for project list
const renderProjectsUI = (projectsData) => {
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        projectList.appendChild(projectCard);
    });
    setupScrollButtons();
};

// Create and return a project card element
const createProjectCard = (project) => {
    const projectCard = document.createElement('div');
    projectCard.className = "projectCard";
    projectCard.id = project.project_id;
    projectCard.innerHTML = `
        <h3>${project.project_name}</h3>
        <p>${project.short_description || "No short description for this project!"}</p>
        <img src="${project.card_image || "./starter/images/blog_card.webp"}" alt="${project.project_name}">
    `;

    projectCard.addEventListener('click', () => renderProjectSpotlightUI(project));
    return projectCard;
};

// UI rendering for project spotlight
const renderProjectSpotlightUI = (project) => {
    projectSpotlight.innerHTML = `
        <div class="projectSpotlight" id="${project.project_id}">
            <h3>${project.project_name}</h3>
            <p>${project.long_description || "No description for this project!"}</p>
            <img src="${project.spotlight_image || "./starter/images/blog_spotlight.webp"}" alt="${project.project_name}" class="spotlightImage">
            <button id="viewProject">
                <a href="${project.url || "https://example.com/"}">View Project</a>
            </button>
        </div>
    `;
};

/*----------------------Build Scroll Functionality ------------------------ */

// Setup scroll buttons for project list
const setupScrollButtons = () => {
    const scrollAmount = 100;

    const isMobile = window.matchMedia("(max-width: 768px)");
    const istablet = window.matchMedia("(min-width: 768px)");

    const handleScroll = () => {
        if (isMobile.matches || istablet.matches) {
            // Horizontal scroll for mobile
            projectNavArrows.children[0].addEventListener('click', () => {
                projectList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            projectNavArrows.children[1].addEventListener('click', () => {
                projectList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        } else {
            // Vertical scroll for desktop
            projectNavArrows.children[0].addEventListener('click', () => {
                projectList.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
            });

            projectNavArrows.children[1].addEventListener('click', () => {
                projectList.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            });
        }
    };

    // Add initial scroll handlers
    handleScroll();

    // Add listener to update behavior on screen resize
    isMobile.addEventListener('change', handleScroll);
    istablet.addEventListener('change', handleScroll);
};

// Function to start scrolling
function startScrolling(direction) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  scrollInterval = setInterval(() => {
    projectList.scrollBy({
      [isMobile ? "left" : "top"]: direction === "up" || direction === "left" ? -scrollSpeed : scrollSpeed,
      behavior: "auto", // "auto" for continuous smooth scrolling effect
    });
  }, scrollDelay);

}

// Function to stop scrolling
function stopScrolling() {
  clearInterval(scrollInterval);
}

// Add event listeners for hover (desktop and mobile)
projectNavArrows.children[0].addEventListener("mouseenter", () => startScrolling("up"));
projectNavArrows.children[0].addEventListener("mouseleave", stopScrolling);

projectNavArrows.children[1].addEventListener("mouseenter", () => startScrolling("down"));
projectNavArrows.children[1].addEventListener("mouseleave", stopScrolling);

/*----------------------Validate Form ------------------------ */

// Validate form input
const validateForm = (e) => {
    e.preventDefault();

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

    switch (true) {
        case !isEmailValid:
            emailError.textContent = 'Please enter a valid email address';
            break;
        case message.value.trim() === '':
            messageError.textContent = 'Please enter a message';
            break;
        case message.value.length > 300:
            messageError.textContent = 'Message must be less than 300 characters';
            break;
        default:
            alert('Your message has been sent!');
            break;
    }
};
// Update characters left for message input
const updateCharacterCount = () => {
    charactersLeft.textContent = `Characters: ${message.value.length}/300`;
};

// Add event listeners to clear error messages on input
email.addEventListener('input', () => {
    emailError.textContent = '';
});

message.addEventListener('input', () => {
    messageError.textContent = '';
});
/*----------------------Add Listeners ------------------------ */

// Event listeners
form.addEventListener('submit', validateForm);
message.addEventListener('input', updateCharacterCount);


/*----------------------Initialize ------------------------ */
// Initialize data fetching using async/await and IIFE
(async () => {
    await fetchAboutMeData();
    await fetchProjectsData();
})()

