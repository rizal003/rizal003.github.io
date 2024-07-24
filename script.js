
// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    // Select the hamburger menu icon
    var hamburger = document.querySelector('.hamburger-menu');
    // Select the navigation list
    var navUL = document.querySelector('nav ul');
    // Select all links within the navigation list
    var navLinks = document.querySelectorAll('nav ul li a');

    // Function to open or close the navigation menu
    function toggleMenu() {
        // Toggle the left position to show or hide the menu
        navUL.style.left = navUL.style.left === '0px' ? '-100%' : '0px';
    }

    // Add click event listener to hamburger icon to trigger menu toggle
    hamburger.addEventListener('click', toggleMenu);

    // Add click event listeners to each navigation link
    Array.prototype.forEach.call(navLinks, function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            // Navigate to the section specified in href attribute of the link
            var targetSection = document.querySelector(this.getAttribute('href'));
            // Smooth scroll to the target section, offset by header height
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
            // Close the navigation menu after selecting a section
            toggleMenu();
        });
    });
});

// HTML texts hidden
document.addEventListener('DOMContentLoaded', function() {
    var overlays = document.querySelectorAll('.overlay');

    overlays.forEach(function(overlay) {
        overlay.addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            var allSections = document.querySelectorAll('.content-section');

            allSections.forEach(function(section) {
                section.style.display = 'none';
            });

            var targetSection = document.querySelector(targetId);
            if (targetSection) {
                if (targetSection.style.display === 'flex') {
                    targetSection.style.display = 'none';
                } else {
                    targetSection.style.display = 'flex';
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});

// Headers gone when user scroll 
var lastScrollTop = 0;
var header = document.querySelector('header');

window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        header.style.top = "-100px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = scrollTop;
});

// Text animation (fade-slide)
document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('.fade-in-slide-up');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(function(element) {
        observer.observe(element);
    });
});


//3 videos Types, History, Build

document.addEventListener("DOMContentLoaded", function() {

    // Select all video elements with a specific attribute
    var lazyVideos = document.querySelectorAll('video[preload="none"]');
    // Create an observer to check visibility of these videos
    var observer = new IntersectionObserver(function(entries, observer) {
        // Iterate through each video that becomes visible
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Change the preload attribute to start loading the video
                var video = entry.target;
                video.setAttribute('preload', 'auto');
                // Stop observing the video once it starts loading
                observer.unobserve(video);
            }
        });
    });
        // Start observing each lazy-load video
        lazyVideos.forEach(function(video) {
        observer.observe(video);
    });
});


// Youtube video interactions
document.addEventListener('DOMContentLoaded', function() {
    var imageContainer = document.getElementById('imageToVideo');
    var imageContainer2 = document.getElementById('imageToVideo2');
    var isVideoDisplayed = false;
    var isVideoDisplayed2 = false;

    // Toggle display between image and video for the first container
    imageContainer.addEventListener('click', function() {
        if (!isVideoDisplayed) {
            // Replace image with a video
            imageContainer.innerHTML = '<iframe src="https://www.youtube.com/embed/6K-ATmU-NbU?si=IVihq-NY68Zz7J_u" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%;"></iframe>';
            isVideoDisplayed = true;
        } else {
            // Replace video with an image
            imageContainer.innerHTML = '<img src="images/mouse_history1.png" alt="History of the Computer Mouse" id="historyImage" style="width: 100%; height: auto;">';
            isVideoDisplayed = false;
        }
    });

    // Toggle display between image and video for the second container
    imageContainer2.addEventListener('click', function() {
        if (!isVideoDisplayed2) {
            // Replace image with a video
            imageContainer2.innerHTML = '<iframe src="https://www.youtube.com/embed/Kc3HXYkDzBg?si=iqDjDFNa9bmIe1Ey" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%;"></iframe>';
            isVideoDisplayed2 = true;
        } else {
            // Replace video with an image
            imageContainer2.innerHTML = '<img src="images/mouse_history2.png" alt="Continued History of the Computer Mouse" id="historyImage" style="width: 100%; height: auto;">';
            isVideoDisplayed2 = false;
        }
    });
});

// Modal interactions 
document.querySelectorAll('.overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function() {
        location.href = '#historySection';
        location.href = '#buildSection';
        location.href = '#typesOfMouse';
    });
    overlay.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            location.href = '#historySection';
            location.href = '#buildSection';
            location.href = '#typesOfMouse';
        }
    });
});



// Build of mouse part, switching of images when clicked
document.addEventListener('DOMContentLoaded', function() {
    var firstBuildImage = document.getElementById('firstBuildImage');
    var secondBuildImage = document.getElementById('secondBuildImage');

    // Set event listener for the first build image to toggle on click
    firstBuildImage.addEventListener('click', function() {
        toggleImage(this);
    });

    // Set event listener for the second build image to toggle on click
    secondBuildImage.addEventListener('click', function() {
        toggleImage(this);
    });

    // Function to swap the displayed image and its alternate source
    function toggleImage(imageContainer) {
        var imgElement = imageContainer.getElementsByTagName('img')[0];
        var currentSrc = imgElement.src;
        var altSrc = imageContainer.getAttribute('data-alt-src');
        // Swap the source of the image
        imgElement.src = altSrc;
        imageContainer.setAttribute('data-alt-src', currentSrc);
    }
});

