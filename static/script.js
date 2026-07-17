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
const emailButtons = document.getElementById("emailButtons");
const template1 = document.getElementById("template1");
const template2 = document.getElementById("template2");
const template3 = document.getElementById("template3");

let generatedTemplates = [];
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

    generatedTemplates = data.templates;
    activateButton(template1);

emailButtons.style.display = "block";

showTemplate(0);

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

    if(tone.value==="Formal")
        score+=5;

    if(score>100)
        score=100;

    scoreCircle.innerHTML=score+"%";

}

// ===============================
// Template Click
// ===============================


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
function showTemplate(index){

    emailPreview.innerHTML = `
    <div class="generated-email">

    <h3>Subject: ${subject.value}</h3>

    <hr>

    ${generatedTemplates[index]
        .replace(/\n/g, "<br>")}
    </div>
    `;
}
function activateButton(button){

    template1.classList.remove("active");
    template2.classList.remove("active");
    template3.classList.remove("active");

    button.classList.add("active");

}

template1.onclick = () => {
    activateButton(template1);
    showTemplate(0);
};

template2.onclick = () => {
    activateButton(template2);
    showTemplate(1);
};

template3.onclick = () => {
    activateButton(template3);
    showTemplate(2);
};