var {defineSupportCode} = require('cucumber');
var generator = require('../support/generator');
var helpers = require('../support/helpers');
var {Survey, Question, Answer} = require('../../index');
var assert = require('assert');

defineSupportCode(function({Given, When, Then}){

  Given("a {length} question survey of {yes} or {no} answers", (length, yes, no)=> {
    this.survey = generator.getNewSurvey(length, [yes, no]);
  });

  Given("question {a} answer {value} maps to question {b}", (a, value, b)=>{
    var questionA = this.survey.questions[a-1]
      , questionB = this.survey.questions[b-1]
      , answer = helpers.findAnswer(questionA, value)
      ;
    assert.notEqual(answer, undefined, 'Answer not found');
    this.survey.mapAnswer(questionA, answer, questionB);
  });

  Given("I answer question {num} with {value}", (num, value)=>{
    var answer = helpers.findAnswer(this.survey.questions[num-1], value);
    this.survey.setAnswer(answer);
  });

  When("I ask for the next question", ()=>{
    this.actualQuestion = this.survey.getNextQuestion();
  });

  Then("I am returned question {num}", (num)=>{
    this.expectedQuestion = this.survey.questions[num-1];
    assert.equal(this.actualQuestion, this.expectedQuestion);
  });

  Then("I do not receive another question", ()=>{
    this.expectedQuestion = this.survey.getQuestion();
    assert.equal(this.expectedQuestion, null);
  });
});