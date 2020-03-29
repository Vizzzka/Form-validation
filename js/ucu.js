// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,
function validateMe(event) {
  event.preventDefault();

  //email
  const emailNode = event.target.elements['email'];
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block')
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");

  validateLength(emailNode, emailErrors, "Email", 5);
  validateFormat(emailNode, emailErrors, "Email", /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }

  // name
  const nameNode = event.target.elements['name'];
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block')
  nameErrorNode.innerHTML = '';

  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");

  validateLength(nameNode, nameErrors, "Name", 1);
  validateFormat(nameNode, nameErrors, "Name", /^(\w+\s{2})*\w+$/);

  if (nameErrors.childElementCount > 0) {
    console.log(nameErrors.childElementCount);
    nameErrorNode.appendChild(nameErrors)
  }

  //phone
  const phoneNode = event.target.elements['phone'];
  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block')
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");

  validateLength(phoneNode, phoneErrors, "Phone", 12);
  validateFormat(phoneNode, phoneErrors, "Phone", /^[+0](?:\d{5}|\d{3}\(\d{2}\))(?:-\d{3}-\d{2}-\d{2}|\s\d{3}\s\d{2}\s\d{2})$/);

  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors)
  }

  //Message
  const messageNode = event.target.elements['message'];
  const messageErrorNode = messageNode.parentNode.querySelector('p.help-block')
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute("role", "alert");

  validateLength(messageNode, messageErrors, "Message", 10);
  validateFormat(messageNode, messageErrors, "Message", /^((?!(ugly|dumm|stupid|pig|ignorant)).)*$/);

  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors)
  }

  return false;
}


function validateLength(fieldNode, fieldErrors, fieldName, length) {
  if (fieldNode.value.length < length ) {
    let li = document.createElement('li');
    li.innerText = fieldName + ' is too short';
    fieldErrors.appendChild(li)
  }

}

function validateFormat(fieldNode, fieldErrors, fieldName, reg) {
  if (!fieldNode.value.match(reg)) {
    let li = document.createElement('li');
    li.innerText = fieldName + ' format is incorrect';
    fieldErrors.appendChild(li)
  }
}
