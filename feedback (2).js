
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedbackForm');
  if (!form) return; // safety

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const feedback = document.getElementById('feedback');
  const successMessage = document.getElementById('successMessage');

  function showError(el, message) {
    const err = document.getElementById(el.id + 'Error');
    if (!err) return;
    err.textContent = message || '';
    if (message) el.classList.add('is-invalid');
    else el.classList.remove('is-invalid');
  }

  function validateEmail(value) {
    if (!value) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(value).toLowerCase());
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Reset messages
    showError(name, '');
    showError(email, '');
    showError(feedback, '');
    successMessage.style.display = 'none';

    let valid = true;

    if (!name.value.trim()) {
      showError(name, 'Please enter your name');
      valid = false;
    }
    if (!validateEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      valid = false;
    }
    if (!feedback.value.trim()) {
      showError(feedback, 'Please write some feedback');
      valid = false;
    }

    // Optional: check rating selected
    const rating = form.querySelector('input[name="rating"]:checked');
    if (!rating) {
      // we can show a message in feedbackError or create a new element, but keep simple:
      const feedbackErr = document.getElementById('feedbackError');
      if (feedbackErr) feedbackErr.textContent = 'Please select a rating';
      valid = false;
    }

    if (!valid) {
      // focus the first invalid input
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return; // stop here
    }

    // If valid, show success message and clear the form
    successMessage.textContent = `Thank you, ${name.value.trim()}! Your feedback has been submitted.`;
    successMessage.style.display = 'block';
    form.reset();
    // optionally hide success after 5 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  });
});
