execute if score @s MAC-vanish matches 0 run scoreboard players set @s[tag=MAC-mod] MAC-vanish 1
execute if score @s MAC-vanish matches 1 run gamemode spectator @s[scores={MAC-vanish=1},tag=MAC-mod]

execute if score @s MAC-vanish matches 1 run scoreboard players set @s[tag=MAC-mod] MAC-vanish 0
execute if score @s MAC-vanish matches 0 run gamemode default @s[scores={MAC-vanish=0},tag=MAC-mod]