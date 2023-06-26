import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector("[name='email']");
const message = document.querySelector("[name='message']");

const STORAGE_KEY = 'feedback-form-state';

window.addEventListener('load', loadFormState);

email.addEventListener('input', saveFormState);
message.addEventListener('input', saveFormState);

form.addEventListener('submit', handleSubmit);

const saveFormStateThrottled = throttle(saveFormState, 500);

function loadFormState() {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    const { email: savedEmail, message: savedMessage } = JSON.parse(savedState);
    email.value = savedEmail;
    message.value = savedMessage;
  }
}

function saveFormState() {
  const params = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
}

function handleSubmit(event) {
  event.preventDefault();
  const params = {
    email: email.value,
    message: message.value,
  };
  console.log('Form submitted:', params);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}
