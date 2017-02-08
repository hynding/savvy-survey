Feature: Custom answers

  Scenario: Retrieve a custom answer
    Given a 2 question survey of custom or skip answers
    And I custom answer question 1 with a random value
    When I ask for the next question
    Then I am returned question 2

  Scenario: Answer a mapped custom answer
    Given a 3 question survey of custom or skip answers
    And question 1 answer custom maps to question 3
    And I custom answer question 1 with a random value
    When I ask for the next question
    Then I am returned question 3