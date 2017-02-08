var {defineSupportCode} = require('cucumber');
var helpers = require('../support/helpers');
var {Survey, Question, Answer} = require('../../index');
var assert = require('assert');

defineSupportCode(function({Given}){

  Given("I custom answer question {num} with a random value", (num)=>{
    var answer = helpers.findCustomAnswer(this.survey.questions[num-1]);
    assert.notEqual(answer, undefined, 'Custom answer not found');
    answer.value = Math.round(Math.random()*10000);
    this.survey.setAnswer(answer);
  });

});
