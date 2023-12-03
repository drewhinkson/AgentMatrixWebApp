
let optionButtonClicked = false;

function Clean() {
document.getElementById('myList').innerHTML = '';
optionButtonClicked = false;
document.getElementById('checkOptionBtn').disabled = false;
}

let agentNames = [

   {
    "name": "Select an Agent"
   },
  {
    "name": "Stephen5",
    "skills": {
      "ESD_Canada": 5,
      "ESD_TDI": 1
    }
  },
  {
    "name": "Emily",
    "skills": {
      "ESD_USA": 4,
      "ESD_UK": 2
    }
  },
  {
    "name": "test",
    "skills": {
      "tester": null
    }
  },
  {
    "name": "fffaaagggoottttttttttttttttttttttt",
    "skills": {
      "hoe": 5
    }
  }
];



function getOption() {
if (optionButtonClicked) return;
let selectElement = document.querySelector('#select1');
let output = selectElement.options[selectElement.selectedIndex].value;
let agent = agentNames.find(agent => agent.name === output);
if (agent) {
  displaySkills(agent.skills, agent.name);
  optionButtonClicked = true;
  document.getElementById('checkOptionBtn').disabled = true;
}
}
function populateAgentDropdown(filteredAgents = agentNames) {
  let select = document.getElementById('select1');


  select.innerHTML = ''; // Clear existing options

  // Populate dropdown with filtered agent names
  filteredAgents.forEach(agent => {
      let option = document.createElement('option');
      option.value = agent.name;
      option.textContent = agent.name;
      select.appendChild(option);
      
  });

  // Clear skills list as the default option does not have associated skills
  document.getElementById('myList').innerHTML = '';
}




function filterAgents() {
  let input = document.getElementById('searchInput').value.toUpperCase();
  let filteredAgents = input ? 
      agentNames.filter(agent => agent.name.toUpperCase().includes(input)) 
      : agentNames;
  populateAgentDropdown(filteredAgents);

  // Automatically select the first matching agent and display their skills
  if (filteredAgents.length > 0) {
      let select = document.getElementById('select1');
      select.value = filteredAgents[0].name;
      displaySkills(filteredAgents[0].skills, filteredAgents[0].name);
  } else {
      document.getElementById('myList').innerHTML = ''; // Clear skills list if no agents match
  }
}
function displaySkills(skills, agentName) {
var ul = document.createElement('ul');
for (let skill in skills) {
  let li = document.createElement('li');
  li.id = `${agentName}-${skill}`;
  li.innerHTML = `${skill}: <span>${skills[skill]}</span> 
                  <button onclick='enableEdit("${agentName}", "${skill}")'>Edit</button>`;
  ul.appendChild(li);
}
document.getElementById('myList').innerHTML = '';
document.getElementById('myList').appendChild(ul);
}

function enableEdit(agentName, skill) {
let li = document.getElementById(`${agentName}-${skill}`);
let currentValue = agentNames.find(agent => agent.name === agentName).skills[skill];
li.innerHTML = `${skill}: <input type='text' value='${currentValue}' /> 
                <button onclick='saveSkill("${agentName}", "${skill}")'>Save</button>`;
}

function saveSkill(agentName, skill) {
let inputElement = document.getElementById(`${agentName}-${skill}`).querySelector('input');
let newValue = parseInt(inputElement.value);
agentNames.find(agent => agent.name === agentName).skills[skill] = newValue;
displaySkills(agentNames.find(agent => agent.name === agentName).skills, agentName);
}

function addNewAgent() {
let newAgentName = document.getElementById('newAgentName').value;
let skillsInput = document.getElementById('newAgentSkills').value;
if (newAgentName && skillsInput) {
  let newSkillsObject = {};
  skillsInput.split(',').forEach(skillPair => {
    let [skill, score] = skillPair.split(':').map(s => s.trim());
    newSkillsObject[skill] = parseInt(score);
  });
  agentNames.push({
    "name": newAgentName,
    "skills": newSkillsObject
  });
  let select = document.getElementById('select1');
  let option = document.createElement('option');
  option.value = newAgentName;
  option.textContent = newAgentName;
  select.appendChild(option);
  document.getElementById('newAgentName').value = '';
  document.getElementById('newAgentSkills').value = '';
} else {
  alert('Please enter a name and skills for the new agent.');
}
}

