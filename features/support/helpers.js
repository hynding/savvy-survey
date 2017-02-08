
module.exports = {
  findAnswer: findAnswer,
  findCustomAnswer: findCustomAnswer
};

function findAnswer(question, value) {
  for(var i=0; i<question.answers.length; i++) {
    if (question.answers[i].value === value) {
      return question.answers[i];
    }
  }
  return undefined;
}

function findCustomAnswer(question) {
  for(var i=0; i<question.answers.length; i++) {
    if (question.answers[i].isCustom) {
      return question.answers[i];
    }
  }
  return undefined;
}