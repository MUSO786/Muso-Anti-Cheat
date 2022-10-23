import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from 'mojang-minecraft';
import { appealLink } from './config.js';
import { globalBanned } from './globalban.js';
const overworld = world.getDimension('overworld');

const gametestTest = () => {
    const gt_test = `scoreboard players set @a[scores={MAC-gametest=0}] MAC-gametest 1`;
    try { overworld.runCommand(gt_test); } catch { }
};
function scoreTest(name, objective) {
    try {
        const score = parseInt(overworld.runCommand(`scoreboard players test ${name} ${objective} *`).statusMessage.match(/-?\d+/));
        return score;
    } catch {
        return;
    }
}


const name = player.getName();
if(name = globalBanned) {
    player.runCommand(`tellraw @a[tag=MAC-mod] {"rawtext":[{"text":"§l§c${name}§r §7has been banned for being a threat to the server.§r"}]}`);
    player.runCommand(`kick ${name} §l§cHey!§r §7You have been Global Banned.§r\n \n§fAppeal Link §l§k§8|§r §fhttps://discord.gg/Ch8sqUMBJe§r`);
}

function worldBorder(player) {
    const {x, y, z} = player.location
    const name = player.getName();
    if (Math.abs(x) >= 30000000 || Math.abs(y) >= 30000000 || Math.abs(z) >= 30000000) {
        if(player.hasTag('MAC-admin')) { return }
        player.runCommand(`tp @s 0 0 0`);
        player.runCommand(`tellraw @a[tag=MAC-mod] {"rawtext":[{"text":"§l§c${name}§r §7has been kicked for "Crasher".§r"}]}`);
        player.runCommand(`kick ${name} §l§cHey!§r §7You have been kicked for "Crasher".§r\n \n§fAppeal Link §l§k§8|§r §f${appealLink}§r`);
    }
}

world.events.tick.subscribe(gametestTest);

const bannedItems = [
    'minecraft:movingblock',
    'minecraft:moving_block'
];

let tpsArray = [];
world.events.tick.subscribe(({ deltaTime, currentTick }) => {
    try {
        tpsArray.unshift(deltaTime);
        if (tpsArray.length > 250) { tpsArray.pop(); }
        const tps = 1 / (tpsArray.reduce((a, b) => a + b, 0) / tpsArray.length);
        let players = world.getPlayers();
        for (let player of players) {
            const name = player.getName();
            let playerInventory = player.getComponent('minecraft:inventory').container;
            let itemArray = [];
            worldBorder(player);

            for (let i = 0; i < playerInventory.size; i++) {
                const item = playerInventory.getItem(i);
                if (!item) { continue; }
                if (bannedItems.includes(item.id)) {
                    if(player.hasTag('MAC-admin')) { return }
                    itemArray.unshift(item.id);
                    playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.air, 0, 0));
                }
            }
            if (itemArray.length) {
                if(player.hasTag('MAC-admin')) { return }
                player.runCommand(`tellraw @a[tag=MAC-mod] {"rawtext":[{"text":"§l§c${name}§r §7has been kicked for "Illegal Item" (${itemArray}).§r"}]}`);
                player.runCommand(`kick ${name} §l§cHey!§r §7You have been kicked for "Illegal Item" (${itemArray}).§r\n \n§fAppeal Link §l§k§8|§r §f${appealLink}§r`);
            }
            
        }
    } catch (error) {
        console.warn(error);
    }
});

world.events.beforeChat.subscribe((data) => {
    try {
        let time = (data.sender.scoreTest('MAC-muted') / 20);
        let mintime = (time / 60)

    if(data.sender.hasTag('MAC-muted')) {
        (data.cancel = true);
        if(data.sender.scoreTest('MAC-muted') <= 1200)
        {
            data.sender.tellraw(`§l§cHey!§r §7You have been muted. You have ${time} seconds remaining...§r\n \n§fAppeal Link §l§k§8|§r §f${appealLink}§r`)
        } else {
            return data.sender.tellraw(`§l§cHey!§r §7You have been muted. You have ${mintime} minutes remaining...§r\n \n§fAppeal Link §l§k§8|§r §f${appealLink}§r`)
        } 
        return
    }
    
    data.sender.runCommand(`scoreboard players add @s MAC-muted 50`);
    if(data.sender.scoreTest('MAC-muted') >= 500 && !data.sender.hasTag('MAC-admin')) {
        
        (data.cancel = true);
        return data.sender.tellraw(`§l§cHey!§r §7Sorry but you are sending messages too fast.§r`);
    }
    } catch (error) {
        return (data.cancel = false), console.warn(`${error}, ${error.stack}`);
    }
});