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
        // Populate the spotlight section with the first project
        if (projectsData.length > 0) {
            renderProjectSpotlightUI(projectsData[0]);
        }
    } catch (error) {
        console.error("Error fetching project data:", error);
    }
};

/*----------------------Render UI ------------------------ */
// UI rendering for 'About Me' section
const renderAboutMeUI = (aboutMeData) => {
    aboutMeContainer.innerHTML = ''; // Clear existing content

    const headshot = document.createElement('img');
    headshot.src = aboutMeData.headshot;
    headshot.alt = "Headshot";

    const bio = document.createElement('p');
    bio.textContent = aboutMeData.aboutMe;

    aboutMeContainer.appendChild(headshot);
    aboutMeContainer.appendChild(bio);
};
// UI rendering for project list
const renderProjectsUI = (projectsData) => {
    const fragment = document.createDocumentFragment();
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        fragment.appendChild(projectCard);
    });
    projectList.appendChild(fragment);
    setupScrollButtons();
};

// Create and return a project card element
const createProjectCard = (project) => {
    const projectCard = document.createElement('div');
    projectCard.className = "projectCard";
    projectCard.id = project.project_id;

    // Set the background image
    projectCard.style.backgroundImage = `url('${project.card_image || "./starter/images/blog_card.webp"}')`;
    projectCard.style.backgroundSize = 'cover';
    projectCard.style.backgroundPosition = 'center';

    // Add project name and description
    const projectName = document.createElement('h3');
    projectName.textContent = project.project_name || "Untitled Project";

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.short_description || "No short description for this project!";

    projectCard.appendChild(projectName);
    projectCard.appendChild(projectDescription);

    projectCard.addEventListener('click', () => renderProjectSpotlightUI(project));
    return projectCard;
};

// UI rendering for project spotlight
const renderProjectSpotlightUI = (project) => {
    projectSpotlight.innerHTML = ''; // Clear existing content

    const spotlightDiv = document.createElement('div');
    spotlightDiv.className = "projectSpotlight";
    spotlightDiv.id = project.project_id;

    const projectName = document.createElement('h3');
    projectName.textContent = project.project_name;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.long_description || "No description for this project!";

    const spotlightImage = document.createElement('img');
    spotlightImage.src = project.spotlight_image || "./starter/images/blog_spotlight.webp";
    spotlightImage.alt = project.project_name;
    spotlightImage.className = "spotlightImage";

    const viewProjectButton = document.createElement('button');
    viewProjectButton.id = "viewProject";
    const viewProjectLink = document.createElement('a');
    viewProjectLink.href = project.url || "https://example.com/";
    viewProjectLink.textContent = "View Project";
    viewProjectButton.appendChild(viewProjectLink);

    spotlightDiv.appendChild(projectName);
    spotlightDiv.appendChild(projectDescription);
    spotlightDiv.appendChild(spotlightImage);
    spotlightDiv.appendChild(viewProjectButton);

    projectSpotlight.appendChild(spotlightDiv);
};

/*----------------------Build Scroll Functionality ------------------------ */

// Setup scroll buttons for project list
const setupScrollButtons = () => {
    const scrollAmount = 100;

    // Match breakpoints with CSS
    const isMobile = window.matchMedia("(max-width: 768px)");
    const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const isDesktop = window.matchMedia("(min-width: 1024px)");

    const handleScroll = () => {
        if (isMobile.matches) {
            // Horizontal scroll for mobile
            projectNavArrows.children[0].addEventListener('click', () => {
                projectList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            projectNavArrows.children[1].addEventListener('click', () => {
                projectList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        } else if (isTablet.matches) {
            // Horizontal scroll for tablet (same as mobile)
            projectNavArrows.children[0].addEventListener('click', () => {
                projectList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            projectNavArrows.children[1].addEventListener('click', () => {
                projectList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        } else if (isDesktop.matches) {
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

    // Update behavior on screen resize
    isMobile.addEventListener('change', handleScroll);
    isTablet.addEventListener('change', handleScroll);
    isDesktop.addEventListener('change', handleScroll);
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
// Regex for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Validate form input
const validateForm = (e) => {
    e.preventDefault();

    // Clear previous error messages
    emailError.textContent = '';
    messageError.textContent = '';

    // Validate email
    const isEmailValid = emailRegex.test(email.value);
    if (!isEmailValid) {
        emailError.textContent = 'Please enter a valid email address.';
    }

    // Validate message
    const isMessageEmpty = message.value.trim() === '';
    const isMessageTooLong = message.value.length > 300;

    if (isMessageEmpty) {
        messageError.textContent = 'Please enter a message.';
    } else if (isMessageTooLong) {
        messageError.textContent = 'Message must be less than 300 characters.';
    }

    // If both fields are valid, show success message
    if (isEmailValid && !isMessageEmpty && !isMessageTooLong) {
        alert('Your message has been sent!');
        email.value = '';
        message.value = '';
        charactersLeft.textContent = 'Characters: 0/300';
    }
};

// Update characters left for message input
const updateCharacterCount = () => {
    const remainingChars = 300 - message.value.length;
    charactersLeft.textContent = `Characters: ${message.value.length}/300`;

    if (remainingChars < 0) {
        charactersLeft.classList.add('error');
    } else {
        charactersLeft.classList.remove('error');
    }
};

// Add event listeners to clear error messages on input
email.addEventListener('input', () => {
    const isEmailValid = emailRegex.test(email.value);
    if (!isEmailValid) {
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = '';
    }
});

message.addEventListener('input', () => {
    const isMessageTooLong = message.value.length > 300;
    if (isMessageTooLong) {
        messageError.textContent = 'Message must be less than 300 characters.';
    } else {
        messageError.textContent = '';
    }
    updateCharacterCount();
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

