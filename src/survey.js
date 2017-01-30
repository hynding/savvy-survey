module.exports = function({id, title, description, questions, questionsMap}) {

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
    var nextId = qMap ? qMap[currentAnswer.value] : undefined;
    if (hasAnswer && nextId !== undefined) {
      _index = _map[nextId];
    } else {
      _index++;
    }
    return self.getQuestion();
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