import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(handleFormInput, 500));

function handleFormInput() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value.trim(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function formFields() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    const formData = JSON.parse(storedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}

formRef.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';

  console.log('Form Data:', formData);
}
