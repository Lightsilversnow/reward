//See if the browser supports Service Workers, if so try to register one
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service-worker.js").then(function(registering){
      // Registration was successful
      console.log("Browser: Service Worker registration is successful with the scope",registering.scope);
    }).catch(function(error){
      //The registration of the service worker failed
      console.log("Browser: Service Worker registration failed with the error",error);
    });
  } else {
    //The registration of the service worker failed
    console.log("Browser: I don't support Service Workers :(");
  }

/////////////////NAVIGATION///////////////////
// Handle navigation in the parent document

  const profileButton = document.querySelector(".profile-button");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (profileButton) {
    profileButton.addEventListener("click", function () {
      if (dropdownContent) {
        dropdownContent.classList.toggle("show");
      }
    });
  }




/////////////////SURVEYS PAGE///////////////////
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-buttons button, #all");
    const surveyCards = document.querySelectorAll(".survey-card");

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active-button");
        });
        
        // Add active class to the clicked button
        button.classList.add("active-button");

        // Filter cards based on button clicked
        const status = button.textContent.trim();

        if (status === "Alles") {
          surveyCards.forEach(function (card) {
            card.style.display = "flex";
          });
        } else {
          toggleCardsByStatus(status);
        }
      });
    });

    function toggleCardsByStatus(status) {
      surveyCards.forEach(function (card) {
        const cardStatus = card.querySelector(".progress-tags p:last-child").textContent.trim();

        if ((status === "Niet voltooid" && cardStatus === "Status: Niet voltooid") || (status === "Voltooid" && cardStatus === "Status: Voltooid")) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    }
  });


// Global script for the rewards system
  // This script makes it possible to verify (by creating a value) how many rewards a user has unlocked. The first time the app starts, the value of rewardUnlocked
  // will be initialized to 0. Once a user finishes a survey, the code in the finished survey screen will
  // add the value of 1 to the original value. The current version of the code stores this value in the local storage of the device/browser.

      // Verify if the user already has the value in local storage
      if (localStorage.getItem('rewardUnlocked') === null) {
        // If this is not the case, the value for the unlocked rewards will be added to local storage with a standard value of 0
        localStorage.setItem('rewardUnlocked', 0);
        console.log('currentCount');
  }