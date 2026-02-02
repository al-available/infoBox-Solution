const menuClose = document.getElementById('menuClose');
const menuOpen = document.getElementById('menuOpen');
const aside = document.querySelector('aside'); 

function toggleMenu() {
  if (menuOpen.style.display === 'none' || menuOpen.style.display === '') {
    menuOpen.style.display = 'block';
    menuClose.style.display = 'none';
    aside.classList.add('active');
  } else {
    menuOpen.style.display = 'none';
    menuClose.style.display = 'block';
    aside.classList.remove('active');
  }
}

menuClose.addEventListener('click', toggleMenu);
menuOpen.addEventListener('click', toggleMenu);

const modalOverlay =document.querySelector('.modal-overlay')
const btnPrimary =document.querySelector('.btn-primary')
const closeModal =document.getElementById('closeModal')
const selectButtons = [
  'select1',
  'select2',
  'select3',
  'select4',
  'select',
];

selectButtons.forEach(id => {
  const btn = document.getElementById(id);

  btn.addEventListener('click', () => {
    modalOverlay.style.display = 'block';
    console.log('clicked');
  });
});

btnPrimary.addEventListener('click',()=>{
  modalOverlay.style.display='block'
  console.log('clicked')
})


closeModal.addEventListener('click',()=>{
  modalOverlay.style.display='none'
})



