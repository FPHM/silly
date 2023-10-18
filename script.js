/*

spaghetti code warning

*/
var player = {
    atk: 20,
    atkIncrease: 0,
    hp: 100,
    maxHP: 100,
    hpIncrease: 0,
    gold: 0,
    worldLevel: 1,
    coinMultiplier: 1,
    blockRate: 0.3,
    block: false,
    battle: false,
    reviving: false,
    atkIncreaseBought: false,
    hpIncreaseBought: false,
}
var upgrades = {
    weaponBuyCost: 5,
    weaponBuy2Cost: 20,
    HPBuyCost: 10,
    HPBuy2Cost: 30,
    shieldBuyCost: 10,
    WLBuyCost: 10,
}
const enemyName = ["Hilichurl", "Slime", "Zombie", "Skeleton"]
const enemyLvl = [1, 5, 10, 20, 30, 50, 75, 90, 100]
var enemyHP = 0
var maxHP = 0
var enemyATK = 0
var enemy = 0
var lvl = 0
var atkTimer = 0
function HP(x){
    return enemyLvl[x]*((Math.pow(player.worldLevel, 2))*100)
}
function ATK(x){
    return Math.pow((enemyLvl[x]*(player.worldLevel+1)),2)
}
function totalPATK() {
    return player.atk + (player.atk*player.atkIncrease)
}
function totalPHP() {
    return player.maxHP + (player.maxHP*player.hpIncrease)
}
function newEnemy(){
    enemy = Math.floor(Math.random()*enemyName.length)
    lvl = Math.floor(Math.random()*player.worldLevel) //dictates the possible level of enemies based on your world level
    document.getElementById("enemyName").innerHTML = "Enemy: " + enemyName[enemy]
    document.getElementById("enemyLvl").innerHTML = "Lvl " + enemyLvl[lvl]
    enemyHP = HP(lvl)
    maxHP = HP(lvl)
    enemyATK = ATK(lvl)
    document.getElementById("health2").style.width = (enemyHP/maxHP)*100 + "%"
}
function kill(){
    if(player.battle) {
        if (enemyHP > 0) {
            enemyHP -= totalPATK()
            document.getElementById("health2").style.width = (enemyHP / maxHP) * 100 + "%"
            if (enemyHP <= 0) {
                document.getElementById("health2").style.width = "0"
                player.gold += Math.random()*player.coinMultiplier*enemyLvl[lvl]
                setTimeout(newEnemy, 1500)
            }
        }
    }
}
function block(){
    player.block = true
    document.getElementById("block").classList.add("disabled")
}
function enemyAttack(){
    if(player.block){
        player.block = false
        document.getElementById("block").classList.remove("disabled")
        player.hp -= enemyATK*(1 - player.blockRate)
        if(player.hp <= 0){
            player.hp = 0
            document.getElementById("healthP2").style.width = "0"
            document.getElementById("revive").style.display = "inline"
            document.getElementById("combat").classList.add("disabled")
            document.getElementById("combat").disabled = true
            toggleCombat()
        }
    }
    else {
        player.hp -= enemyATK
        if(player.hp <= 0){
            player.hp = 0
            document.getElementById("healthP2").style.width = "0"
            document.getElementById("revive").style.display = "inline"
            document.getElementById("combat").classList.add("disabled")
            document.getElementById("combat").disabled = true
            toggleCombat()
        }
    }
}
function revive() {
    player.reviving = true
    document.getElementById("revive").style.display = "none"
}
if (enemyHP <= 0){
    newEnemy()
}
function toggleCombat(){
    if (player.battle){
        player.battle = false
        document.getElementById("combat").innerHTML = "Combat: Off"
        document.getElementById("block").classList.add("disabled")
        document.getElementById("block").disabled = true
        document.getElementById("kill").classList.add("disabled")
        document.getElementById("kill").disabled = true
    } else {
        player.battle = true
        document.getElementById("block").classList.remove("disabled")
        document.getElementById("block").disabled = false
        document.getElementById("kill").classList.remove("disabled")
        document.getElementById("kill").disabled = false
        document.getElementById("combat").innerHTML = "Combat: On"
    }
}
function weaponBuy() {
    if(player.gold >= upgrades.weaponBuyCost) {
        player.gold -= upgrades.weaponBuyCost
        player.atk += 20
        upgrades.weaponBuyCost = Math.round(Math.pow(upgrades.weaponBuyCost, 1.1) * 100) / 100
        document.getElementById("bAtkIncrease").innerHTML = player.atk + " => " + (player.atk + 20)
        document.getElementById("weaponBuy").innerHTML = "Cost: <img alt=\"gold\" src=\"https://pseudonian.github.io/SynergismOfficial/Pictures/Coin.png\"> " + upgrades.weaponBuyCost
    }
}
function weaponBuy2() {
    if(player.gold >= upgrades.weaponBuy2Cost) {
        player.atkIncreaseBought = true
        player.gold -= upgrades.weaponBuy2Cost
        player.atkIncrease = Math.round((player.atkIncrease+0.02)*100)/100
        upgrades.weaponBuy2Cost = Math.round((upgrades.weaponBuy2Cost*1.1) * 100) / 100
        document.getElementById("atkIncrease").innerHTML = Math.round(player.atkIncrease*100) + "% => " + Math.round(player.atkIncrease*100 + 2) + "%"
        document.getElementById("weaponBuy2").innerHTML = "Cost: <img alt=\"gold\" src=\"https://pseudonian.github.io/SynergismOfficial/Pictures/Coin.png\"> " + upgrades.weaponBuy2Cost
        if(player.atkIncrease >= 2){
            document.getElementById("atkIncrease").innerHTML = "200%"
            document.getElementById("weaponBuy2").innerHTML = "Max Level Reached."
            document.getElementById("weaponBuy2").classList.add("disabled")
            document.getElementById("weaponBuy2").disabled = true
        }
    }
}
function HPBuy() {
    if(player.gold >= upgrades.HPBuyCost) {
        player.gold -= upgrades.HPBuyCost
        player.maxHP *= 2
        player.hp = totalPHP()
        upgrades.HPBuyCost = Math.round((upgrades.HPBuyCost*2.5) * 100) / 100
        document.getElementById("bHPIncrease").innerHTML = player.maxHP + " => " + (player.maxHP * 2)
        document.getElementById("HPBuy").innerHTML = "Cost: <img alt=\"gold\" src=\"https://pseudonian.github.io/SynergismOfficial/Pictures/Coin.png\"> " + upgrades.HPBuyCost
    }
}
function HPBuy2() {
    if(player.gold >= upgrades.HPBuy2Cost) {
        player.hpIncreaseBought = true
        player.gold -= upgrades.HPBuy2Cost
        player.hpIncrease = Math.round((player.hpIncrease+0.02)*100)/100
        player.hp = totalPHP()
        upgrades.HPBuy2Cost = Math.round((upgrades.HPBuy2Cost*1.1) * 100) / 100
        document.getElementById("HPIncrease").innerHTML = Math.round(player.hpIncrease*100) + "% => " + Math.round(player.hpIncrease*100 + 2) + "%"
        document.getElementById("HPBuy2").innerHTML = "Cost: <img alt=\"gold\" src=\"https://pseudonian.github.io/SynergismOfficial/Pictures/Coin.png\"> " + upgrades.HPBuy2Cost
        if(player.hpIncrease >= 2){
            document.getElementById("HPIncrease").innerHTML = "200%"
            document.getElementById("HPBuy2").innerHTML = "Max Level Reached."
            document.getElementById("HPBuy2").classList.add("disabled")
            document.getElementById("HPBuy2").disabled = true
        }
    }
}
function shieldBuy() {
    if(player.gold >= upgrades.shieldBuyCost) {
        player.gold -= upgrades.shieldBuyCost
        player.blockRate += 0.1
        upgrades.shieldBuyCost *= 5
        document.getElementById("shieldIncrease").innerHTML = Math.round(player.blockRate*100) + "% => " + Math.round(player.blockRate*100 + 10) + "%"
        document.getElementById("shieldBuy").innerHTML = "Cost: <img alt=\"gold\" src=\"https://pseudonian.github.io/SynergismOfficial/Pictures/Coin.png\"> " + upgrades.shieldBuyCost
        if(player.blockRate >= 0.85){
            document.getElementById("shieldIncrease").innerHTML = "90% => 99%"
        }
        if (player.blockRate >= 0.99){
            player.blockRate = 0.99
            document.getElementById("shieldIncrease").innerHTML = "99%"
            document.getElementById("shieldBuy").innerHTML = "Max Level Reached."
            document.getElementById("shieldBuy").classList.add("disabled")
            document.getElementById("shieldBuy").disabled = true
        }
    }
}
function WLBuy() {
    if(player.gold >= upgrades.WLBuyCost) {
        player.gold -= upgrades.WLBuyCost
        player.coinMultiplier *= 3
        player.worldLevel += 1
        upgrades.WLBuyCost *= 10
        document.getElementById("WLIncrease").innerHTML = player.worldLevel + " => " + (player.worldLevel + 1)
        document.getElementById("WLBuy").innerHTML = "Cost: <img alt=\"gold\" src=\"https://pseudonian.github.io/SynergismOfficial/Pictures/Coin.png\"> " + upgrades.WLBuyCost
        if(player.worldLevel >= 9){
            document.getElementById("WLIncrease").innerHTML = "9"
            document.getElementById("WLBuy").innerHTML = "Max Level Reached."
            document.getElementById("WLBuy").classList.add("disabled")
            document.getElementById("WLBuy").disabled = true
        }
    }
}
var mainGameLoop = window.setInterval(function() {
    if(player.battle) {
        if (atkTimer < 100 && enemyHP > 0) {
            atkTimer += 2
            document.getElementById("time2").style.width = atkTimer + "%"
        } else if (enemyHP > 0) {
            enemyAttack()
            atkTimer = 0
        } else {
            atkTimer = 0
        }
    }
    if(player.gold >= upgrades.weaponBuyCost){
        document.getElementById("weaponBuy").classList.remove("btn-danger")
        document.getElementById("weaponBuy").classList.add("btn-success")
    } else {
        document.getElementById("weaponBuy").classList.add("btn-danger")
        document.getElementById("weaponBuy").classList.remove("btn-success")
    }
    if(player.gold >= upgrades.weaponBuy2Cost||player.atkIncrease >= 2){
        document.getElementById("weaponBuy2").classList.remove("btn-danger")
        document.getElementById("weaponBuy2").classList.add("btn-success")
    } else {
        document.getElementById("weaponBuy2").classList.add("btn-danger")
        document.getElementById("weaponBuy2").classList.remove("btn-success")
    }
    if(player.gold >= upgrades.HPBuyCost){
        document.getElementById("HPBuy").classList.remove("btn-danger")
        document.getElementById("HPBuy").classList.add("btn-success")
    } else {
        document.getElementById("HPBuy").classList.add("btn-danger")
        document.getElementById("HPBuy").classList.remove("btn-success")
    }
    if(player.gold >= upgrades.HPBuy2Cost||player.hpIncrease >= 2){
        document.getElementById("HPBuy2").classList.remove("btn-danger")
        document.getElementById("HPBuy2").classList.add("btn-success")
    } else {
        document.getElementById("HPBuy2").classList.add("btn-danger")
        document.getElementById("HPBuy2").classList.remove("btn-success")
    }
    if(player.gold >= upgrades.shieldBuyCost||player.blockRate >= 0.95){
        document.getElementById("shieldBuy").classList.remove("btn-danger")
        document.getElementById("shieldBuy").classList.add("btn-success")
    } else {
        document.getElementById("shieldBuy").classList.add("btn-danger")
        document.getElementById("shieldBuy").classList.remove("btn-success")
    }
    if(player.gold >= upgrades.WLBuyCost||player.worldLevel >= 9){
        document.getElementById("WLBuy").classList.remove("btn-danger")
        document.getElementById("WLBuy").classList.add("btn-success")
    } else {
        document.getElementById("WLBuy").classList.add("btn-danger")
        document.getElementById("WLBuy").classList.remove("btn-success")
    }

    document.getElementById("healthP2").style.width = (player.hp / totalPHP()) * 100 + "%"
    if(player.reviving){
        player.hp += totalPHP()/50
        if(player.hp >= totalPHP()){
            player.hp = totalPHP()
            player.reviving = false
            document.getElementById("combat").classList.remove("disabled")
            document.getElementById("combat").disabled = false
        }
    }

    document.getElementById("gold").innerHTML = "<img alt=\"gold\" src=\"https://pseudonian.github.io/SynergismOfficial/Pictures/Coin.png\">: " + Math.round(player.gold*100)/100
    if(player.hpIncreaseBought){document.getElementById("hp").innerHTML = "Max HP: " + player.maxHP + "<span style='color: aqua'> + " + player.maxHP*player.hpIncrease + "</span>"}
    else{document.getElementById("hp").innerHTML = "Max HP: " + player.maxHP}
    if(player.atkIncreaseBought){document.getElementById("atk").innerHTML = "Base Attack: " + player.atk + "<span style='color: aqua'> + " + player.atk*player.atkIncrease + "</span>"}
    else{document.getElementById("atk").innerHTML = "Base Attack: " + player.atk}
}, 100)