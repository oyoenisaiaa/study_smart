// NAVIGATION
function goToPage(page) {
  window.location.href = page;
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Scroll to top on page load
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Ensure page starts from top on reload, except when using hash links
window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0); // Start at top if no hash link in URL
  }
});

// Reset scroll on refresh
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };

window.onload = () => {
  window.scrollTo(0, 0);
};


// SHOW ALERT AFTER 1 MINUTE
const breakMessages = [
  "Reminder to Take a Break! Time for a quick stretch!",
  "Time for a 5-minute breather! Step away from the screen!",
  "Pause & Refresh. Your brain deserves a break.",
  "Stand up, grab some water, and take a quick walk.",
  "Time for a brain break! Look away from your screen for 5 minutes.",
  "Brain capacity 99% full. Pause to relax and recharge"
];

function showRandomAlert() {
  const alertBox = document.getElementById("alertBox");
  if (!alertBox) return; // prevents errors in case pages are missing the alert code

  const messageEl = document.querySelector(".alert-message");

  // pick random message
  const randomIndex = Math.floor(Math.random() * breakMessages.length);
  messageEl.innerText = breakMessages[randomIndex];

  // show alert
  alertBox.classList.add("show");
  document.body.classList.add("alert-visible");

  // auto close after 8 seconds (optional but nice)
  setTimeout(() => {
    closeAlert();
  }, 8000);
}

// first alert after 1 minute(60000) and then repeat every 25 mins
// setTimeout(showRandomAlert, 60000);
// setInterval(showRandomAlert, 25 * 60 * 1000);

// for Demo
setTimeout(showRandomAlert, 5000);   // first alert after 5s
setInterval(showRandomAlert, 20000); // every 20s


setTimeout(() => {
  const alertBox = document.getElementById("alertBox");
//   alertBox.classList.remove("hidden");
  alertBox.classList.add("show");
  document.body.classList.add("alert-visible"); // to add spacing only when alert is visible
}, 10000); // 10 seconds for testing, change to 60000 for 1 minute

// CLOSE ALERT
function closeAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.classList.remove("show");
//   alertBox.classList.add("hidden");
  document.body.classList.remove("alert-visible");
}

// MOBILE MENU
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");

  document.body.classList.toggle("menu-open"); /* prevents scrolling when mobile menu is open */
  document.documentElement.classList.toggle("menu-open"); 
}


// closes menu when an interaction occurs - link on nav or page
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("active");
    document.body.classList.remove("menu-open");
    document.documentElement.classList.remove("menu-open");
  });
});





// MODAL
function openModal(type) {
  const modal = document.getElementById("modal");
  if (!modal) return;

  const title = document.getElementById("modal-title");
  const subtitle = document.getElementById("modal-subtitle");
  const switchText = document.getElementById("switchText");

  const form = document.querySelector(".modal-form");
  form.reset(); // clears form every time modal opens


  document.body.classList.add("modal-open");
  modal.style.display = "block";

  if (type === "login") {
    title.innerText = "Log In";
    subtitle.innerText = "Log in to get started for the full experience.";

    switchText.innerHTML = `
      Don't have an account?
      <span onclick="switchModal('signup')">Sign Up</span>
    `;

  } else {
    title.innerText = "Sign Up";
    subtitle.innerText = "Sign up to get started for the full experience.";

    switchText.innerHTML = `
      Already have an account?
      <span onclick="switchModal('login')">Log In</span>
    `;
  }
}

function switchModal(type) {
  openModal(type);
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.body.classList.remove("modal-open"); 
}

// To close modal when clicking outside it
window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open"); 
  }
}

// MODAL FORM SUBMIT BEHAVIOR
function handleAuth(event) {
  event.preventDefault();

  const form = event.target; // get the form
  const modalTitle = document.getElementById("modal-title").innerText;

  if (modalTitle.toLowerCase().includes("sign up")) {
    alert("Thank you for your interest. Stay tuned for the Product Launch.");
    
    form.reset(); // clears input and resets form
    closeModal();
  } 
  else {
    form.reset(); // clears input before redirect
    window.location.href = "profile.html";
  }
}


