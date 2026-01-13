const closeBtn =document.getElementById('closeBtn')
const bookingForm= document.querySelector('.form-container')
const selectButtons = [
    'bookBtn1',
    'bookBtn2',
    'bookBtn3',
    'bookBtn4',
    'bookBtn5',
    'bookBtn6',
    'bookBtn7',
    'bookBtn8',
    'bookBtn9',
];

selectButtons.forEach(id => {
  const btn = document.getElementById(id);

  btn.addEventListener('click', () => {
   bookingForm.style.display = 'block';
  });
});

closeBtn.addEventListener('click',()=>{
bookingForm.style.display='none'
})

document.addEventListener("DOMContentLoaded", () => {

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

    const show = ({ type, title, message, duration = 4000 }) => {
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
      success: (t, m) => show({ type: "success", title: t, message: m }),
      error: (t, m) => show({ type: "error", title: t, message: m }),
      info: (t, m) => show({ type: "info", title: t, message: m })
    };
  })();

  /* ================= FORM LOGIC ================= */

  const form = document.querySelector(".booking-form");
  const container = document.querySelector(".form-container");
  const submitBtn = document.getElementById("submitBtn");
  const closeBtn = document.getElementById("closeBtn");

  const fields = {
    service: document.getElementById("service"),
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    phone: document.getElementById("phoneNumber"),
    clientType: document.getElementById("clientType"),
    company: document.getElementById("companyName"),
    project: document.getElementById("project"),
  };

  /* ================= HELPERS ================= */

  const showError = (field, message) => {
    clearError(field);
    field.style.borderColor = "#ef4444";

    const error = document.createElement("small");
    error.className = "error-msg";
    error.textContent = message;
    error.style.color = "#ef4444";
    error.style.marginTop = "0.6rem";

    field.closest("label").appendChild(error);
  };

  const clearError = (field) => {
    field.style.borderColor = "";
    field.closest("label")?.querySelector(".error-msg")?.remove();
  };

  const isEmailValid = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPhoneValid = phone =>
    /^\+?[0-9\s\-]{9,15}$/.test(phone);

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    let valid = true;

    if (!fields.service.value) {
      showError(fields.service, "Please select a service");
      valid = false;
    }

    if (!fields.fullName.value.trim() ||
        fields.fullName.value.trim().split(" ").length < 2) {
      showError(fields.fullName, "Enter your full name");
      valid = false;
    }

    if (!isEmailValid(fields.email.value)) {
      showError(fields.email, "Enter a valid email address");
      valid = false;
    }

    if (!isPhoneValid(fields.phone.value)) {
      showError(fields.phone, "Enter a valid phone number");
      valid = false;
    }

    if (!fields.clientType.value) {
      showError(fields.clientType, "Please select a client type");
      valid = false;
    }

    if (!fields.company.value.trim()) {
      showError(fields.company, "Company name is required");
      valid = false;
    }

    if (
      fields.project.value.trim() &&
      fields.project.value.trim().length < 50
    ) {
      showError(fields.project, "Minimum 50 characters required");
      valid = false;
    }

    if (!valid) {
      document.querySelector(".error-msg")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return valid;
  };

  /* ================= SUBMIT ================= */

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelectorAll(".error-msg").forEach(e => e.remove());

    if (!validateForm()) {
      TechAlert.error("Validation Error", "Please fix the highlighted fields.");
      return;
    }

    submitBtn.disabled = true;
    TechAlert.info("Submitting", "Sending your booking request....");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error();
        TechAlert.success("Success 🎉", "Booking request sent successfully!");
        form.reset();
        container.style.display = "none";
      })
      .catch(() => {
        TechAlert.error("Submission Failed", "Please try again later.");
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });

  /* ================= LIVE CLEAR ================= */

  Object.values(fields).forEach(f => {
    f.addEventListener("input", () => clearError(f));
    f.addEventListener("change", () => clearError(f));
  });

  /* ================= CLOSE MODAL ================= */

  closeBtn.addEventListener("click", () => {
    container.style.display = "none";
  });

});

