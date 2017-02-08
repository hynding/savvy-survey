var {Survey, Question, Answer} = require('../../index');

var questionPrefix = 'q';

module.exports = {
  getNewSurvey: getNewSurvey,
  getNewQuestion: getNewQuestion,
  getNewQuestions: getNewQuestions,
  getNewAnswer: getNewAnswer,
  getNewAnswers: getNewAnswers
};

function getNewSurvey(numQuestions, answers, map) {
  return new Survey({
    questions: getNewQuestions(numQuestions, answers),
    answerMap: map || {}
  })
}

function getNewQuestion(config) {
  return new Question(config);
}

function getNewAnswer(config) {
  return new Answer(config);
}

function getNewQuestions(count, answers) {
  var questions = [];
  for(var i=1; i<=count; i++) {
    questions.push(getNewQuestion({
      id: `${questionPrefix}${i}`,
      text: `dumb question ${i}`,
      answers: getNewAnswers(answers)
    }));
  }
  return questions;
}

function getNewAnswers(answerValues) {
  var answers = [];
  for(var i=0; i<answerValues.length; i++) {
    answers.push(getNewAnswer({
      text: answerValues[i],
      value: answerValues[i],
      isCustom: answerValues[i] == 'custom'
    }));
  }
  return answers;
}