// AI STUDY TIPS
const tips = [
  "📌 Study in 25-minute sessions",
  "📌 Practice past questions",
  "📌 Review mistakes",
  "📌 Take regular breaks",
  "📌 Set clear daily study goals",
  "📌 Study at the same time each day",
  "📌 Remove distractions (phone, social media)",
  "📌 Use active recall instead of rereading",
  "📌 Teach someone else what you learned",
  "📌 Use flashcards for quick revision",
  "📌 Break large topics into smaller chunks",
  "📌 Stay hydrated while studying",
  "📌 Get enough sleep before exams",
  "📌 Use diagrams and visuals to learn faster",
  "📌 Prioritize difficult subjects first",
  "📌 Mix subjects to avoid boredom",
  "📌 Reward yourself after study sessions",
  "📌 Review notes within 24 hours",
  "📌 Practice under timed conditions",
  "📌 Create a dedicated study space",
  "📌 Stay consistent, not perfect",
  "📌 Take short walks to refresh your mind",
  "📌 Avoid multitasking while studying",
  "📌 Start early to avoid last-minute stress"
];

// Shuffle tips array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const generateBtn = document.getElementById("generateTipsBtn");
const tipsOutput = document.getElementById("tipsOutput");
const tipsSuccess = document.getElementById("tipsSuccess");
const copyBtn = document.getElementById("copyTipsBtn");
const tipsWrapper = document.getElementById("tipsWrapper");

let hideTimer;

generateBtn.addEventListener("click", () => {
  const shuffled = shuffleArray([...tips]);
  const selectedTips = shuffled.slice(0, 5);

  tipsOutput.value = selectedTips.join("\n");

  // Show elements
  tipsWrapper.classList.remove("hidden");
  tipsSuccess.classList.remove("hidden");

  if (hideTimer) clearTimeout(hideTimer);

  hideTimer = setTimeout(() => {
    tipsWrapper.classList.add("hidden");
    tipsSuccess.classList.add("hidden");
  }, 30000);
});

// Copy to clipboard (ICON click)
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(tipsOutput.value);

  // copy feedback (change icon)
  copyBtn.textContent = "Copied!✅";

  setTimeout(() => {
    // copyBtn.textContent = "📋";
    copyBtn.innerHTML = '<i class="fa fa-copy"></i>';
  }, 2000);
});



// FAQs
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {

    // Close all others
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    // Toggle current
    item.classList.toggle("active");
  });
});


// CONTACT FORM
function submitForm(event) {
  event.preventDefault();

  const message = document.getElementById("formMessage");

  message.innerText = "Message sent successfully!";

  event.target.reset();
  setTimeout(() => {
    message.innerText = "";
  }, 5000);
}

//PLANNER PAGE
document.addEventListener("DOMContentLoaded", function() {
  const studyForm = document.getElementById("studyForm");
  if (!studyForm) {
    console.error("studyForm not found!");
    return;
  }

  studyForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const subject = document.getElementById("subject").value;
    const hours = document.getElementById("hours").value;
    const examDate = document.getElementById("examDate").value;

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");

    // Reset states
    error.classList.add("hidden");
    output.innerHTML = "";

    // ✅ Validation
    if (!subject || !hours) {
      error.textContent = "Please fill in all required fields.";
      error.classList.remove("hidden");
      return;
    }

    // Show loading
    loading.classList.remove("hidden");

    setTimeout(() => {
      loading.classList.add("hidden");

      const topics = {
        math: ["Algebra", "Geometry", "Trigonometry", "Statistics", "Revision"],
        english: ["Grammar", "Essay Writing", "Comprehension", "Vocabulary", "Revision"],
        science: ["Biology", "Chemistry", "Physics", "Experiments", "Revision"]
      };

      let planHTML = `<h3 class="text-lg font-semibold mb-2">Your 7-Day Study Plan</h3>`;

      for (let i = 0; i < 7; i++) {
        const topic = topics[subject][i % topics[subject].length];

        planHTML += `
          <div class="flex items-center gap-2 p-3 bg-blue-50 rounded shadow-sm">
            <input type="checkbox" class="accent-blue-600">
            <span><strong>Day ${i + 1}:</strong> ${topic} (${hours} hrs)</span>
          </div>
        `;
      }

      if (examDate) {
        planHTML += `<p class="mt-3 text-sm text-gray-600"><strong>Exam Date:</strong> ${examDate}</p>`;
      }

      output.innerHTML = planHTML;

    }, 1200);
  });
});