document.addEventListener("DOMContentLoaded", () => {

  /* ================= VFS KEY (runtime only) ================= */
  const WEB3FORMS_ACCESS_KEY = [
    "2f11c8a8",
    "ed81",
    "475f",
    "9755",
    "6cb687139c00"
  ].join("-");

  const RATE_LIMIT_KEY = "vfs_enroll_last_submit";
  const RATE_LIMIT_TIME = 60_000; // 60 seconds

  const sanitize = str =>
    str.replace(/[<>\/\\{}$;]/g, "").trim();

  /* ================= TECH ALERT SYSTEM ================= */
  const TechAlert = (() => {
    if (!document.getElementById("tech-alert-style")) {
      const styleTag = document.createElement("style");
      styleTag.id = "tech-alert-style";
      styleTag.innerHTML = `
        .tech-alert-wrapper {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .tech-alert {
          min-width: 28rem;
          max-width: 34rem;
          padding: 1.6rem 1.8rem;
          border-radius: 1.2rem;
          backdrop-filter: blur(12px);
          background: rgba(2,6,23,.88);
          border: .1rem solid rgba(56,189,248,.4);
          box-shadow: 0 2rem 5rem rgba(0,0,0,.6);
          color: #e5e7eb;
          display: flex;
          gap: 1.2rem;
          animation: slideIn .35s ease forwards;
        }
        .tech-alert.success { border-color: rgba(34,197,94,.6); }
        .tech-alert.error { border-color: rgba(239,68,68,.6); }
        .tech-alert.info { border-color: rgba(56,189,248,.6); }
        .tech-alert h4 { margin: 0; font-size: 1.4rem; font-weight: 600; }
        .tech-alert p { margin: .4rem 0 0; font-size: 1.3rem; color: #cbd5f5; }
        .tech-alert-close { margin-left: auto; cursor: pointer; color: #94a3b8; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(1.6rem); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOut {
          to { opacity: 0; transform: translateX(1.6rem); }
        }
      `;
      document.head.appendChild(styleTag);
    }

    let alertWrapper = document.querySelector(".tech-alert-wrapper");
    if (!alertWrapper) {
      alertWrapper = document.createElement("div");
      alertWrapper.className = "tech-alert-wrapper";
      document.body.appendChild(alertWrapper);
    }

    const showAlert = ({ type, title, message, duration = 4000 }) => {
      const alertElement = document.createElement("div");
      alertElement.className = `tech-alert ${type}`;
      alertElement.innerHTML = `
        <div>
          <h4>${title}</h4>
          <p>${message}</p>
        </div>
        <div class="tech-alert-close">✕</div>
      `;
      alertWrapper.appendChild(alertElement);

      const removeAlert = () => {
        alertElement.style.animation = "slideOut .3s ease forwards";
        setTimeout(() => alertElement.remove(), 300);
      };

      alertElement.querySelector(".tech-alert-close").onclick = removeAlert;
      setTimeout(removeAlert, duration);
    };

    return {
      success: (title, message) => showAlert({ type: "success", title, message }),
      error: (title, message) => showAlert({ type: "error", title, message }),
      info: (title, message) => showAlert({ type: "info", title, message }),
    };
  })();

  /* ================= FORM LOGIC ================= */
  const enrollmentForm = document.querySelector(".enroll-modal");
  const modalOverlay = document.getElementById("modal");
  const submitButton = enrollmentForm.querySelector(".submit-btn");
  const closeButton = document.getElementById("closeModal");

  const formFields = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    phone: document.getElementById("phoneNumber"),
    ghanaCard: document.getElementById("ghanaCard"),
    age: document.getElementById("age"),
    occupation: document.getElementById("occupation"),
    education: document.getElementById("eduBackground"),
    background: document.getElementById("backgroundState"),
    course: document.getElementById("course")
  };

  /* ================= HONEYPOT (bot trap) ================= */
  const honeypot = enrollmentForm.querySelector('[name="company_website"]');

  /* ================= HELPER FUNCTIONS ================= */
  const showFieldError = (field, message) => {
    clearFieldError(field);
    field.style.borderColor = "#ef4444";

    const errorElement = document.createElement("small");
    errorElement.className = "error-msg";
    errorElement.style.color = "#ef4444";
    errorElement.style.marginTop = "0.5rem";
    errorElement.textContent = message;

    field.closest(".form-group").appendChild(errorElement);
  };

  const clearFieldError = field => {
    field.style.borderColor = "";
    field.closest(".form-group")?.querySelector(".error-msg")?.remove();
  };

  const isEmailValid = value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isPhoneValid = value =>
    /^\+?[0-9\s\-]{9,15}$/.test(value);

  const isGhanaCardValid = value =>
    /^GHA-\d{9}-\d$/.test(value);

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    let isFormValid = true;

    if (formFields.fullName.value.trim().split(" ").length < 2) {
      showFieldError(formFields.fullName, "Enter your full name");
      isFormValid = false;
    }

    if (!isEmailValid(formFields.email.value)) {
      showFieldError(formFields.email, "Enter a valid email address");
      isFormValid = false;
    }

    if (!isPhoneValid(formFields.phone.value)) {
      showFieldError(formFields.phone, "Enter a valid phone number");
      isFormValid = false;
    }

    if (!isGhanaCardValid(formFields.ghanaCard.value)) {
      showFieldError(formFields.ghanaCard, "Format: GHA-XXXXXXXXX-X");
      isFormValid = false;
    }

    if (formFields.age.value < 10 || formFields.age.value > 100) {
      showFieldError(formFields.age, "Age must be between 10–100");
      isFormValid = false;
    }

    if (!formFields.occupation.value.trim()) {
      showFieldError(formFields.occupation, "Occupation is required");
      isFormValid = false;
    }

    if (!formFields.education.value) {
      showFieldError(formFields.education, "Select education level");
      isFormValid = false;
    }

    if (formFields.background.value.trim().length < 50) {
      showFieldError(formFields.background, "Minimum 50 characters required");
      isFormValid = false;
    }

    if (!formFields.course.value) {
      showFieldError(formFields.course, "Select a course");
      isFormValid = false;
    }

    return isFormValid;
  };

  /* ================= SUBMIT ================= */
  enrollmentForm.addEventListener("submit", e => {
    e.preventDefault();
    document.querySelectorAll(".error-msg").forEach(el => el.remove());

    /* Bot trap */
    if (honeypot?.value) return;

    /* Rate limit */
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_TIME) {
      TechAlert.error("Slow down ⏳", "Please wait before submitting again.");
      return;
    }

    if (!validateForm()) {
      TechAlert.error("Validation Error", "Please fix highlighted fields.");
      return;
    }

    /* Sanitize inputs */
    Object.values(formFields).forEach(f => {
      if (f.value) f.value = sanitize(f.value);
    });

    /* Inject key dynamically */
    let keyField = enrollmentForm.querySelector('[name="access_key"]');
    if (!keyField) {
      keyField = document.createElement("input");
      keyField.type = "hidden";
      keyField.name = "access_key";
      enrollmentForm.appendChild(keyField);
    }
    keyField.value = WEB3FORMS_ACCESS_KEY;

    submitButton.disabled = true;
    TechAlert.info("Submitting", "Sending your registration...");

    fetch(enrollmentForm.action, {
      method: "POST",
      body: new FormData(enrollmentForm),
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error();
        TechAlert.success("Success 🎉", "You are successfully registered!");
        localStorage.setItem(RATE_LIMIT_KEY, Date.now());
        enrollmentForm.reset();
        modalOverlay.style.display = "none";
      })
      .catch(() => {
        TechAlert.error("Submission Failed", "Please try again later.");
      })
      .finally(() => {
        submitButton.disabled = false;
        keyField.value = "";
      });
  });

  /* ================= LIVE CLEAR ================= */
  Object.values(formFields).forEach(f => {
    f.addEventListener("input", () => clearFieldError(f));
    f.addEventListener("change", () => clearFieldError(f));
  });

  /* ================= CLOSE MODAL ================= */
  closeButton.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

});


