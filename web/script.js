const scriptURL = 'YOUR_WEB_APP_URL';
document.getElementById("studentForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  const data = {
    name: f.name.value,
    class: f.class.value,
    roll: f.roll.value,
    email: f.email.value,
    phone: f.phone.value,
    parentWhatsapp: f.parentWhatsapp.value,
    subjects: f.subjects.value
  };
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(() => {
    alert("Submitted! Check your email.");
    f.reset();
  });
});
