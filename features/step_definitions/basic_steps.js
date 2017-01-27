var {defineSupportCode} = require('cucumber');
var {Survey, Question, Answer} = require('../../index');
var assert = require('assert');

defineSupportCode(function({Given, When, Then}){

  var survey
    , actualQuestion
    , expectedQuestion
    ;

  Given("a {length} question survey of {yes} or {no} answers", (length, yes, no)=> {
    survey = generateSurvey(length, [yes, no]);
  });

  Given("question {a} answer {value} maps to question {b}", (a, value, b)=>{
    var questionA = survey.questions[a-1];
    survey.updateMapping(questionA.id, generateMapping(b-1, value));
  });

  When("I answer question {num} with {value}", (num, value)=>{
    var answer = findAnswer(survey.questions[num-1], value);
    survey.setAnswer(answer);
  });

  When("ask for the next question", ()=>{
    actualQuestion = survey.getNextQuestion();
  });

  Then("I am returned question {num}", (num)=>{
    expectedQuestion = survey.questions[num-1];
    assert.equal(actualQuestion, expectedQuestion);
  });
});

var questionPrefix = 'q';

function generateSurvey(numQuestions, answers, map) {
  return new Survey({
    questions: generateQuestions(numQuestions, answers),
    questionsMap: map || {}
  })
}

function generateMapping(questionId, value) {
  var map = {};
  map[value] = questionId;
  return map;
}

function generateQuestion(config) {
  return new Question(config);
}

function generateAnswer(config) {
  return new Answer(config);
}

function generateQuestions(count, answers) {
  var questions = [];
  for(var i=1; i<=count; i++) {
    questions.push(generateQuestion({
      id: `${questionPrefix}${i}`,
      text: `dumb question ${i}`,
      answers: generateAnswers(answers)
    }));
  }
  return questions;
}

function generateAnswers(answerValues) {
  var answers = [];
  for(var i=0; i<answerValues.length; i++) {
    answers.push(generateAnswer({
      text: answerValues[i],
      value: answerValues[i]
    }));
  }
  return answers;
}

function findAnswer(question, value) {
  for(var i=0; i<question.answers.length; i++) {
    if (question.answers[i].value === value) {
      return question.answers[i];
    }
  }
}