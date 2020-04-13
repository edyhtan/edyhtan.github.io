import { Equipment, equip_type } from "./modules/loadout/equipment.js";

async function load_equipment() {
    var gear_full_list = []
    const quality = ["legendary", "epic"]
    const level = [95, 100]
    const type = ["shoulder", "top", "bottom", "belt", "shoe", "bracelet", "necklace", "ring", "sub", "magic_stone",
        "earring", "weapon"]

    var shoulder = []
    const shoulder_95 = await fetch("./data/epic_95/shoulder.json")
        .then(response => response.json())
        .then(list => list.map(data => new Equipment(data, equip_type.shoulder)))
    shoulder = shoulder.concat(shoulder_95);
    gear_full_list.push(shoulder)

    return gear_full_list
}

async function main() {
    const gear_list = await load_equipment()
    console.log(gear_list)
}

main()