const validateEmail = (email) => {
  const EMAIL_REGEX =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  return EMAIL_REGEX.test(email)
    ? { valid: true, message: "Valid Email." }
    : {
        valid: false,
        message: "Invalid Email : Must provide a valid email address.",
      };
};

const validateUsername = (username) => {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

  return USER_REGEX.test(username)
    ? { valid: true, message: "Valid Username." }
    : {
        valid: false,
        message:
          "Invalid Username : Must have length of 4 to 24 characters, must begin with a letter. Only letters, numbers, underscores, hypens are allowed.",
      };
};

const validatePassword = (password) => {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,23}$/;

  return PWD_REGEX.test(password)
    ? { valid: true, message: "Valid Password." }
    : {
        valid: false,
        message:
          "Invalid Password : Must have length of 8 to 24 characters, must include uppercase and lowercase letters, a number and a special character. Allowed special characters (!@#$%)",
      };
};

module.exports = { validateEmail, validatePassword, validateUsername };
