tellraw @s {"rawtext":[{"text":"§l§cHey!§r §7This function should not be ran by a player.§r"}]}

execute unless entity @e[type=mac:mac] run summon mac:mac
function MAC/teleport