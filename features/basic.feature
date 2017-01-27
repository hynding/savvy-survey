Feature: Basic

  Scenario: Answer a question, receive the next
    Given a 2 question survey of yes or no answers
    When I answer question 1 with yes
    And ask for the next question
    Then I am returned question 2

  Scenario: Answer first question, receive the third
    Given a 3 question survey of yes or no answers
    And question 1 answer yes maps to question 3
    When I answer question 1 with yes
    And ask for the next question
    Then I am returned question 3