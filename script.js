// IndustrialSkills — shared vanilla JS (nav toggle + email signup + mock test)

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Email signup forms (footer + inline) — no backend yet, show inline confirmation
  var signupForms = document.querySelectorAll('.signup-form');
  signupForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var successEl = form.parentElement.querySelector('.form-success');
      if (successEl) {
        successEl.style.display = 'block';
      }
      form.reset();
    });
  });
});

// ---------------- Mock Test ----------------
// Runs only on mock-test.html where #quiz-form exists

var quizData = [
  {
    q: "What is the primary function of a boiler in a thermal power plant?",
    options: [
      "To convert water into high-pressure steam using heat from fuel combustion",
      "To condense steam back into water",
      "To generate electricity directly from coal",
      "To cool the turbine exhaust"
    ],
    answer: 0
  },
  {
    q: "Which draught system uses only an induced draught (ID) fan to remove flue gases from the furnace?",
    options: [
      "Balanced draught",
      "Induced draught system",
      "Forced draught system",
      "Natural draught only"
    ],
    answer: 1
  },
  {
    q: "In the Rankine cycle, which component increases the pressure of the working fluid (water) before it enters the boiler?",
    options: [
      "Turbine",
      "Condenser",
      "Feed pump",
      "Economiser"
    ],
    answer: 2
  },
  {
    q: "What is the main purpose of an economiser in a boiler?",
    options: [
      "To superheat steam beyond saturation temperature",
      "To preheat feed water using flue gas heat before it enters the boiler drum",
      "To remove ash from flue gas",
      "To increase furnace draught"
    ],
    answer: 1
  },
  {
    q: "Bottom ash from a pulverised coal boiler is typically collected and removed through which system?",
    options: [
      "Fly ash electrostatic precipitator (ESP)",
      "Ash Handling Plant (AHP) bottom ash hopper and jet pump/scraper conveyor",
      "Coal handling plant crusher house",
      "Cooling tower blowdown"
    ],
    answer: 1
  },
  {
    q: "Which equipment is primarily used to reduce the size of raw coal in a Coal Handling Plant (CHP)?",
    options: [
      "Electrostatic precipitator",
      "Ring granulator crusher",
      "Deaerator",
      "Economiser"
    ],
    answer: 1
  },
  {
    q: "What is the main function of a condenser in a thermal power plant?",
    options: [
      "To convert exhaust steam from the turbine back into water under vacuum",
      "To burn coal more efficiently",
      "To increase boiler pressure",
      "To remove fly ash from flue gas"
    ],
    answer: 0
  },
  {
    q: "Which device is used to remove fly ash from flue gas before it exits the chimney?",
    options: [
      "Deaerator",
      "Electrostatic Precipitator (ESP)",
      "Feed water heater",
      "Air preheater"
    ],
    answer: 1
  },
  {
    q: "What is the purpose of an air preheater (APH) in a boiler?",
    options: [
      "To preheat combustion air using waste heat from flue gas, improving boiler efficiency",
      "To cool the generator windings",
      "To condense steam",
      "To pump feed water"
    ],
    answer: 0
  },
  {
    q: "In a steam turbine, what is the function of the governor?",
    options: [
      "To lubricate turbine bearings",
      "To control turbine speed by regulating steam flow according to load demand",
      "To remove moisture from steam",
      "To generate excitation current"
    ],
    answer: 1
  }
];

function initQuiz() {
  var quizForm = document.getElementById('quiz-form');
  if (!quizForm) return;

  var container = document.getElementById('quiz-questions');
  quizData.forEach(function (item, index) {
    var qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';
    qDiv.setAttribute('data-index', index);

    var qText = document.createElement('p');
    qText.className = 'q-text';
    qText.textContent = (index + 1) + '. ' + item.q;
    qDiv.appendChild(qText);

    var optDiv = document.createElement('div');
    optDiv.className = 'quiz-options';
    item.options.forEach(function (opt, optIndex) {
      var label = document.createElement('label');
      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'q' + index;
      input.value = optIndex;
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      optDiv.appendChild(label);
    });
    qDiv.appendChild(optDiv);
    container.appendChild(qDiv);
  });

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var score = 0;

    quizData.forEach(function (item, index) {
      var selected = quizForm.querySelector('input[name="q' + index + '"]:checked');
      var qDiv = quizForm.querySelector('.quiz-question[data-index="' + index + '"]');
      qDiv.classList.remove('correct', 'incorrect');
      if (selected && parseInt(selected.value, 10) === item.answer) {
        score++;
        qDiv.classList.add('correct');
      } else {
        qDiv.classList.add('incorrect');
      }
    });

    var resultBox = document.getElementById('quiz-result');
    var scoreText = document.getElementById('quiz-score');
    var msgText = document.getElementById('quiz-message');

    scoreText.textContent = score + ' / ' + quizData.length;

    var message;
    if (score >= 9) {
      message = "Outstanding! You're exam-ready on the basics — time to go deeper with full-length mock tests.";
    } else if (score >= 6) {
      message = 'Good grasp of the fundamentals. A bit more revision on boiler and ash handling systems will push you into the top bracket.';
    } else {
      message = "You're just getting started — that's fine! Review the articles below and try again.";
    }
    msgText.textContent = message;

    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

document.addEventListener('DOMContentLoaded', initQuiz);
