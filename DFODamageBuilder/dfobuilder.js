import { Equipment, equip_type } from "./modules/loadout/equipment.js";

async function load_equipment() {
    var gear_full_list = []
    const qualities = [/*"legendary",*/ "epic"]
    const levels = [95/*, 100*/]
    const types = ["shoulder", "top", "bottom", "belt", "shoe", "bracelet", "necklace", "ring", "sub", "magic_stone",
        "earring","weapon"]

    for (const type of types) {
        var loadout = []
        for (const quality of qualities) {
            for (const level of levels) {
                const response = await fetch(`./data/${quality}_${level}/${type}.json`)
                    .then(response => response.json())
                    .then(list => list.map(data => new Equipment(data, equip_type[type])))
                loadout = loadout.concat(response)
            }
        }
        gear_full_list.push(loadout)
    }
    return gear_full_list
}

async function main() {
    const gear_list = await load_equipment()
    console.log(gear_list)
}

main()