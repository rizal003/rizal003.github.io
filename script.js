// Smooth Scrolling - modified to account for the video section
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var targetElement = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
        });
    });
});

// Enhance interactivity on mouse enter
document.querySelectorAll('section').forEach(function(section) {
    section.addEventListener('mouseenter', function() {
        console.log('You are viewing: ' + section.querySelector('h2').textContent);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var lazyVideos = document.querySelectorAll('video[preload="none"]');
    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var video = entry.target;
                video.setAttribute('preload', 'auto');
                observer.unobserve(video);
            }
        });
    });

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

    imageContainer.addEventListener('click', function() {
        if (!isVideoDisplayed) {
            imageContainer.innerHTML = '<iframe src="https://www.youtube.com/embed/6K-ATmU-NbU?si=IVihq-NY68Zz7J_u" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%;"></iframe>';
            isVideoDisplayed = true;
        } else {
            imageContainer.innerHTML = '<img src="images/mouse_history1.png" alt="History of the Computer Mouse" id="historyImage" style="width: 100%; height: auto;">';
            isVideoDisplayed = false;
        }
    });

    imageContainer2.addEventListener('click', function() {
        if (!isVideoDisplayed2) {
            imageContainer2.innerHTML = '<iframe src="https://www.youtube.com/embed/Kc3HXYkDzBg?si=iqDjDFNa9bmIe1Ey" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%;"></iframe>';
            isVideoDisplayed2 = true;
        } else {
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

document.addEventListener('DOMContentLoaded', function() {
    var sliders = document.querySelectorAll('.type-image');

    sliders.forEach(function(slider) {
        var images = slider.querySelectorAll('.slider-image');
        var prevButton = slider.querySelector('.prev-btn');
        var nextButton = slider.querySelector('.next-btn');
        var currentImage = 0;

        function updateImageDisplay() {
            images.forEach(function(img, index) {
                img.style.display = index === currentImage ? 'block' : 'none';
            });
        }

        prevButton.addEventListener('click', function() {
            currentImage = (currentImage - 1 + images.length) % images.length;
            updateImageDisplay();
        });

        nextButton.addEventListener('click', function() {
            currentImage = (currentImage + 1) % images.length;
            updateImageDisplay();
        });

        updateImageDisplay();
    });
});

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

// Header visibility on scroll
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

// Text animation on visibility
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



// CPS GAME
// CPS GAME

document.addEventListener('DOMContentLoaded', function() {
    var clickArea = document.getElementById('clickArea');
    var durationSelect = document.getElementById('durationSelect');
    var restartButton = document.getElementById('restartButton');
    var timeRemaining = document.getElementById('timeRemaining');
    var numberOfClicks = document.getElementById('numberOfClicks');
    var clicksPerSecond = document.getElementById('clicksPerSecond');
    var modal = document.getElementById('resultModal');
    var closeButton = document.querySelector('.close-button');
    var timeLeft = 0;
    var clicks = 0;
    var gameActive = false;
    var startTime;
    var timer;

    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    restartButton.addEventListener('click', function() {
        if (timer) clearInterval(timer);
        resetGame();
    });

    clickArea.addEventListener('click', function(event) {
        if (!gameActive) {
            startGame();
        } else {
            clicks++;
            numberOfClicks.textContent = clicks;
            updateCPS();
            createVisualFeedback(event);
        }
    });

    function createVisualFeedback(event) {
        var dot = document.createElement('div');
        dot.className = 'dot';
        var rect = clickArea.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        dot.style.left = (x - 5) + 'px';
        dot.style.top = (y - 5) + 'px';

        dot.style.backgroundColor = getRandomColor();

        clickArea.appendChild(dot);

        setTimeout(function() {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(10)';
        }, 100);

        setTimeout(function() {
            clickArea.removeChild(dot);
        }, 600);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function startGame() {
        gameActive = true;
        clicks = 0;
        timeLeft = parseInt(durationSelect.value);
        numberOfClicks.textContent = clicks;
        clicksPerSecond.textContent = '0.00';
        timeRemaining.textContent = timeLeft;
        clickArea.textContent = 'Click as fast as you can!';
        startTime = Date.now();

        timer = setInterval(function() {
            timeLeft--;
            timeRemaining.textContent = timeLeft;
            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    function resetGame() {
        clicks = 0;
        timeLeft = parseInt(durationSelect.value);
        numberOfClicks.textContent = '0';
        clicksPerSecond.textContent = '0.00';
        timeRemaining.textContent = timeLeft;
        gameActive = false;
        clickArea.textContent = 'Click here to start the game!';
    }

    function updateCPS() {
        var elapsed = (Date.now() - startTime) / 1000;
        var cps = (clicks / elapsed).toFixed(2);
        clicksPerSecond.textContent = cps;
    }

    function endGame() {
        clearInterval(timer);
        gameActive = false;
        updateCPS();
        document.getElementById('finalClicks').textContent = clicks;
        document.getElementById('finalCPS').textContent = clicksPerSecond.textContent;
        document.getElementById('resultImage').src = getImageForCPS(clicksPerSecond.textContent);
        modal.style.display = "block";
    }

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

document.addEventListener('DOMContentLoaded', function() {
    var firstBuildImage = document.getElementById('firstBuildImage');
    var secondBuildImage = document.getElementById('secondBuildImage');

    firstBuildImage.addEventListener('click', function() {
        toggleImage(this);
    });

    secondBuildImage.addEventListener('click', function() {
        toggleImage(this);
    });

    function toggleImage(imageContainer) {
        var imgElement = imageContainer.getElementsByTagName('img')[0];
        var currentSrc = imgElement.src;
        var altSrc = imageContainer.getAttribute('data-alt-src');

        imgElement.src = altSrc;
        imageContainer.setAttribute('data-alt-src', currentSrc);
    }
});

