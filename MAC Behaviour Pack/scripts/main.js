import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes, ScoreboardScoreInfo } from 'mojang-minecraft';

const bypassIllegalItems = [
    'minecraft:deny',
    'minecraft:allow',
    'minecraft:border_block',
    'minecraft:command_block',
    'minecraft:chain_command_block',
    'minecraft:repeating_command_block',
    'minecraft:structure_block',
    'minecraft:structure_void',
    'minecraft:barrier',
    'minecraft:jigsaw',
    'minecraft:light_block',
    'minecraft:command_block_minecart'
];

const IllegalItems = [
    'minecraft:movingblock',
    'minecraft:moving_block'
]

const BeeItems = [
    'minecraft:bee_nest',
    'minecraft:beehive',
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
                if (bypassIllegalItems.includes(item.id)) {
                    if (acmbool) {
                        if(player.hasTag('MAC-staff-bypass')) { return }
                        if(player.hasTag('MAC-assets-illegalitems')) { return }
                        itemArray.unshift(item.id);
                        playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.air, 0, 0));
                    }
                }
            }
            if (itemArray.length) {
                if(player.hasTag('MAC-staff-bypass')) { return }
                overworld.runCommand(`tellraw @a[tag="MAC-staff-alerts"] {"rawtext":[{"text":"§l§c${name}§r §7has been flagged for having $c{itemArray} (Illegal Item).§r"}]}`);
                player.runCommand(`execute as ${name} run function MAC/punishments/illegalitems/bypass`);
            }
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
            for (let i = 0; i < playerInventory.size; i++) {
                const item = playerInventory.getItem(i);
                if (!item) { continue; }
                if (BeeItems.includes(item.id)) {
                    if (acmbool) {
                        if(player.hasTag('MAC-staff-bypass')) { return }
                        if(player.hasTag('MAC-assets-antibee')) { return }
                        itemArray.unshift(item.id);
                        playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.air, 0, 0));
                    }
                }
            }
            if (itemArray.length) {
                if(player.hasTag('MAC-staff-bypass')) { return }
                overworld.runCommand(`tellraw @a[tag="MAC-staff-alerts"] {"rawtext":[{"text":"§l§c${name}§r §7has been flagged for having $c{itemArray} (Anti-Bee).§r"}]}`);
                player.runCommand(`execute as ${name} run function MAC/punishments/illegalitems/bypass`);
            }
        }
    } catch (error) {
        console.warn(error);
    }
});
