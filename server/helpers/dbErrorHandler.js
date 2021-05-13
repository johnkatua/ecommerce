'use strict';

// Get unique error field name
const uniqueMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf('.$') + 2,
      error.message.lastIndexOf('_1')
    );

    output = 
      fieldName.charAt(0).toUppercase() + 
      fieldName.slice(1) +
      'user already exists';
  } catch (ex) {
    output = 'email already exists';
  };
  return output;
};

// Get error message from error object
exports.errorHandler = (error) => {
  let message = '';
  if (error.code) {
    switch (error.code) {
      case 11000:
        message = uniqueMessage(error);
        break;
      default:
        message = 'Something went wrong';
    }
  }
  else {
    for (let errorName in error.errors) {
      if (error.errors[errorName].message)
        message = error.errors[errorName].message
    }
  };
  return message;
}