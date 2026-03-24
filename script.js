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
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};


// SHOW ALERT AFTER 1 MINUTE
setTimeout(() => {
  const alertBox = document.getElementById("alertBox");
  alertBox.classList.remove("hidden");
  alertBox.classList.add("show");
  document.body.classList.add("alert-visible"); // to add spacing only when alert is visible
}, 30000); // 30 seconds for testing, change to 60000 for 1 minute

// CLOSE ALERT
function closeAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.classList.remove("show");
  alertBox.classList.add("hidden");
  document.body.classList.remove("alert-visible");
}


// MODAL
function openModal(type) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const subtitle = document.getElementById("modal-subtitle");
  const switchText = document.getElementById("switchText");
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
  copyBtn.textContent = "Tips copied to clipboard!✅";

  setTimeout(() => {
    // copyBtn.textContent = "📋";
    copyBtn.innerHTML = '<i class="fa fa-copy"></i>';
  }, 2000);
});


const questions = document.querySelectorAll(".faq-question");

questions.forEach((q) => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;

    // close others
    document.querySelectorAll(".faq-answer").forEach(a => {
      if (a !== answer) a.style.display = "none";
    });

    // toggle current
    answer.style.display =
      answer.style.display === "block" ? "none" : "block";
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