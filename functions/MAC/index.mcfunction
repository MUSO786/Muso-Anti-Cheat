tellraw @s {"rawtext":[{"text":"§l§cHey!§r §7This function should not be ran by a player.§r"}]}

scoreboard objectives add MAC-vanish dummy
scoreboard players add @a MAC-vanish 0

scoreboard objectives add MAC-gametest dummy
scoreboard players add @a MAC-gametest 0

scoreboard objectives add MAC-muted dummy
scoreboard players add @a MAC-muted 0
tag @a[scores={MAC-muted=1..}] add MAC-muted
tag @a[scores={MAC-muted=..0}] remove MAC-muted

execute unless entity @e[type=mac:mac] run summon mac:mac

function MAC/teleport

tag @a[tag=MAC-manager] add MAC-admin
tag @a[tag=MAC-manager] add MAC-mod

tag @a[tag=MAC-admin] remove MAC-banned
tag @a[tag=MAC-admin] add MAC-mod

tag @a[tag=MAC-banned] remove MAC-mod