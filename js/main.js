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

  /* ================= VFS KEY ================= */
  const WEB3FORMS_ACCESS_KEY = [
    "2f11c8a8",
    "ed81",
    "475f",
    "9755",
    "6cb687139c00"
  ].join("-");

  const RATE_LIMIT_KEY = "vfs_enroll_last_submit";
  const RATE_LIMIT_TIME = 60_000;

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

      .tech-alert h4 { margin: 0; font-size: 1.4rem; }
      .tech-alert p { margin: .4rem 0 0; font-size: 1.3rem; color: #cbd5f5; }

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

      document.head.appendChild(styleTag);
    }

    let wrapper = document.querySelector(".tech-alert-wrapper");

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "tech-alert-wrapper";
      document.body.appendChild(wrapper);
    }

    const showAlert = ({ type, title, message, duration = 4000 }) => {

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
      success: (t, m) => showAlert({ type: "success", title: t, message: m }),
      error: (t, m) => showAlert({ type: "error", title: t, message: m }),
      info: (t, m) => showAlert({ type: "info", title: t, message: m })
    };

  })();


  /* ================= COMMUNITY POPUP ================= */
  const showCommunityPopup = () => {

    document.getElementById("community-popup")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "community-popup";

    overlay.innerHTML = `
      <div class="community-box">

        <h2>🎉 Registration Complete</h2>
        <p>Join our learning community below</p>

        <div class="community-links">

          <a href="https://wa.me/233501234567" target="_blank">
            📱 WhatsApp Group
          </a>

          <a href="https://t.me/yourgroup" target="_blank">
            💬 Telegram
          </a>

          <a href="https://discord.gg/yourserver" target="_blank">
            🎮 Discord
          </a>

          <a href="https://facebook.com/groups/yourgroup" target="_blank">
            📘 Facebook Group
          </a>

        </div>

        <button id="closeCommunityPopup">Continue</button>

      </div>
    `;

    document.body.appendChild(overlay);


    /* Styling */
    const style = document.createElement("style");

    style.innerHTML = `
      #community-popup {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
      }

      .community-box {
        background: #020617;
        color: #fff;
        padding: 3rem;
        width: 90%;
        max-width: 45rem;
        border-radius: 1.5rem;
        text-align: center;
        border: 1px solid #38bdf8;
        animation: scaleIn .3s ease;
      }

      .community-box h2 {
        font-size: 2.2rem;
        margin-bottom: 1rem;
      }

      .community-box p {
        font-size: 1.4rem;
        margin-bottom: 2rem;
        color: #cbd5f5;
      }

      .community-links {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        margin-bottom: 2rem;
      }

      .community-links a {
        padding: 1rem;
        border-radius: .8rem;
        text-decoration: none;
        background: #020617;
        border: 1px solid #38bdf8;
        color: #38bdf8;
        font-size: 1.3rem;
        transition: .2s;
      }

      .community-links a:hover {
        background: #38bdf8;
        color: #020617;
      }

      #closeCommunityPopup {
        padding: 1rem 2.5rem;
        border: none;
        background: #22c55e;
        color: #020617;
        font-weight: 600;
        border-radius: .8rem;
        cursor: pointer;
      }

      @keyframes scaleIn {
        from { transform: scale(.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;

    document.head.appendChild(style);


    document
      .getElementById("closeCommunityPopup")
      .addEventListener("click", () => {
        overlay.remove();
      });
  };


  /* ================= FORM SETUP ================= */

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


  /* ================= BOT HONEYPOT ================= */

  const honeypot = enrollmentForm.querySelector(
    '[name="company_website"]'
  );


  /* ================= HELPERS ================= */

  const showFieldError = (field, msg) => {

    clearFieldError(field);

    field.style.borderColor = "#ef4444";

    const error = document.createElement("small");

    error.className = "error-msg";
    error.style.color = "#ef4444";
    error.style.marginTop = "0.5rem";
    error.textContent = msg;

    field.closest(".form-group").appendChild(error);
  };


  const clearFieldError = field => {

    field.style.borderColor = "";

    field.closest(".form-group")
      ?.querySelector(".error-msg")
      ?.remove();
  };


  const isEmailValid = v =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);


  const isPhoneValid = v =>
    /^\+?[0-9\s\-]{9,15}$/.test(v);


  const isGhanaCardValid = v =>
    /^GHA-\d{9}-\d$/.test(v);


  /* ================= VALIDATION ================= */

  const validateForm = () => {

    let valid = true;

    if (formFields.fullName.value.trim().split(" ").length < 2) {
      showFieldError(formFields.fullName, "Enter full name");
      valid = false;
    }

    if (!isEmailValid(formFields.email.value)) {
      showFieldError(formFields.email, "Invalid email");
      valid = false;
    }

    if (!isPhoneValid(formFields.phone.value)) {
      showFieldError(formFields.phone, "Invalid phone number");
      valid = false;
    }

    if (!isGhanaCardValid(formFields.ghanaCard.value)) {
      showFieldError(formFields.ghanaCard, "GHA-XXXXXXXXX-X");
      valid = false;
    }

    if (formFields.age.value < 10 || formFields.age.value > 100) {
      showFieldError(formFields.age, "Age 10–100 only");
      valid = false;
    }

    if (!formFields.occupation.value.trim()) {
      showFieldError(formFields.occupation, "Required");
      valid = false;
    }

    if (!formFields.education.value) {
      showFieldError(formFields.education, "Select level");
      valid = false;
    }

    if (formFields.background.value.trim().length < 50) {
      showFieldError(formFields.background, "Min 50 characters");
      valid = false;
    }

    if (!formFields.course.value) {
      showFieldError(formFields.course, "Select course");
      valid = false;
    }

    return valid;
  };


  /* ================= SUBMIT ================= */

  enrollmentForm.addEventListener("submit", e => {

    e.preventDefault();

    document
      .querySelectorAll(".error-msg")
      .forEach(el => el.remove());


    /* Honeypot */
    if (honeypot?.value) return;


    /* Rate limit */
    const last = localStorage.getItem(RATE_LIMIT_KEY);

    if (last && Date.now() - last < RATE_LIMIT_TIME) {
      TechAlert.error("Slow Down ⏳", "Wait before retrying");
      return;
    }


    if (!validateForm()) {
      TechAlert.error("Error", "Fix highlighted fields");
      return;
    }


    /* Sanitize */
    Object.values(formFields).forEach(f => {
      if (f.value) f.value = sanitize(f.value);
    });


    /* Inject Web3 Key */
    let key = enrollmentForm.querySelector('[name="access_key"]');

    if (!key) {
      key = document.createElement("input");
      key.type = "hidden";
      key.name = "access_key";
      enrollmentForm.appendChild(key);
    }

    key.value = WEB3FORMS_ACCESS_KEY;


    submitButton.disabled = true;

    TechAlert.info("Submitting", "Sending form...");


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


        TechAlert.success("Success 🎉", "Registered successfully!");

        localStorage.setItem(RATE_LIMIT_KEY, Date.now());

        enrollmentForm.reset();

        modalOverlay.style.display = "none";


        setTimeout(() => {
          showCommunityPopup();
        }, 800);

      })


      .catch(() => {

        TechAlert.error("Failed", "Try again later");

      })


      .finally(() => {

        submitButton.disabled = false;

        key.value = "";

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

