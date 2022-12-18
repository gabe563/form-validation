window.onload = () => {
  const form = document.querySelector('.main-form');
  setTimeout(() => {
    form.parentElement.classList.add('active');
  }, 500);
};

function checkForValidity() {
  const emailInput = document.getElementById('email');
  const countryInput = document.getElementById('country');
  const zipInput = document.getElementById('zip-code');
  const passwordInput = document.getElementById('password');
  const confirmationInput = document.getElementById('confirm');

  const form = document.querySelector('.main-form');

  const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
      // cancel the previous timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // setup a new timer
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
  };

  const isRequired = (value) => (value === '' ? false : true);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValidEmail = checkEmail(emailInput),
      isValidCountry = checkCountry(countryInput),
      isValidZip = checkZip(zipInput),
      isValidPass = checkPassword(passwordInput),
      isValidConfirmationPass = checkConfirmation(
        passwordInput,
        confirmationInput
      );

    let isValidForm =
      isValidEmail &&
      isValidCountry &&
      isValidZip &&
      isValidPass &&
      isValidConfirmationPass;

    isValidForm ? showSuccessModal() : false;
  });

  form.addEventListener(
    'input',
    debounce((e) => {
      console.log(e.target.id);
      switch (e.target.id) {
        case 'email':
          checkEmail(emailInput);
          break;
        case 'country':
          checkCountry(countryInput);
          break;
        case 'zip-code':
          checkZip(zipInput);
          break;
        case 'password':
          checkPassword(passwordInput);
          break;
        case 'confirm':
          checkConfirmation(passwordInput, confirmationInput);
          break;
      }
    })
  );

  function checkEmail(email) {
    let valid = false;
    if (!isRequired(email.value)) {
      showError(email, 'Email cannot be blank.');
    } else if (!validEmail(email.value)) {
      showError(email, 'Email is not valid.');
    } else {
      showSuccess(email);
      valid = true;
    }
    return valid;
  }

  function validEmail(email) {
    const regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
  }

  function checkCountry(country) {
    let valid = false;
    if (!validCountry(country.value)) {
      showError(country, 'You have to select one country.');
    } else {
      showSuccess(country);
      valid = true;
    }
    return valid;
  }

  function validCountry(country) {
    return country !== 'Select Country' ? true : false;
  }

  function checkZip(zip) {
    let valid = false;
    if (!isRequired(zip.value)) {
      showError(zip, 'Zip Code cannot be blank.');
    } else if (!validZip(zip.value)) {
      showError(zip, 'Zip Code is not valid.');
    } else {
      showSuccess(zip);
      valid = true;
    }
    return valid;
  }

  function validZip(zip) {
    const regEx = /^[0-9]{5}(?:-[0-9]{4})?$/;
    return regEx.test(zip);
  }

  function checkPassword(password) {
    let valid = false;
    if (!isRequired(password.value)) {
      showError(password, 'Password cannot be blank.');
    } else if (!validPassword(password.value)) {
      showError(password, customMessage(password.value));
    } else {
      showSuccess(password);
      valid = true;
    }
    return valid;
  }

  function validPassword(password) {
    const regEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
    return regEx.test(password);
  }

  function customMessage(pass) {
    if (pass.length < 8) {
      return 'Your password must be at least 8 characters';
    }

    if (pass.search(/[a-z]/) < 0) {
      return 'Password must contain at least one lowercase letter';
    }

    if (pass.search(/[A-Z]/) < 0) {
      return 'Password must contain at least one uppercase letter';
    }

    if (pass.search(/[0-9]/) < 0) {
      return 'Your password must contain at least one digit';
    }
  }

  function checkConfirmation(password, confirm) {
    let valid = false;
    if (!isRequired(confirm.value)) {
      showError(confirm, 'Please enter the password again');
    } else if (!validConfirmation(password.value, confirm.value)) {
      showError(confirm, 'Confirm password does not match');
    } else {
      showSuccess(confirm);
      valid = true;
    }
    return valid;
  }

  function validConfirmation(password, confirm) {
    return confirm === password ? true : false;
  }
}
checkForValidity();

function showError(input, message) {
  const formField = input.parentElement;

  formField.classList.remove('success');
  formField.classList.add('error');

  const error = formField.querySelector('span');
  error.textContent = message;
}

function showSuccess(input) {
  const formField = input.parentElement;

  formField.classList.add('success');
  formField.classList.remove('error');

  const error = formField.querySelector('span');
  error.textContent = '';
}

function showSuccessModal() {
  const main = document.querySelector('.main');
  main.classList.toggle('active');

  const loadingModal = document.querySelector('.loading');

  function addAnimation(modal) {
    const lottie = document.createElement('lottie-player');
    lottie.setAttribute(
      'src',
      'https://assets8.lottiefiles.com/datafiles/8UjWgBkqvEF5jNoFcXV4sdJ6PXpS6DwF7cK4tzpi/Check Mark Success/Check Mark Success Data.json'
    );
    lottie.setAttribute('background', 'transparent');
    lottie.setAttribute('speed', '1');
    lottie.setAttribute('style', 'width: 150px; height: 150px');
    lottie.setAttribute('autoplay', 'autoplay');

    modal.querySelector('.animation').appendChild(lottie);
  }

  setTimeout(() => {
    loadingModal.classList.add('active');
    setTimeout(() => {
      loadingModal.classList.toggle('active');
      setTimeout(() => {
        const successModal = document.querySelector('.successForm');
        successModal.classList.add('active');
        addAnimation(successModal);
      }, 500);
    }, Math.floor(Math.random() * 7000));
  }, 600);
}
