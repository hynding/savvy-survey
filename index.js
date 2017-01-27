module.exports.Survey = function({id, title, description, questions, questionsMap}) {

  var questionsMap = questionsMap || {}
    , _map = {}
    , _index = 0
    , _answers = {}
    , self = this
  ;

  self.id = id;
  self.title = title;
  self.description = description;
  self.questions = questions;

  mapIndices();

  self.getQuestion = function() {
    if (_index >= questions.length) {
      return null;
    }
    return questions[_index];
  };

  self.setAnswer = function(answer) {
    var q = self.getQuestion();
    if (q) {
      _answers[q.id] = answer;
    }
  };

  self.getNextQuestion = function() {
    var q = self.getQuestion();
    if (!q) {
      return q;
    }
    var qMap = questionsMap[q.id];
    var currentAnswer = _answers[q.id];
    var hasAnswer = currentAnswer && currentAnswer.isValid();
    if (hasAnswer && qMap && qMap[currentAnswer.value] !== undefined) {
      _index = qMap[currentAnswer.value];
    } else {
      _index++;
    }
    return self.getQuestion();
  };

  self.addQuestion = function(question, questionMap, index) {
    index = index || questions.length;
    questions.splice(index, 0, question);
    _map[question.id] = index;
    if (questionMap) {
      questionsMap[question.id] = questionMap;
    }
  };

  self.updateMapping = function(questionId, map) {
    questionsMap[questionId] = map;
  };

  function mapIndices() {
    _map = {};
    questions.forEach((q, i)=>{
      _map[q.id] = i;
    });
  }
};

module.exports.Question = function({id, text, answers}) {
  var self = this;

  self.id = id;
  self.text = text;
  self.answers = answers;
}

module.exports.Answer = function({text, value}) {

  var self = this;

  self.text = text;
  self.value = sanitize(value);

  self.isValid = function() {
    return self.value !== '' && self.value !== null;
  };

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
};
