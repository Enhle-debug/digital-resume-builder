const inputs = document.querySelectorAll("input, textarea");

const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");
const summaryInput = document.getElementById("summary");
const skillsInput = document.getElementById("skills");
const referencesInput = document.getElementById("references");
const linkedinInput = document.getElementById("linkedin");
const githubInput = document.getElementById("github");
const techSkillsInput = document.getElementById("techSkills");

const previewName = document.getElementById("previewName");
const previewTitle = document.getElementById("previewTitle");
const previewEmail = document.getElementById("previewEmail");
const previewPhone = document.getElementById("previewPhone");
const previewLocation = document.getElementById("previewLocation");
const previewSummary = document.getElementById("previewSummary");
const previewSkills = document.getElementById("previewSkills");
const previewReferences = document.getElementById("previewReferences");
const previewLinkedin = document.getElementById("previewLinkedin");
const previewGithub = document.getElementById("previewGithub");
const previewTechSkills = document.getElementById("previewTechSkills");

// AUTO SAVE + LOAD
window.addEventListener("load", () => {
  inputs.forEach(input => {
    if(localStorage.getItem(input.id)){
      input.value = localStorage.getItem(input.id);
      input.dispatchEvent(new Event("input"));
    }
  });

  const checkboxes = ["toggleWork","toggleProjects","toggleLinkedin","toggleGithub","toggleTechSkills","toggleCertificates"];
  checkboxes.forEach(id => {
    const cb = document.getElementById(id);
    const saved = localStorage.getItem(id);
    if(saved !== null){
      cb.checked = saved === "true";
      cb.dispatchEvent(new Event("change"));
    }
  });
});

inputs.forEach(input => {
  input.addEventListener("input", () => {
    localStorage.setItem(input.id, input.value);
  });
});

// BASIC LIVE UPDATE
nameInput.addEventListener("input", () => previewName.textContent = nameInput.value);
titleInput.addEventListener("input", () => previewTitle.textContent = titleInput.value.toUpperCase());
emailInput.addEventListener("input", () => previewEmail.textContent = emailInput.value);
phoneInput.addEventListener("input", () => previewPhone.textContent = phoneInput.value);
locationInput.addEventListener("input", () => previewLocation.textContent = locationInput.value);
summaryInput.addEventListener("input", () => previewSummary.textContent = summaryInput.value);
referencesInput.addEventListener("input", () => previewReferences.textContent = referencesInput.value);

// LINKEDIN
const toggleLinkedin = document.getElementById("toggleLinkedin");
const linkedinField = document.getElementById("linkedinField");

toggleLinkedin.addEventListener("change", () => {
  linkedinField.style.display = toggleLinkedin.checked ? "block" : "none";
  previewLinkedin.style.display = toggleLinkedin.checked ? "inline" : "none";
  localStorage.setItem("toggleLinkedin", toggleLinkedin.checked);
  if(!toggleLinkedin.checked){
    previewLinkedin.textContent = "";
  }
});

linkedinInput.addEventListener("input", () => {
  previewLinkedin.textContent = linkedinInput.value ? " | LinkedIn: " + linkedinInput.value : "";
});

// GITHUB
const toggleGithub = document.getElementById("toggleGithub");
const githubField = document.getElementById("githubField");

toggleGithub.addEventListener("change", () => {
  githubField.style.display = toggleGithub.checked ? "block" : "none";
  previewGithub.style.display = toggleGithub.checked ? "inline" : "none";
  localStorage.setItem("toggleGithub", toggleGithub.checked);
  if(!toggleGithub.checked){
    previewGithub.textContent = "";
  }
});

githubInput.addEventListener("input", () => {
  previewGithub.textContent = githubInput.value ? " | GitHub: " + githubInput.value : "";
});

// PORTFOLIO
const togglePortfolio = document.getElementById("togglePortfolio");
const portfolioField = document.getElementById("portfolioField");
const portfolioInput = document.getElementById("portfolio");
const previewPortfolio = document.getElementById("previewPortfolio");

