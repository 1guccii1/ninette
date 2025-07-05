const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  addMessage(message, 'user');
  const response = getBotResponse(message);
  setTimeout(() => addMessage(response, 'bot'), 500);

  userInput.value = '';
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(input) {
  input = input.toLowerCase();

  if (input.includes('admission')) {
    return 'Kepler admissions are open to passionate, driven students. Check out our website for deadlines and requirements!';
  } else if (input.includes('academics') || input.includes('programs')) {
    return 'Kepler offers a unique blended learning model, with degrees in management and communications. Courses are designed to build practical skills.';
  } else if (input.includes('scholarship')) {
    return 'Kepler provides scholarships based on merit and need. Reach out to admissions for detailed eligibility info.';
  } else if (input.includes('hello') || input.includes('hi')) {
    return 'Hey hey! 👋 How can I help you learn more about Kepler today?';
  } else {
    return 'Sorry, I didn’t quite get that. Can you rephrase or ask something about admissions or academics?';
  }
}

userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
let faqData = [];

fetch('dor.json')
  .then(response => response.json())
  .then(data => {
    faqData = [
      ...data.Draft,
      ...data.Programs,
      ...data.Orientation,
      ...(data["Admission and Registration"] || []),
      ...(data["Admission & Registration 2"] || []),
      ...(data["Orientation"] || []),
      ...(data["Programs"] || []),
      ...(data["Sheet7"] || [])
    ];
    console.log("FAQ loaded:", faqData);
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
function getBotResponse(input) {
  input = input.toLowerCase();

  for (let item of faqData) {
    if (item.Questions && input.includes(item.Questions.toLowerCase().substring(0, 10))) {
      return item.Answers || "Sorry, no answer provided.";
    }
  }

  return "Sorry, I didn’t quite get that. Can you rephrase or ask something else?";
}

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  addMessage(message, 'user');
  const response = getBotResponse(message);
  setTimeout(() => addMessage(response, 'bot'), 500);

  userInput.value = '';
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function getBotResponse(input) {
  input = input.toLowerCase();

  let bestMatch = null;
  let maxMatchCount = 0;

  for (let item of faqData) {
    if (!item.Questions || !item.Answers) continue;

    const questionWords = item.Questions.toLowerCase().split(/\s+/);
    let matchCount = 0;

    for (let word of questionWords) {
      if (input.includes(word) && word.length > 3) {
        matchCount++;
      }
    }

    if (matchCount > maxMatchCount) {
      maxMatchCount = matchCount;
      bestMatch = item;
    }
  }

  if (bestMatch && maxMatchCount > 0) {
    return bestMatch.Answers;
  }

  return "Sorry, I didn't quite get that. Can you rephrase or ask something else?";
}