// Functionality for the slider in the type of mouse section
document.addEventListener('DOMContentLoaded', function() {
    var sliders = document.querySelectorAll('.type-image');

    // Set up the slider functionality for each type of mouse image container
    sliders.forEach(function(slider) {
        var images = slider.querySelectorAll('.slider-image');
        var prevButton = slider.querySelector('.prev-btn');
        var nextButton = slider.querySelector('.next-btn');
        var currentImage = 0;

        // Function to update the display of images within the slider
        function updateImageDisplay() {
            images.forEach(function(img, index) {
                img.style.display = index === currentImage ? 'block' : 'none';
            });
        }

        // Set event listener for the previous button to move to the previous image
        prevButton.addEventListener('click', function() {
            currentImage = (currentImage - 1 + images.length) % images.length;
            updateImageDisplay();
        });

        // Set event listener for the next button to move to the next image
        nextButton.addEventListener('click', function() {
            currentImage = (currentImage + 1) % images.length;
            updateImageDisplay();
        });

        // Initialize the display of the first image
        updateImageDisplay();
    });
});

// CPS GAME

document.addEventListener('DOMContentLoaded', function() {
    // Getting required elements from the DOM by their IDs
    var clickArea = document.getElementById('clickArea');
    var durationSelect = document.getElementById('durationSelect');
    var restartButton = document.getElementById('restartButton');
    var timeRemaining = document.getElementById('timeRemaining');
    var numberOfClicks = document.getElementById('numberOfClicks');
    var clicksPerSecond = document.getElementById('clicksPerSecond');
    var modal = document.getElementById('resultModal');
    var closeButton = document.querySelector('.close-button');

    // Initializing game variables
    var timeLeft = 0;
    var clicks = 0;
    var gameActive = false;
    var startTime;
    var timer;

    // Close modal when close button is clicked
    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Reset the game when restart button is clicked
    restartButton.addEventListener('click', function() {
        if (timer) clearInterval(timer);  // Clear any running timer
        resetGame();  // Call resetGame to reset game settings
    });

    // Handle click events on the click area
    clickArea.addEventListener('click', function(event) {
        if (!gameActive) {  // Start the game if not already active
            startGame();
        } else {  // If game is active, register clicks and update display
            clicks++;
            numberOfClicks.textContent = clicks;
            updateCPS();
            createVisualFeedback(event);  // Visual feedback for the click
        }
    });

    // Function to create a visual feedback on click
    function createVisualFeedback(event) {
        var dot = document.createElement('div');  // Create a dot element
        dot.className = 'dot';
        var rect = clickArea.getBoundingClientRect();
        var x = event.clientX - rect.left;  // X position of the click
        var y = event.clientY - rect.top;  // Y position of the click

        // Style and position the dot
        dot.style.left = (x - 5) + 'px';
        dot.style.top = (y - 5) + 'px';
        dot.style.backgroundColor = getRandomColor();  // Random color for the dot

        // Add dot to the click area and animate its disappearance
        clickArea.appendChild(dot);
        setTimeout(function() {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(10)';
        }, 100);
        setTimeout(function() {
            clickArea.removeChild(dot);
        }, 600);
    }

    // Generate a random color for the dot
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Start the game setup
    function startGame() {
        gameActive = true;
        clicks = 0;
        timeLeft = parseInt(durationSelect.value);
        numberOfClicks.textContent = clicks;
        clicksPerSecond.textContent = '0.00';
        timeRemaining.textContent = timeLeft;
        clickArea.textContent = 'Click as fast as you can!';
        startTime = Date.now();

        // Setup and start the timer
        timer = setInterval(function() {
            timeLeft--;
            timeRemaining.textContent = timeLeft;
            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    // Reset the game to initial state
    function resetGame() {
        clicks = 0;
        timeLeft = parseInt(durationSelect.value);
        numberOfClicks.textContent = '0';
        clicksPerSecond.textContent = '0.00';
        timeRemaining.textContent = timeLeft;
        gameActive = false;
        clickArea.textContent = 'Click here to start the game!';
    }

    // Update clicks per second display
    function updateCPS() {
        var elapsed = (Date.now() - startTime) / 1000;
        var cps = (clicks / elapsed).toFixed(2);
        clicksPerSecond.textContent = cps;
    }

    // End the game and display results
    function endGame() {
        clearInterval(timer);
        gameActive = false;
        updateCPS();
        document.getElementById('finalClicks').textContent = clicks;
        document.getElementById('finalCPS').textContent = clicksPerSecond.textContent;
        document.getElementById('resultImage').src = getImageForCPS(clicksPerSecond.textContent);
        modal.style.display = "block";
    }

    // Determine the image based on CPS
    function getImageForCPS(cps) {
        cps = parseFloat(cps);
        if (cps < 3) {
            return 'images/sloth.png';
        } else if (cps >= 3 && cps < 5) {
            return 'images/turtle.png';
        } else if (cps >= 5 && cps < 8) {
            return 'images/deer.png';
        } else if (cps >= 8 && cps < 11) {
            return 'images/cheetah.png';
        } else {
            return 'images/falcon.png';
        }
    }
});

