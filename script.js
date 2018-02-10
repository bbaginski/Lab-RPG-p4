
var flasharea = document.body; 
var display1 = document.getElementById('StartGameWrap');    
var display2 = document.getElementById('GameOnWrap');  
var display3 = document.getElementById('GameOff');
var StartBtn = document.getElementById('StartGameBtn'); 
var CP = document.getElementById('Commands'); 
var CPW = document.getElementById('ControlPanel'); 
  
var enemyHealthBar = document.querySelectorAll('#enemyHealth div')[0];  
var battleDesc = document.getElementById('battleDesc'); 
var enemyPic = document.getElementById('enemyPic'); 
var enemyShake = document.getElementById('PicWrap'); 
var enemyStats = document.getElementById('enemyStats');





var attackBtn = document.getElementById('Attack');  
var healBtn = document.getElementById('Heal');  
var runBtn = document.getElementById('Run');  
var yourHealthBar = document.querySelectorAll('#yourHealth div')[0];  
var healsRemaining = document.querySelectorAll('#HealsRemaining span')[0];  
var winsBar = document.querySelectorAll('#wins div')[0];  

var character = {
  name: "",
  totalhealth : 40,
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
    if (this.health > this.totalhealth){
      this.health = this.totalhealth;
    }
    this.healRemaining--;
    return healStat;
  } 
};
var enemy = {
  name: `Grant`,
  winsNeeded:3,
  totalhealth : 10, 
  health : 10,
  generateAttackDamage() {
    var attackStat = getRandom(5);
    return attackStat;
  }    
};

//---------------------end of initialize--------------------------------------------
 

StartBtn.addEventListener('click', startGame);

function startGame(){
    character.name = prompt("What is Your Name?");
    display1.classList.add("off");
    display2.classList.remove("off");
    startCombat();
}

function startCombat(){
  healsRemaining.innerHTML = character.healRemaining;  
  battleDesc.innerHTML = `${enemy.name} has appeared, and wants to fight!`;

  //------------------------------------------------------------------------------------------attack

  attackBtn.addEventListener('click', function (){ 
    CP.classList.add("hold"); 
    enemyShake.classList.add("enemyShake");  
    var attack = character.generateAttackDamage();
    enemy.health -= attack;
    var bar = getPercent(enemy.health, enemy.totalhealth);
    enemyHealthBar.style.width =`${bar}%`;
    battleDesc.innerHTML =`${character.name} attacks ${enemy.name}, it does ${attack} damage, his HP is at ${enemy.health}. `;   
    if (enemy.health <= 0 ){      
      character.wins++;
      bar = getPercent(character.wins, enemy.winsNeeded);
      winsBar.style.width =`${bar}%`;
      if (character.wins === enemy.winsNeeded){
        enemyHealthBar.style.width =`0%`;
        setTimeout(function(){  enemyPic.src="dead.jpg";}, 1000);
        battleDesc.innerHTML =`YOU HAVE DEFEATED ${enemy.name}!`;
        setTimeout(function(){  GameOver();    }, 5000);
       
      }else {        
        enemy.health = 10;
        bar = getPercent(enemy.health, enemy.totalhealth);
        enemyHealthBar.style.width =`${bar}%`;
        battleDesc.innerHTML =`${enemy.name} HAS FALLEN! ${character.name} has ${character.wins} wins.`;
      }
    } 
    
    if (character.wins < enemy.winsNeeded){
      setTimeout(function(){
        enemyAttack();
        enemyShake.classList.remove("enemyShake");        
      }, 1000);    
    }
    
  });




  //---------------------------------------------------------------------------------------------------------heal

  healBtn.addEventListener('click', function (){ 
    if (character.healRemaining > 0 ){  
        var restore = character.heal();      
        battleDesc.innerHTML =`You have healed yourself by ${restore} points! you only have ${character.healRemaining} heals remaining.`;
        var bar = getPercent(character.health, character.totalhealth);
        yourHealthBar.style.width =`${bar}%`;
        
    }else if( character.healRemaining <= 0){
      battleDesc.innerHTML = `No Heals Remaining!`;
    }
    healsRemaining.innerHTML = character.healRemaining;
  });


  //---------------------------------------------------------------------------------------------------------run


  runBtn.addEventListener('click', function (){ 
    battleDesc.innerHTML = `You have successfully ran away!`; 
    CP.classList.add("hold"); 
    enemyStats.classList.add("hold");    
    CPW.classList.add("enemyShake"); 
    setTimeout(function(){ 
      GameOver();
     }, 3000);
  });

  //-----------------------------------------------------------------------------------------------------enemy attack
  function enemyAttack(){
    
    flasharea.classList.add("hit");
    var attack = enemy.generateAttackDamage();
    character.health -= attack;
    var bar = getPercent(character.health, character.totalhealth);
    yourHealthBar.style.width =`${bar}%`;
    battleDesc.innerHTML = `${enemy.name} attacks and does ${attack} damage, ${character.name} HP is at ${character.health}.`;
    if (character.health <= 0){
      battleDesc.innerHTML = `${enemy.name} HAS DEFEATED YOU!`;
      setTimeout(function(){  GameOver();   }, 3000);
    }
    if (character.health > 0){ 
      setTimeout(function(){  flasharea.classList.remove("hit");  }, 100);    
      setTimeout(function(){ CP.classList.remove("hold");   }, 1000); 
    }
  };
  
}


function getPercent(current, total) {
  percent = Math.floor((current / total) * 100)
  return percent;
}

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1 );
}
function GameOver() {
  display2.classList.add("off");
  display3.classList.remove("off");
  // setTimeout(function(){ 
  //   display3.classList.add("off");
  //   display1.classList.remove("off");
  //  }, 3000);

}