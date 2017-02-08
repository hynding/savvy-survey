class Survey {
  constructor({id, title, description, questions, answers, currentQuestionId, answerMap, customKey}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.answers = answers || {};
    this.answerMap = answerMap || {};
    this.customKey = (customKey && customKey.length) ? customKey: '*';
    this.index = 0;
    this.idMap = {};

    this.mapIndices(currentQuestionId)
  }

  mapIndices(currentQuestionId) {
    this.questions.forEach((q, i)=>{
      if (currentQuestionId && q.id.toString() === currentQuestionId.toString()) {
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
    this.answerMap[fromQuestion.id][this.getAnswerKey(answer)] = toQuestion.id;
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

  setAnswer(answer, futureQuestion) {
    var q = futureQuestion || this.getQuestion();
    if (q) {
      this.answers[q.id] = answer;
    }
    return this;
  }

  getAnswerKey(answer) {
    return answer.isCustom ? this.customKey: answer.value;
  }

  getNextQuestion() {
    var q = this.getQuestion(), nextQuestion;
    if (!q) {
      return q;
    }
    var skippers = this.answerMap[q.id];
    var currentAnswer = this.answers[q.id];
    var hasAnswer = currentAnswer && currentAnswer.isValid();
    var nextId = (hasAnswer && skippers) ? skippers[this.getAnswerKey(currentAnswer)] : undefined;
    if (nextId !== undefined) {
      this.index = this.idMap[nextId];
    } else {
      this.index++;
    }
    nextQuestion = this.getQuestion();
    if (nextQuestion && this.answers[nextQuestion.id] && this.answers[nextQuestion.id].isValid()) {
      return this.getNextQuestion();
    }
    return nextQuestion;
  }

}

module.exports = Survey;