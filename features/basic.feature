Feature: Basic

  Scenario: Answer a question, receive the next
    Given a 2 question survey
    When I answer question 1
    Then I am returned question 2