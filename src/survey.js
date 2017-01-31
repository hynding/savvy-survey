class Survey {
  constructor({id, title, description, questions, answers, currentQuestionId, answerMap}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.answers = answers || {};
    this.answerMap = answerMap || {};
    this.index = 0;
    this.idMap = {};

    this.mapIndices(currentQuestionId)
  }

  mapIndices(currentQuestionId) {
    this.questions.forEach((q, i)=>{
      if (q.id.toString() === currentQuestionId.toString()) {
        this.index = i;
      }
      this.idMap[q.id] = i;
    });
    return this;
  }

  mapAnswer(fromQuestion, answer, toQuestion) {
    if (!answer.isValid()) {
      return console.error('Answer value is invalid for mapping');
    }
    this.answerMap[fromQuestion.id] = this.answerMap[fromQuestion.id] || {};
    this.answerMap[fromQuestion.id][answer.value] = toQuestion.id;
    return this;
  }

  getQuestion(id) {
    if (id && this.idMap[id] !== undefined) {
      this.index = this.idMap[id];
    }
    if (this.index >= this.questions.length) {
      return null;
    }
    return this.questions[this.index];
  }

  setAnswer(answer) {
    var q = this.getQuestion();
    if (q) {
      this.answers[q.id] = answer;
    }
    return this;
  }

  getNextQuestion() {
    var q = this.getQuestion();
    if (!q) {
      return q;
    }
    var skippers = this.answerMap[q.id];
    var currentAnswer = this.answers[q.id];
    var hasAnswer = currentAnswer && currentAnswer.isValid();
    var nextId = (hasAnswer && skippers) ? skippers[currentAnswer.value] : undefined;
    if (nextId !== undefined) {
      this.index = this.idMap[nextId];
    } else {
      this.index++;
    }
    return this.getQuestion();
  }

}

module.exports = Survey;