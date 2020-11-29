// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

    // console.log(mainColors);
    document.documentElement.style.setProperty('--main-color', mainColors);

    // Remove Active Class From  ALL colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        // Add Active Class On Element With Data-color === Storage Item
        if (element.dataset.color === mainColors) {

            // Add Active Class
            element.classList.add("active");
        }
    });
}


// Random Background Onption
let backgroundOption = true;

// Variable to Control The Background Interval
let backgroundInterval;

//  Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if random Background Local Strorage Is Not Empty
if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    // Remove Active Class From  ALL span
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    // Add Active Class On Element With Data-Background === Storage Item
    if (backgroundLocalItem === 'true') {
        // Add Active Class
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");

    }
};

// Toggle Spin Clas On Icon
let toggleEvent = document.querySelector(".toggle-settings .fa-cogs");

toggleEvent.onclick = function () {

    // Toggle Class Fa-spin Rotation On Self
    this.classList.toggle("fa-spin");
    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// loop On all list Items
colorsLi.forEach(li => {

    // Click On Every list Items
    li.addEventListener("click", (e) => {

        //Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // set Color On local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        // Remove Active Class From All childens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");
        });

        // Add Active Class On Self
        e.target.classList.add("active");
    });
});

// Switch Random background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// loop On all Spans
randomBackEl.forEach(span => {

    // Click On Every Span
    span.addEventListener("click", (e) => {

        // Remove Active Class From All childens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");
        });

        // Add Active Class On Self
        e.target.classList.add("active");

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;
            // console.log(backgroundOption);
            randomizeImgs();

            localStorage.setItem("background_option", true);

        } else {

            backgroundOption = false;
            // console.log(backgroundOption);
            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);
        }
    });
});

// Select landing Pgae Element
let landingPage = document.querySelector(".landing-page");

// Gey Arry of img
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg",];

// Function To Randomize Imgs
function randomizeImgs() {

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {
            // Get Random Number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            // Change Backgound Image Url
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
        }, 3000);

    }

}
randomizeImgs();

// SElect Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOureHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHieght = this.innerHeight;

    // Window ScollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOureHeight - windowHieght)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}

// Crete Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add class to Overlay
        overlay.className = 'popup-overlay';

        // Append Overlay To The Body
        document.body.appendChild(overlay);

        // Create The Popup Box
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            // Create Heading
            let imgHeading = document.createElement("h3");

            // Creata text For Heading
            let imgText = document.createTextNode(img.alt);

            // Append The Text For the Heading
            imgHeading.appendChild(imgText);

            // Append The Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }

        // Crete The Image
        let popupImage = document.createElement('img');

        // Set Image Source
        popupImage.src = img.src;

        // Ad Image To Popup Box
        popupBox.appendChild(popupImage);

        // Append The Popup BoxTo Body
        document.body.appendChild(popupBox);

        // Create The Close Span
        let closeButton = document.createElement("span");

        // Crete The Close Button Text
        let closeButtonText = document.createTextNode("X");

        // Appent Text to Close Button
        closeButton.appendChild(closeButtonText);

        // add Class to class Button
        closeButton.className = 'close-button';

        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);

    });
});

// Close Popup
document.addEventListener("click", function (e) {

    if (e.target.className == 'close-button') {

        // Remove The Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});