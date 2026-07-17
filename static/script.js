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
const senderName = document.getElementById("senderName");
const tone = document.getElementById("tone");
const purpose = document.getElementById("purpose");

const emailPreview = document.getElementById("emailPreview");

// ===============================
// Generate Email
// ===============================

generateBtn.addEventListener("click", () => {

    if (
        recipient.value.trim() === "" ||
        senderName.value.trim() === "" ||
        purpose.value.trim() === ""
    ) {
        alert("Please fill all the fields.");
        return;
    }

    emailPreview.innerHTML = "<h3>🤖 AI is generating your email...</h3>";



    fetch("http://127.0.0.1:5000/generate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email_type: emailType.value,
        tone: tone.value,
        recipient: recipient.value,
        purpose: purpose.value,
        sender_name: senderName.value
    })
})
.then(response => response.json())
.then(data => {

    subject.value = data.subject;

    emailPreview.innerHTML = `
<strong>Subject:</strong> ${data.subject}

<br><br>

${data.templates[0].replace(/\n/g, "<br>")}
`;

    updateScore();

})
.catch(error => {

    console.error(error);

    alert("Failed to generate email.");

});

});

// ===============================
// Clear Form
// ===============================

clearBtn.addEventListener("click",()=>{

    recipient.value="";
    subject.value="";
    purpose.value="";
    tone.selectedIndex=0;
    emailType.selectedIndex=0;

    emailPreview.innerHTML="<p>Your generated email will appear here...</p>";

});

// ===============================
// Copy Email
// ===============================

copyBtn.addEventListener("click",()=>{

    const text=emailPreview.innerText;

    navigator.clipboard.writeText(text);

    alert("Email copied successfully!");

});

// ===============================
// Dark Mode
// ===============================

darkModeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        darkModeBtn.innerHTML="☀️";

    }
    else{

        darkModeBtn.innerHTML="🌙";

    }

});

// ===============================
// Professional Score
// ===============================

function updateScore(){

    const scoreCircle=document.querySelector(".score-circle");

    let score=90;

    if(subject.value.length>25)
        score+=2;

    if(purpose.value.length>100)
        score+=3;

    if(tone.value==="Very Formal")
        score+=5;

    if(score>100)
        score=100;

    scoreCircle.innerHTML=score+"%";

}

// ===============================
// Template Click
// ===============================

const templates=document.querySelectorAll(".template-card");

templates.forEach(card=>{

    card.addEventListener("click",()=>{

        const text=card.innerText;

        if(text.includes("Leave")){

            emailType.value="Leave Application";
            subject.value="Leave Application";
            purpose.value="I am requesting leave due to personal reasons.";

        }

        else if(text.includes("Complaint")){

            emailType.value="Complaint";
            subject.value="Complaint Regarding Issue";
            purpose.value="I would like to bring an issue to your attention.";

        }

        else if(text.includes("Internship")){

            emailType.value="Internship Request";
            subject.value="Internship Application";
            purpose.value="I would like to apply for an internship opportunity.";

        }

        else if(text.includes("Scholarship")){

            emailType.value="Scholarship Request";
            subject.value="Scholarship Application";
            purpose.value="I would like to request consideration for a scholarship.";

        }

        else if(text.includes("Meeting")){

            emailType.value="Meeting Request";
            subject.value="Meeting Request";
            purpose.value="I would like to request a meeting at your convenience.";

        }

    });

});

// ===============================
// Smooth Page Load
// ===============================

window.addEventListener("load",()=>{

    document.body.style.opacity="0";

    setTimeout(()=>{

        document.body.style.transition="opacity 0.8s";

        document.body.style.opacity="1";

    },100);

});