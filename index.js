class Survey {

  constructor(id, title, description, questions) {
    this.id = id;
    this.title = title;
    this.questions = questions;
    this.description = description;
    this.map();
  }

  map() {
    this.qmap = {};
    this.questions.forEach((q)=>{
      this.qmap[q.id] = q;
    });
    console.log(this.qmap);
  }
}

class Question {
  constructor(id, text, answers) {
    this.id = id;
    this.text = text;
    this.answers = answers;
  }
}

class Answer {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
}

//test - move to steps
var a1 = new Answer('yes', true);
var a2 = new Answer('no', false);
var q1 = new Question('q1', 'is this a questions?', [a1, a2]);
new Survey('s1', 'first survey', 'something contextual', [q1]);