togglePortfolio.addEventListener("change", () => {
  portfolioField.style.display = togglePortfolio.checked ? "block" : "none";
  previewPortfolio.style.display = togglePortfolio.checked ? "inline" : "none";
  localStorage.setItem("togglePortfolio", togglePortfolio.checked);
  if(!togglePortfolio.checked){
    previewPortfolio.textContent = "";
  }
});

portfolioInput.addEventListener("input", () => {
  previewPortfolio.textContent = portfolioInput.value ? " | Portfolio: " + portfolioInput.value : "";
});

// SOFT SKILLS BULLET FORMAT
skillsInput.addEventListener("input", () => {
  previewSkills.innerHTML = "";
  skillsInput.value.split(",").forEach(skill => {
    if(skill.trim() !== ""){
      const li = document.createElement("li");
      li.textContent = skill.trim();
      previewSkills.appendChild(li);
    }
  });
});

// TECH SKILLS
const toggleTechSkills = document.getElementById("toggleTechSkills");
const techSkillsField = document.getElementById("techSkillsField");
const techSkillsSection = document.getElementById("techSkillsSection");

toggleTechSkills.addEventListener("change", () => {
  techSkillsField.style.display = toggleTechSkills.checked ? "block" : "none";
  techSkillsSection.style.display = toggleTechSkills.checked ? "block" : "none";
  localStorage.setItem("toggleTechSkills", toggleTechSkills.checked);
});

techSkillsInput.addEventListener("input", () => {
  previewTechSkills.innerHTML = "";
  techSkillsInput.value.split(",").forEach(skill => {
    if(skill.trim() !== ""){
      const li = document.createElement("li");
      li.textContent = skill.trim();
      previewTechSkills.appendChild(li);
    }
  });
});

// EDUCATION
const addEducationBtn = document.getElementById("addEducation");
const educationContainer = document.getElementById("educationContainer");
const previewEducation = document.getElementById("previewEducation");

addEducationBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "entry-wrapper";
  div.innerHTML = `
    <button type="button" class="delete-entry" title="Remove">&times;</button>
    <input type="text" placeholder="High-School/Institution" class="school">
    <input type="text" placeholder="Certificate/Qualification" class="qualification">
    <input type="text" placeholder="Year" class="year">
    <hr>
  `;
  div.querySelector(".delete-entry").addEventListener("click", () => { div.remove(); updateEducation(); });
  educationContainer.appendChild(div);
  div.addEventListener("input", updateEducation);
});

function updateEducation(){
  previewEducation.innerHTML="";
  document.querySelectorAll("#educationContainer > div").forEach(edu=>{
    previewEducation.innerHTML += `
      <div>
        <strong>${edu.querySelector(".qualification").value}</strong> -
        ${edu.querySelector(".school").value} (${edu.querySelector(".year").value})
      </div>`;
  });
}

// WORK EXPERIENCE TOGGLE
const toggleWork = document.getElementById("toggleWork");
const workSection = document.getElementById("workSection");
const workSectionPreview = document.getElementById("workSection-preview");
const addExperienceBtn = document.getElementById("addExperience");

toggleWork.addEventListener("change", () => {
  workSection.style.display = toggleWork.checked ? "block" : "none";
  workSectionPreview.style.display = toggleWork.checked ? "block" : "none";
  localStorage.setItem("toggleWork", toggleWork.checked);
});

// WORK EXPERIENCE - ADD
const experienceContainer = document.getElementById("experienceContainer");
const previewExperience = document.getElementById("previewExperience");

addExperienceBtn.addEventListener("click", () => {
  if(!toggleWork.checked) return;
  const div = document.createElement("div");
  div.className = "entry-wrapper";
  div.innerHTML = `
    <button type="button" class="delete-entry" title="Remove">&times;</button>
    <input type="text" placeholder="Job Title" class="jobTitle">
    <input type="text" placeholder="Company Name" class="company">
    <input type="text" placeholder="Duration (e.g. Jan 2020 - Dec 2022)" class="duration">
    <textarea placeholder="Job Description / Responsibilities" class="jobDesc"></textarea>
    <hr>
  `;
  div.querySelector(".delete-entry").addEventListener("click", () => { div.remove(); updateExperience(); });
  experienceContainer.appendChild(div);
  div.addEventListener("input", updateExperience);
});

