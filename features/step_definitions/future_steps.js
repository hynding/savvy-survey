var {defineSupportCode} = require('cucumber');
var helpers = require('../support/helpers');
var {Survey, Question, Answer} = require('../../index');
var assert = require('assert');

defineSupportCode(function({Given}){

  Given("I pre-answer question {num} with {ans}", (num, ans)=>{
    var answer = helpers.findAnswer(this.survey.questions[num-1], ans);
    assert.notEqual(answer, undefined, 'Answer not found');
    this.survey.setAnswer(answer, this.survey.questions[num-1]);
  });

});
