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

  const __k = [
    "201a058c",
    "85c3",
    "4a84",
    "b5d7",
    "22ae1d831d5c"
  ].join("-");

  /* ================= TECH ALERT SYSTEM ================= */

  const TechAlert = (() => {
    if (!document.getElementById("tech-alert-style")) {
      const style = document.createElement("style");
      style.id = "tech-alert-style";
      style.innerHTML = `
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
        .tech-alert h4 {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 600;
        }
        .tech-alert p {
          margin: .4rem 0 0;
          font-size: 1.3rem;
          color: #cbd5f5;
        }
        .tech-alert-close {
          margin-left: auto;
          cursor: pointer;
          color: #94a3b8;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(1.6rem); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOut {
          to { opacity: 0; transform: translateX(1.6rem); }
        }
      `;
      document.head.appendChild(style);
    }

    let wrapper = document.querySelector(".tech-alert-wrapper");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "tech-alert-wrapper";
      document.body.appendChild(wrapper);
    }

    const show = ({ type, title, message, duration = 5000 }) => {
      const alert = document.createElement("div");
      alert.className = `tech-alert ${type}`;
      alert.innerHTML = `
        <div>
          <h4>${title}</h4>
          <p>${message}</p>
        </div>
        <div class="tech-alert-close">✕</div>
      `;
      wrapper.appendChild(alert);

      const remove = () => {
        alert.style.animation = "slideOut .3s ease forwards";
        setTimeout(() => alert.remove(), 300);
      };

      alert.querySelector(".tech-alert-close").onclick = remove;
      setTimeout(remove, duration);
    };

    return {
      success: (t, m, d) => show({ type: "success", title: t, message: m, duration: d }),
      error: (t, m, d) => show({ type: "error", title: t, message: m, duration: d }),
      info: (t, m, d) => show({ type: "info", title: t, message: m, duration: d })
    };
  })();

  /* ================= FORM LOGIC ================= */

  const form = document.querySelector(".enroll-modal");
  const modal = document.getElementById("modal");
  const submitBtn = form.querySelector(".submit-btn");

  const fields = {
    fullName: fullName,
    email: email,
    phone: phoneNumber,
    age: age,
    occupation: occupation,
    education: eduBackground,
    background: backgroundState,
    course: course,
    ghanaCard: form.querySelector('[name="ghana_card"]')
  };

  const showError = (field, msg) => {
    clearError(field);
    field.style.borderColor = "#ef4444";
    const e = document.createElement("small");
    e.className = "error-msg";
    e.style.color = "#ef4444";
    e.textContent = msg;
    field.closest(".form-group").appendChild(e);
  };

  const clearError = field => {
    field.style.borderColor = "";
    field.closest(".form-group")?.querySelector(".error-msg")?.remove();
  };

  const isEmailValid = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isPhoneValid = p => /^\+?[0-9\s\-]{9,15}$/.test(p);
  const isGhanaCardValid = g => /^GHA-\d{9}-\d$/.test(g);

  const validateForm = () => {
    let v = true;

    if (fields.fullName.value.trim().split(" ").length < 2)
      (showError(fields.fullName, "Enter your full name"), v = false);

    if (!isEmailValid(fields.email.value))
      (showError(fields.email, "Invalid email"), v = false);

    if (!isPhoneValid(fields.phone.value))
      (showError(fields.phone, "Invalid phone number"), v = false);

    if (!isGhanaCardValid(fields.ghanaCard.value))
      (showError(fields.ghanaCard, "Format: GHA-XXXXXXXXX-X"), v = false);

    if (fields.age.value < 10 || fields.age.value > 100)
      (showError(fields.age, "Age must be between 10–100"), v = false);

    if (!fields.occupation.value.trim())
      (showError(fields.occupation, "Occupation required"), v = false);

    if (!fields.education.value)
      (showError(fields.education, "Select education"), v = false);

    if (fields.background.value.trim().length < 50)
      (showError(fields.background, "Minimum 50 characters"), v = false);

    if (!fields.course.value)
      (showError(fields.course, "Select course"), v = false);

    return v;
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    document.querySelectorAll(".error-msg").forEach(e => e.remove());

    if (!validateForm()) {
      TechAlert.error("Validation Error", "Please fix the highlighted fields.");
      return;
    }

    // Inject API key at runtime
    form.querySelector('[name="access_key"]').value = __k;

    submitBtn.disabled = true;
    TechAlert.info("Submitting", "Processing your registration...");

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    })
      .then(r => r.json())
      .then(d => {
        if (!d.success) throw new Error();
        TechAlert.success("Success 🎉", "You are successfully registered!");
        form.reset();
        modal.style.display = "none";
      })
      .catch(() => {
        TechAlert.error("Submission Failed", "Please try again later.");
      })
      .finally(() => {
        submitBtn.disabled = false;
        form.querySelector('[name="access_key"]').value = "";
      });
  });

  Object.values(fields).forEach(f => {
    f.addEventListener("input", () => clearError(f));
    f.addEventListener("change", () => clearError(f));
  });

});


