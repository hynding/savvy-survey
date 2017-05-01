Feature: Basic

  Scenario: Answer a question, receive the next
    Given a 2 question survey of yes or no answers
    And I answer question 1 with yes
    When I ask for the next question
    Then I am returned question 2

  Scenario: Answer a mapped question with mapped value, receive next contextual question
    Given a 3 question survey of yes or no answers
    And question 1 answer yes maps to question 3
    And I answer question 1 with yes
    When I ask for the next question
    Then I am returned question 3

  Scenario: Answer a mapped question with unmapped value, receive next contextual question
    Given a 3 question survey of yes or no answers
    And question 1 answer yes maps to question 3
    And I answer question 1 with no
    When I ask for the next question
    Then I am returned question 2

  Scenario: Answered last question, receive no more
    Given a 1 question survey of yes or no answers
    And I answer question 1 with no
    When I ask for the next question
    Then I do not receive another question