function deleteAgent() {
let select = document.getElementById('select1');
let agentNameToDelete = select.options[select.selectedIndex].value;
if (agentNameToDelete) {
  agentNames = agentNames.filter(agent => agent.name !== agentNameToDelete);
  Array.from(select.options).forEach(option => {
    if (option.value === agentNameToDelete) {
      select.removeChild(option);
    }
  });
  if (select.options.length > 0) {
    select.selectedIndex = 0;
  }
  Clean(); // Clean up the skills list if the deleted agent was displayed
} else {
  alert('Please select an agent to delete.');
}
}
// Replicate the createJSFileContent function itself
function createJSFileContent() {
  return `
let optionButtonClicked = false;

function Clean() {
document.getElementById('myList').innerHTML = '';
optionButtonClicked = false;
document.getElementById('checkOptionBtn').disabled = false;
}

let agentNames = ${JSON.stringify(agentNames, 100, 2)};

function getOption() {
if (optionButtonClicked) return;
let selectElement = document.querySelector('#select1');
let output = selectElement.options[selectElement.selectedIndex].value;
let agent = agentNames.find(agent => agent.name === output);
if (agent) {
  displaySkills(agent.skills, agent.name);
  optionButtonClicked = true;
  document.getElementById('checkOptionBtn').disabled = true;
}
}
function populateAgentDropdown(filteredAgents = agentNames) {
  let select = document.getElementById('select1');
  select.innerHTML = ''; // Clear existing options

  // Add a default blank option
  let defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select an agent';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  // Populate dropdown with filtered agent names
  filteredAgents.forEach(agent => {
      let option = document.createElement('option');
      option.value = agent.name;
      option.textContent = agent.name;
      select.appendChild(option);
  });

  // Clear skills list as the default option does not have associated skills
  document.getElementById('myList').innerHTML = '';
}




function filterAgents() {
  let input = document.getElementById('searchInput').value.toUpperCase();
  let filteredAgents = input ? 
      agentNames.filter(agent => agent.name.toUpperCase().includes(input)) 
      : agentNames;
  populateAgentDropdown(filteredAgents);

  // Automatically select the first matching agent and display their skills
  if (filteredAgents.length > 0) {
      let select = document.getElementById('select1');
      select.value = filteredAgents[0].name;
      displaySkills(filteredAgents[0].skills, filteredAgents[0].name);
  } else {
      document.getElementById('myList').innerHTML = ''; // Clear skills list if no agents match
  }
}
function displaySkills(skills, agentName) {
var ul = document.createElement('ul');
for (let skill in skills) {
  let li = document.createElement('li');
  li.id = \`\${agentName}-\${skill}\`;
  li.innerHTML = \`\${skill}: <span>\${skills[skill]}</span> 
                  <button onclick='enableEdit("\${agentName}", "\${skill}")'>Edit</button>\`;
  ul.appendChild(li);
}
document.getElementById('myList').innerHTML = '';
document.getElementById('myList').appendChild(ul);
}

function enableEdit(agentName, skill) {
let li = document.getElementById(\`\${agentName}-\${skill}\`);
let currentValue = agentNames.find(agent => agent.name === agentName).skills[skill];
li.innerHTML = \`\${skill}: <input type='text' value='\${currentValue}' /> 
                <button onclick='saveSkill("\${agentName}", "\${skill}")'>Save</button>\`;
}

function saveSkill(agentName, skill) {
let inputElement = document.getElementById(\`\${agentName}-\${skill}\`).querySelector('input');
let newValue = parseInt(inputElement.value);
agentNames.find(agent => agent.name === agentName).skills[skill] = newValue;
displaySkills(agentNames.find(agent => agent.name === agentName).skills, agentName);
}

function addNewAgent() {
let newAgentName = document.getElementById('newAgentName').value;
let skillsInput = document.getElementById('newAgentSkills').value;
if (newAgentName && skillsInput) {
  let newSkillsObject = {};
  skillsInput.split(',').forEach(skillPair => {
    let [skill, score] = skillPair.split(':').map(s => s.trim());
    newSkillsObject[skill] = parseInt(score);
  });
  agentNames.push({
    "name": newAgentName,
    "skills": newSkillsObject
  });
  let select = document.getElementById('select1');
  let option = document.createElement('option');
  option.value = newAgentName;
  option.textContent = newAgentName;
  select.appendChild(option);
  document.getElementById('newAgentName').value = '';
  document.getElementById('newAgentSkills').value = '';
} else {
  alert('Please enter a name and skills for the new agent.');
}
}

function deleteAgent() {
let select = document.getElementById('select1');
let agentNameToDelete = select.options[select.selectedIndex].value;
if (agentNameToDelete) {
  agentNames = agentNames.filter(agent => agent.name !== agentNameToDelete);
  Array.from(select.options).forEach(option => {
    if (option.value === agentNameToDelete) {
      select.removeChild(option);
    }
  });
  if (select.options.length > 0) {
    select.selectedIndex = 0;
  }
  Clean(); // Clean up the skills list if the deleted agent was displayed
} else {
  alert('Please select an agent to delete.');
}
}
// Replicate the createJSFileContent function itself
${createJSFileContent.toString()}
document.addEventListener('DOMContentLoaded', function() {
  populateAgentDropdown();
  document.getElementById('select1').addEventListener('change', function() {
    let selectedAgent = agentNames.find(agent => agent.name === this.value);
    if (selectedAgent) {
        displaySkills(selectedAgent.skills, selectedAgent.name);
    }
  });
document.getElementById('addAgentBtn').addEventListener('click', addNewAgent);
document.getElementById('deleteAgentBtn').addEventListener('click', deleteAgent);
document.getElementById('downloadJsBtn').addEventListener('click', downloadUpdatedJS);
});

function downloadUpdatedJS() {
  var dataStr = "data:text/javascript;charset=utf-8," + encodeURIComponent(createJSFileContent());
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "tdthing.js");
  document.body.appendChild(downloadAnchorNode); // Required for Firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
`;
}
document.addEventListener('DOMContentLoaded', function() {
  populateAgentDropdown();
  document.getElementById('select1').addEventListener('change', function() {
    let selectedAgent = agentNames.find(agent => agent.name === this.value);
    if (selectedAgent) {
        displaySkills(selectedAgent.skills, selectedAgent.name);
    }
  });
document.getElementById('addAgentBtn').addEventListener('click', addNewAgent);
document.getElementById('deleteAgentBtn').addEventListener('click', deleteAgent);
document.getElementById('downloadJsBtn').addEventListener('click', downloadUpdatedJS);
});

function downloadUpdatedJS() {
  var dataStr = "data:text/javascript;charset=utf-8," + encodeURIComponent(createJSFileContent());
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "tdthing.js");
  document.body.appendChild(downloadAnchorNode); // Required for Firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
