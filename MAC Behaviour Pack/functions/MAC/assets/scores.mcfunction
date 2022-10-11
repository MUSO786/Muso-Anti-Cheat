scoreboard objectives add MAC-illegalitems dummy
scoreboard players add @e[type=mac:mac] MAC-illegalitems 0
execute as @e[type=mac:mac,scores={MAC-illegalitems=1}] run tag @a remove MAC-assets-illegalitems
execute as @e[type=mac:mac,scores={MAC-illegalitems=0}] run tag @a add MAC-assets-illegalitems

scoreboard objectives add MAC-antibee dummy
scoreboard players add @e[type=mac:mac] MAC-antibee 0
execute as @e[type=mac:mac,scores={MAC-antibee=1}] run tag @a remove MAC-assets-antibee
execute as @e[type=mac:mac,scores={MAC-antibee=0}] run tag @a add MAC-assets-antibee