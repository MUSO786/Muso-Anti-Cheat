import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes, ScoreboardScoreInfo } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');

function scoreTest(name, objective) {
    try {
        const score = parseInt(overworld.runCommand(`scoreboard players test ${name} ${objective} *`).statusMessage.match(/-?\d+/));
        return score;
    } catch {
        return;
    }

}

world.events.tick.subscribe(gametestTest);


const IllegalItems = [
    'minecraft:movingblock',
    'minecraft:moving_block'
]

let tpsArray = [];
world.events.tick.subscribe(({ deltaTime, currentTick }) => {
    try {
        tpsArray.unshift(deltaTime);
        if (tpsArray.length > 250) { tpsArray.pop(); }
        const tps = 1 / (tpsArray.reduce((a, b) => a + b, 0) / tpsArray.length);
        let players = world.getPlayers();
        for (let player of players) {
            const name = player.getName();
            let playerInventory = player.getComponent("minecraft:inventory").container;
            let itemArray = [];
            worldBorder(player);

            for (let i = 0; i < playerInventory.size; i++) {
                const item = playerInventory.getItem(i);
                if (!item) { continue; }
                if (IllegalItems.includes(item.id)) {
                    if (acmbool) {
                        if(player.hasTag('MAC-assets-illegalitems')) { return }
                        itemArray.unshift(item.id);
                        playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.air, 0, 0));
                    }
                }
            }
            if (itemArray.length) {
                overworld.runCommand(`tellraw @a[tag="MAC-staff-alerts"] {"rawtext":[{"text":"§l§c${name}§r §7has been kicked for having $c{itemArray} (Illegal Item).§r"}]}`);
                player.runCommand(`execute as ${name} run function MAC/punishments/invwipe`);
                player.runCommand(`kick ${name} §l§cHey!§r §7Sorry, but you can't have Illegal Items here. If you believe this is unfair or a mistake please contact a Staff Member.§r`);
            }
        }
    } catch (error) {
        console.warn(error);
    }
});
