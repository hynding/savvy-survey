class Answer {

  constructor({text, value}) {
    this.text = text;
    this.value = sanitize(value);
  }

  isValid() {
    return this.value !== '' && this.value !== null;
  }
}

module.exports = Answer;

function sanitize(value) {
  if (value===true) {
    return 1;
  }
  else if (value===false) {
    return 0;
  }
  else {
    return value;
  }
}