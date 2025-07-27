
let power = 0;
let health = 100;
let gold = 250;
let currentWeaponIndex = 0;
let fight;
let enemyHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const powerText = document.querySelector("#powerText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const peEgeyenemies = document.querySelector("#enemyStats");
const enemyName = document.querySelector("#enemyName");
const enemyHealthText = document.querySelector("#enemyHealth");

// weapons
const weapons = [
  { name: "stick", power: 5 },
  { name: "hammer", power: 20 },
  { name: "kurdish dagger", power: 50 },
  { name: "sword", power: 75 },
  { name: "catana", power: 100 },
  { name: "catapult", power: 300 },
];

// enemies
const enemies = [
  {
    name: "Woke",
    level: 4,
    health: 20,
  },
  {
    name: "ISIS",
    level: 8,
    health: 60,
  },
  {
    name: "Terrorist",
    level: 14,
    health: 160,
  },
  {
    name: "Mullas",
    level: 20,
    health: 300,
  }
];

const locations = [

  // town square
  {
    name: "town square",
    "buttonText": ["Biço bo Shop!", "Biço bo pêgey enemy!", "Biço bo cengî dagîrkeran!"],
    "buttonFunction": [toShop, toEnemiesStats, toFight],
    text: "To hatwîtete town square u leberdemitda tabloyek hellwasrawe, ke leserî nusrawe \"Shop\"!"
  },

  // store
  {
    name: "Shop",
    "buttonText": ["Bayî (10 gold) çareser wergire!", "Bayî (30 gold) weapon bikrre!", "Biço bo town square!"],
    "buttonFunction": [toHealth, toGunStore, toCityCenter],
    text: "To êste le naw Shopdaît!"
  },

  // cave
  {
    name: "Enemies stats",
    "buttonText": ["şerr legell lîqinekan", "şerr legell axund", "Biço bo town square!"],
    "buttonFunction": [fightWokes, fightISIS, toCityCenter],
    text: "To hatwîtete nêw enemiesewe. Komellêk enemy lêren!"
  },

  // fight
  {
    name: "Fighting",
    "buttonText": ["Attack", "Dodge", "To city center"],
    "buttonFunction": [attack, dodge, toCityCenter],
    text: "To êste legell enemies le şerdaît",
  },

  // kill monster
  {
    name: "enemy bikuje",
    "buttonText": ["To city center", "To city center", "Try lucky Spin"],
    "buttonFunction": [toCityCenter, toCityCenter, luckySpin],
    text: 'enemy borrey lê hesta w witî: "Axxxx!" katêk kuştit. Toş bwîte xawenî ezmunî nwê w baştir û goldekanîşî ke le kurdistanî dizîbun kewtinewe destit'
  },

  // loose
  {
    name: "loose",
    "buttonText": ["restart?", "restart?", "restart?"],
    "buttonFunction": [restart, restart, restart],
    text: "To loosedit &#x2620;"
  },

  // win
  {
    name: "winn",
    "buttonText": ["restart?", "restart?", "restart?"],
    "buttonFunction": [restart, restart, restart],
    text: "CONGRATULATION!!! You won! &#x1F389;"
  },

  // easter egg
  {
    name: "Lucky Spinn",
    "buttonText": ["2", "8", "Go to town square"],
    "buttonFunction": [chooseTwo, chooseThree, toCityCenter],
    text: "Yariyekî şarawet dozîyewe. yekêk le numbers hellbijêre le nêwan 0 bo 10! jimareyek lelayen gemekawe be şêweî herremekiyane helldebijerêt. eger jimarekey to legel jimare hellbijerawekeda yekbun, ewa to deybeytewe!"
  }
];

// Destnisan kirdni dugmekan
button1.onclick = toShop;
button2.onclick = toEnemiesStats;
button3.onclick = toFight;

// update
function update(location){
  peEgeyenemies.style.display = "none";

  button1.innerText = location["buttonText"][0];
  button2.innerText = location["buttonText"][1];
  button3.innerText = location["buttonText"][2];

  button1.onclick = location["buttonFunction"][0];
  button2.onclick = location["buttonFunction"][1];
  button3.onclick = location["buttonFunction"][2];

  text.innerHTML = location.text;
}

// goStore
function toShop(){
  update(locations[1]);
}

// goCave
function toEnemiesStats(){
  update(locations[2]);
}

// buyHealth
function toHealth(){

  if (gold >= 10){
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "bedaxewe goldî pewîstit niye bo çareser wergirtin!";
  }
}

// buyWeapon
function toGunStore(){

  if (currentWeaponIndex < weapons.length -1){
    if (gold >= 30){
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      powerText.innerText = power;

      let newWeapon = weapons[currentWeaponIndex].name;
      inventory.push(newWeapon);
      text.innerText = "To êsta xawenî weapon " + newWeapon + " ît.";
      text.innerText += " le naw kokrawekanda emanet hen: " + inventory;
    } else {
      text.innerText = "bedaxewe goldî pewîstit niye bo kirrînî weaponeke!";
    }
  } else {
    text.innerText = "To lem kateda xawenî behêztirîn weapont!";
    button2.innerText = "Cekek bifrose be 15 gold";
    button2.onclick = cellWeapon;
  }
}

// sellWeapon
function cellWeapon(){

  if (inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    
    let currentWeapon = inventory.shift();
    text.innerText = "To weapon " + currentWeapon + " it firoşt.";
    text.innerText = " le nêw kokrawekanitda em weaponanet hen " + inventory;
  } else {
    text.innerText = "Na, tenha weapon destit mefiroşe, dena bê weapon demênîtewe!";
  }
}

// fightSlime
function fightWokes(){
  fight = 0;
  toFight();
}

// fightBeast
function fightISIS(){
  fight = 1;
  toFight();
}

// fightDragon
function toFight(){
  fight = 2;
  toFight();
}

// goFight
function toFight(){
  update(locations[3]);
  enemyHealth = enemies[fight].health;
  peEgeyenemies.style.display = 'block';

  enemyName.innerText = enemies[fight].name;
  enemyHealthText.innerText = enemyHealth;
}

// attack
function attack(){
  text.innerText = "enemy: " + enemies[fight].name + " hêriş dekat.";
  text.innerText += " To be weapon " + weapons[currentWeaponIndex].name + " hêrişit kirde serî.";
  text.innerText += " weapon " + inventory.pop() + " şika.";
  health -= getMonsterAttackValue(enemies[fight].level);

  if(isMonsterHit()){
    enemyHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * power) +1;
  } else {
    text.innerText += " you missed it.";
  }
  healthText.innerText = health;
  enemyHealthText.innerText = enemyHealth;

  if(health <= 0){
    loose();
  } else if (enemyHealth <= 0){

    if(fight === 2){
      winn();
    }else {
      looseEnemy();
    }
  }

  if(Math.random() <= .1 && inventory.length > 1){
    const brokenWeapon = inventory.pop();
    currentWeaponIndex--;
    text.innerText += " weapon " + inventory.pop() + " şika.";
  }
}

