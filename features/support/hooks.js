var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After, Before}) {

  Before(()=>{
    this.survey = null;
    this.actualQuestion = null;
    this.expectedQuestion = null;
  });

  After(()=>{

  })
});