const { user } = require("../models/user");
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation

  const user = req.body;
  const { errors, errorsMessage } = validate(user);
  if (Object.keys(errors).length !== 0) {
    res.is400 = true;
    res.message = errorsMessage;
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;

const validate = (newUser) => {
  const errors = {};
  if (!validateUser(newUser)) errors.Properties = `Too many properties`;

  const { email, phoneNumber, password, lastName, firstName, id } = newUser;

  if (!validateEmail(email)) errors.Mail = `Invalid email`;
  if (!validatePhone(phoneNumber)) errors.Phone = `Invalid number format`;
  if (!validatePassword(password)) errors.Password = `Password must be min 3 characters`;
  if (!validateLastName(lastName)) errors.Surname = `Last name can't be empty`;
  if (!validateFirstName(firstName)) errors.Name = `First name can't be empty`;
  if (id) errors.Id = `Don't pass ID, please!`;

  return { errors: errors, errorsMessage: errorConverter(errors) };
};

const validateUser = (newUser) => {
  let noExtra = true;
  Object.keys(newUser).forEach((prop) => {
    if (!user.hasOwnProperty(prop)) noExtra = false;
  });
  return noExtra;
};

const validateEmail = (mail) => {
  return mail && mail.match(/^\w+([\.-]?\w+)*@gmail.com/);
};

const validatePhone = (phoneNumber) => {
  return phoneNumber && phoneNumber.match(/\+380[0-9]{9}$/);
};

const validatePassword = (password) => {
  return password && password.length >= 3;
};

const validateLastName = (lastName) => {
  return !!lastName;
};

const validateFirstName = (firstName) => {
  return !!firstName;
};

const errorConverter = (errors) => {
  let errorMessage = "";
  for (let [key, value] of Object.entries(errors)) {
    errorMessage += `${key}: ${value}.\n`;
  }

  return errorMessage;
};