// goTown
function toCityCenter(){
  update(locations[0]);
  button1.innerText = "Biço bo Shop!";
  button2.innerText = "Biço bo Enemies stats!";
  button3.innerText = "Biço bo cengî enemies!";

  // Inca lerada ke kirteyan leser kira, debet em karane biken
  button1.onclick = toShop;
  button2.onclick = toEnemiesStats;
  button3.onclick = toFight;

  // Textekaniyan degorrin be yarmeti innerText
  text.innerText = "To hatwîtete town square u tabloyek leberdemitda hellwasirawe leserî nusrawe \"Shop\"!";
}

// dodge
function dodge(){
  text.innerText = "To xot le herişêkî " + enemies[fight].name + " parast.";
}

// run
function pasSekisSe(){
  text.innerText = "Paşekişe le şerr";
  update(locations[0]);
}

// defeatMonster
function looseiIenemy(){
  gold += Math.floor(enemies[fight].level * 6.7);
  power += enemies[fight].level;

  // Nishandani power u gold be Update ewe
  goldText.innerText = gold;
  powerText.innerText = power;

  update(locations[4]);
}

// lose
function loose(){
  update(locations[5]);
}

// restart
function restart(){
  power = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  
  powerText.innerText = power;
  healthText.innerText = health;
  goldText.innerText = gold;
  
  toCityCenter();
}

// winn
function win(){
  update(locations[6]);
}

// getMonsterAttackValue xp
function getMonsterAttackValue(level){
  // hit
  const leEdan = (level * 5) - (Math.floor(Math.random() * power));
  console.log(leEdan);
  // return leEdan;
  return leEdan > 0 ? leEdan: 0;
}

// isMonsterHit
function isMonsterHit(){
  return Math.random() > .2 || health < 20;
}

// easterEgg
function luckySpin(){
  update(locations[7]);
}

// pick
function choose(mezende){
  const numbers = [];

  while(numbers.length < 10){
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "To jimare" + mezende + " t hellbijarid. Emaneş jimare birawekanin:\n";

  for(let i = 0; i < 10; i++){
    text.innerText += numbers[i] + "\n";
  }

  if(numbers.includes(mezende)){
    text.innerText += "Raste! Pîroze, to birrî 20 goldit birdewe.";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Helleye! birrî 10 xallî tendirustît lêkembowe.";
    health -= 10;
    healthText.innerText = health;

    if(health <= 0){
      loose();
    }
  }
}

// pickTwo
function chooseTwo(){
  choose(2);
}

// pickEight
function chooseThree(){
  choose(8);
}