function updateExperience(){
  previewExperience.innerHTML="";
  document.querySelectorAll("#experienceContainer > div").forEach(exp=>{
    previewExperience.innerHTML += `
      <div style="margin-bottom:10px;">
        <strong>${exp.querySelector(".jobTitle").value}</strong> — ${exp.querySelector(".company").value}<br>
        <em>${exp.querySelector(".duration").value}</em>
        <p>${exp.querySelector(".jobDesc").value}</p>
      </div>`;
  });
}

// PROJECTS TOGGLE
const toggleProjects = document.getElementById("toggleProjects");
const projectSection = document.getElementById("projectSection");
const projectSectionPreview = document.getElementById("projectSection-preview");
const addProjectBtn = document.getElementById("addProject");
const projectsContainer = document.getElementById("projectsContainer");
const previewProjects = document.getElementById("previewProjects");

toggleProjects.addEventListener("change", ()=>{
  projectSection.style.display = toggleProjects.checked ? "block" : "none";
  projectSectionPreview.style.display = toggleProjects.checked ? "block" : "none";
  localStorage.setItem("toggleProjects", toggleProjects.checked);
});

addProjectBtn.addEventListener("click", ()=>{
  if(!toggleProjects.checked) return;
  const div = document.createElement("div");
  div.className = "entry-wrapper";
  div.innerHTML = `
    <button type="button" class="delete-entry" title="Remove">&times;</button>
    <input type="text" placeholder="Project Name" class="projectName">
    <textarea placeholder="Project Description" class="projectDesc"></textarea>
    <hr>
  `;
  div.querySelector(".delete-entry").addEventListener("click", () => { div.remove(); updateProjects(); });
  projectsContainer.appendChild(div);
  div.addEventListener("input", updateProjects);
});

function updateProjects(){
  previewProjects.innerHTML="";
  document.querySelectorAll("#projectsContainer > div").forEach(proj=>{
    previewProjects.innerHTML += `
      <div>
        <strong>${proj.querySelector(".projectName").value}</strong>
        <p>${proj.querySelector(".projectDesc").value}</p>
      </div>`;
  });
}

// CERTIFICATES
const toggleCertificates = document.getElementById("toggleCertificates");
const certificatesField = document.getElementById("certificatesField");
const certificatesSection = document.getElementById("certificatesSection");
const addCertificateBtn = document.getElementById("addCertificate");
const certificatesContainer = document.getElementById("certificatesContainer");
const previewCertificates = document.getElementById("previewCertificates");

toggleCertificates.addEventListener("change", () => {
  certificatesField.style.display = toggleCertificates.checked ? "block" : "none";
  certificatesSection.style.display = toggleCertificates.checked ? "block" : "none";
  localStorage.setItem("toggleCertificates", toggleCertificates.checked);
});

addCertificateBtn.addEventListener("click", () => {
  if(!toggleCertificates.checked) return;
  const div = document.createElement("div");
  div.className = "entry-wrapper";
  div.innerHTML = `
    <button type="button" class="delete-entry" title="Remove">&times;</button>
    <input type="text" placeholder="Certificate Name" class="certName">
    <input type="text" placeholder="Issuing Organization" class="certOrg">
    <input type="text" placeholder="Year Obtained" class="certYear">
    <hr>
  `;
  div.querySelector(".delete-entry").addEventListener("click", () => { div.remove(); updateCertificates(); });
  certificatesContainer.appendChild(div);
  div.addEventListener("input", updateCertificates);
});

function updateCertificates(){
  previewCertificates.innerHTML="";
  document.querySelectorAll("#certificatesContainer > div").forEach(cert=>{
    previewCertificates.innerHTML += `
      <div>
        <strong>${cert.querySelector(".certName").value}</strong> —
        ${cert.querySelector(".certOrg").value} (${cert.querySelector(".certYear").value})
      </div>`;
  });
}

// PDF
function downloadPDF(){
  const element = document.querySelector(".resume-preview");
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: 'Professional_Resume.pdf',  // ← Fixed name, no number
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };
  html2pdf().set(opt).from(element).save();
}

