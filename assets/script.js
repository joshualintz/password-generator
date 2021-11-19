/* PASSWORD GENERATOR FUNCTIONS */

let generatePassword = function () {
  const passwordLength = getPasswordLength();
  const passwordComplexity = getPasswordComplexity();
  const symbols = "'!@#$%^&*()_+~`|}{[]\:;?><,./-='"; // break out special characters from ASCII Character codes in the event some characters need to be removed

  let passwordText = "";
  let selection = 0;
  for (i = 0; i < passwordLength; i++) { // for each character slot run the loop to generate a random character

    // Keep running this switch statement until randomly landing on one of the selected criteria
    let selected = false;
    while (!selected) {
      let characterType = Math.floor(Math.random() * 4); // times the number of cases
      if (passwordComplexity.includes(characterType)) {
        // reference the ASCII Character Set and Codes - uppers 65-90; lowers 98-122; numbers 48-57
        switch (characterType) {
          case 0: // symbols
            selection = Math.floor(Math.random() * symbols.length);
            passwordText += symbols[selection];
            break;
          case 1: // numbers
            selection = Math.floor(Math.random() * ((57 - 48) + 1) + 48);
            passwordText += String.fromCharCode(selection);
            break;
          case 2: // uppers
            selection = Math.floor(Math.random() * ((90 - 65) + 1) + 65);
            passwordText += String.fromCharCode(selection);
            break;
          case 3: // lowers
            selection = Math.floor(Math.random() * ((122 - 97) + 1) + 97); 
            passwordText += String.fromCharCode(selection);
            break;
          default:
            break;
        }
        selected = true;
      }
    }
  }
  return passwordText;
};

let getPasswordComplexity = function () {
  // confirm password complexity by selecting 1 or more criteria to randomize
  let addSymbols = confirm("Include special characters? (Yes = OK | No = Cancel)");
  let addNumbers = confirm("Include numbers? (Yes = OK | No = Cancel)");
  let addUppers = confirm("Include UPPERCASE letters? (Yes = OK | No = Cancel)");
  let addLowers = confirm("Include lowercase letters? (Yes = OK | No = Cancel)");
  
  // create conditional logic based on the selected complexity
  let passwordComplexity = [];
  if (addSymbols) {
    passwordComplexity.push(0);
  }
  if (addNumbers) {
    passwordComplexity.push(1);
  }
  if (addUppers) {
    passwordComplexity.push(2);
  }
  if (addLowers) {
    passwordComplexity.push(3);
  }
  
  // edge case: include alert to user if they fail to select any criteria.
  if (passwordComplexity.length === 0) {
    alert("Oops! You must select at least 1 criteria.");
    return getPasswordComplexity();
  }

  return passwordComplexity;
};

// use prompt to ask user to define charachter length between 9-128 characters
let getPasswordLength = function () {
  let passwordLength = parseInt(
    prompt("Define the password length between 8 and 128 characters.")
  );

  // alert user if the password doesn't meet the min/max length requirements.
  if (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    alert("Oops! Please provide a value between 8 and 128.");
    return getPasswordLength();
  }

  return passwordLength;
};

// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);