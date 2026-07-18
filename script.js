// ===============================
// AI EMAIL ASSISTANT SCRIPT
// ===============================

// Elements
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

const emailType = document.getElementById("emailType");
const recipient = document.getElementById("recipient");
const subject = document.getElementById("subject");
const tone = document.getElementById("tone");
const purpose = document.getElementById("purpose");

const emailPreview = document.getElementById("emailPreview");

// ===============================
// Generate Email
// ===============================

generateBtn.addEventListener("click", () => {
    if (
        recipient.value.trim() === "" ||
        subject.value.trim() === "" ||
        purpose.value.trim() === ""
    ) {
        alert("Please fill all the fields.");
        return;
    }

    emailPreview.innerHTML = "<h3>🤖 AI is generating your email...</h3>";

    setTimeout(() => {
        emailPreview.innerHTML = `
        <strong>Subject:</strong> ${subject.value}

        <br><br>

        Dear ${recipient.value},

        <br><br>

        I hope you are doing well.

        I am writing this ${emailType.value.toLowerCase()} regarding the following matter.

        <br><br>

        ${purpose.value}

        <br><br>

        I kindly request you to consider my request.

        <br><br>

        Thank you for your valuable time and consideration.

        <br><br>

        Yours sincerely,

        <br>

        [Your Name]
        `;

        updateScore();
    }, 1500);
});

// ===============================
// Clear Form
// ===============================

clearBtn.addEventListener("click", () => {
    recipient.value = "";
    subject.value = "";
    purpose.value = "";
    tone.selectedIndex = 0;
    emailType.selectedIndex = 0;

    emailPreview.innerHTML = "<p>Your generated email will appear here...</p>";
});

// ===============================
// Copy Email
// ===============================

copyBtn.addEventListener("click", () => {
    const text = emailPreview.innerText;
    navigator.clipboard.writeText(text);
    alert("Email copied successfully!");
});

// ===============================
// Dark Mode
// ===============================

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.innerHTML = "☀️";
    } else {
        darkModeBtn.innerHTML = "🌙";
    }
});

// ===============================
// Professional Score
// ===============================

function updateScore() {
    const scoreCircle = document.querySelector(".score-circle");
    let score = 90;

    if (subject.value.length > 25) score += 2;
    if (purpose.value.length > 100) score += 3;
    if (tone.value === "Very Formal") score += 5;
    if (score > 100) score = 100;

    scoreCircle.innerHTML = score + "%";
}

// ===============================
// Template Click
// ===============================

const templates = document.querySelectorAll(".template-card");

templates.forEach(card => {
    card.addEventListener("click", () => {
        const text = card.innerText;

        if (text.includes("Leave")) {
            emailType.value = "Leave Application";
            subject.value = "Leave Application";
            purpose.value = "I am requesting leave due to personal reasons.";
        } else if (text.includes("Complaint")) {
            emailType.value = "Complaint";
            subject.value = "Complaint Regarding Issue";
            purpose.value = "I would like to bring an issue to your attention.";
        } else if (text.includes("Internship")) {
            emailType.value = "Internship Request";
            subject.value = "Internship Application";
            purpose.value = "I would like to apply for an internship opportunity.";
        } else if (text.includes("Scholarship")) {
            emailType.value = "Scholarship Request";
            subject.value = "Scholarship Application";
            purpose.value = "I would like to request consideration for a scholarship.";
        } else if (text.includes("Meeting")) {
            emailType.value = "Meeting Request";
            subject.value = "Meeting Request";
            purpose.value = "I would like to request a meeting at your convenience.";
        }
        
        // Auto-switch to the generator tab if a template is clicked
        document.querySelector('[data-target="tab-generator"]').click();
    });
});

// ===============================
// Smooth Page Load
// ===============================

window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 0.8s";
        document.body.style.opacity = "1";
    }, 100);
});

// ===============================
// Sidebar Tab Switching
// ===============================

const menuBtns = document.querySelectorAll('.menu-btn');
const tabContents = document.querySelectorAll('.tab-content');

menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and tabs
        menuBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(t => t.classList.remove('active'));

        // Add active class to clicked button and target tab
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// ===============================
// Save Email Logic
// ===============================

const saveBtn = document.getElementById("saveBtn");
const savedEmailsContainer = document.getElementById("savedEmailsContainer");
let savedEmailsList = [];

saveBtn.addEventListener("click", () => {
    const currentEmail = emailPreview.innerText;

    if (currentEmail.includes("Your generated email will appear here") || currentEmail.includes("AI is generating")) {
        alert("Please generate an email first before saving!");
        return;
    }

    savedEmailsList.push(currentEmail);
    alert("Email saved successfully! Check the 'Saved Emails' tab.");
    
    updateSavedEmailsUI();
});

function updateSavedEmailsUI() {
    savedEmailsContainer.innerHTML = "";

    savedEmailsList.forEach((emailText, index) => {
        const emailDiv = document.createElement("div");
        emailDiv.classList.add("saved-email-item");
        
        emailDiv.innerHTML = `<strong>Saved Email #${index + 1}</strong><br><br>${emailText.replace(/\n/g, '<br>')}`;
        
        savedEmailsContainer.appendChild(emailDiv);
    });
}