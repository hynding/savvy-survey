Feature: A user can pre-answer questions that will be asked later in the survey
  Which will then be skipped when the user reaches it
  While still acting on the answer mapping of that question to determine the next

  Scenario: Pre-answer all non-first question and receive no more after answering first
    Given a 2 question survey of yes or no answers
    And I pre-answer question 2 with yes
    And I answer question 1 with yes
    When I ask for the next question
    Then I do not receive another question
