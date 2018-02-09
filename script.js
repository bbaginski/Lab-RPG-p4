startGame();





function startGame(){
  var play = confirm("Do you want to play?");
  if (play === true){
    var username = prompt("What is Your Name?");
    startCombat(username);
  }
}

function startCombat(username){

  var character = {
    name: username,
    health : 40,
    healRemaining: 2,
    wins:0,
    generateAttackDamage() {
      var attackStat = getRandom(3);
      return attackStat;
    },
    heal(){  
      var healStat  =  getRandom(10); 
      this.health =  healStat + this.health;
      this.healRemaining--;
      return healStat;
    } 
  };
  var enemy = {
    name: `Grant`,
    health : 10,
    generateAttackDamage() {
      var attackStat = getRandom(5);
      return attackStat;
    }    
  };
 //-------------------------------------------------------------------------- 
  while (character.health > 0){
    var attack = enemy.generateAttackDamage();
    character.health -= attack;
    console.log(`${enemy.name} attacks and does ${attack} damage, ${character.name} HP is at ${character.health}.`);
    if (character.health <= 0){
      console.log('GRANT HAS DEFEATED YOU!');
      break;
    } 
    
    var command = prompt(`Would like to “attack” or "heal" or “run”?`);
    if (command.toLowerCase() === "run"){
      console.log('You have successfully ran away!');
      break;
    }

    if (command.toLowerCase() === "heal" && character.healRemaining > 0 ){  
        var restore = character.heal();      
        console.log(`You have healed yourself by ${restore} points! you only have ${character.healRemaining} heals remaining.`);
        continue;
    }else if(command.toLowerCase() === "heal" && character.healRemaining <= 0){
        console.log('No Heals Remaining!');
    }else {
      attack = character.generateAttackDamage();
      enemy.health -= attack;
      console.log(`${character.name} attacks ${enemy.name}, it does ${attack} damage, his HP is at ${enemy.health}.`);
      if (enemy.health <= 0 && character.wins === 3){
        console.log('YOU HAVE DEFEATED GRANT!');
        break;
      }
      else if (enemy.health <= 0 ){      
        character.wins++;
        enemy.health = 10;
        console.log(`GRANT HAS FALLEN! ${character.name} has ${character.wins} wins.`);
      } 

    }  
    
  }
  //---------------------------------------------------------------------------------------
  console.log('GAME OVER')
  
}


function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1 );
}
