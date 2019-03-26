This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## SuperLotto
The superlotto app is a lottery app that allows a user to play a game and win a house. As a registered user, you can recharge your account and monitor your account profile. You can also cash out the cash you have won. Or convert it into money to be used in your account. This app has just one game. Lotto Balls. 

### Playing the Lotto Ball
Before a user can play this game, he must be registered and his account must be recharged. A player must stake a game before he can play and a player cannot stake more than what he has in his account balance. After a stake amount is selected, the `play` button is clicked to start the game. 

# `Procedure`
  i. The random balls become active and the player can pick just 5 balls. 
  ii. After these balls are picked, the player clicks on `Generate Loto Number` button to generate lotto          numbers. 
  If any number generated by the click of `Generate Lotto Number` matches the random number picked by the       player, it is added to the balls won `(Win Balls)`. 
  iii. If there are lotto balls and random balls that match, the player wins the amount he staked on. i.e if a    player stakes #5,000 and wins a game, he wins #5,000 extra and he goes home with #10,000 (Money staked +      Money Won). You win exactly the amount you stake for a game. But if the player losses, he walsk home with       nothing. 
  
  iv. A player can play more than one or two game(s). A game session is ended when a player clicks on the       button `End Game`, then the amount that player goes home with is calculated and added to his account. 
  

### Recharging your account. 
i. On the Accounts Page, just under the `Account Balance` line, a button `Recharge Account` is present. Click on the button to recharge. 
ii. These credentials are the default for making payment : 
    ```
    Account Number : 000000111111
    Pin : 1220 
    ```
    Every other fields can be filled however the user wants. 
This operation gives a success message when transaction is successful and an error message when it isn't. 

### To use this app : 
  Click the link below to see an online demo of the app: 
    `https://superlotto-3be45.firebaseapp.com/`
    
  Or 
  ```
  1. Git clone or download https://github.com/Excellence-daniel/superlotto.git
  2. cd superlotto/
  3. npm start 
  
  ```
