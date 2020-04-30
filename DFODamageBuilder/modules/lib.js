import {Modifiers} from "./equipment_profile/stats.js";
import {equip_type, Equipment} from "./equipment_profile/equipment.js";

/* load equipment information */
export async function load_equipment() {
    const gear_full_list = []
    const qualities = [/*"legendary",*/ "epic"]
    const levels = [95/*, 100*/]
    const types = ["shoulder", "top", "bottom", "belt", "shoe",
        "bracelet", "necklace", "ring",
        "sub", "magic_stone", "earring","weapon"]

    for (const type of types) {
        var loadout = []
        for (const quality of qualities) {
            for (const level of levels) {
                const response = await fetch(`./data/equipment_data/${quality}_${level}/${type}.json`)
                    .then(response => response.json())
                    .then(list => list.map(data => new Equipment(data, equip_type[type])))
                loadout = loadout.concat(response)
            }
        }
        gear_full_list.push(loadout)
    }
    return gear_full_list
}

export function get_final_multiplier(equip_list) {
    const all_mod = equip_list.map(equip => equip ? equip.static_damage_mod : null).filter(x=>x)
    const $ = new Modifiers()

    for (const [key, value] of Object.entries($)) {
        if (typeof value === "number") {
            $[key] = 1
        }
    }

    for (const mods of all_mod) {
        // adjust value to %
        for (const [key, value] of Object.entries(mods)) {
            if (typeof value === "number") {
                if (key === "fire" || key === "water" || key === "light" || key === "shadow") {
                    $[key] += value/220
                } else if (key === "skill_atk") {
                    $[key] *= 1+value/100
                } else if (key === "atk_damage" || key === "crit_damage") {
                    $[key] = Math.max($[key], 1+value/100)
                } else {
                    $[key] += value/100
                }
            }
        }
    }

    const element = Math.max($.fire, $.water, $.shadow, $.light)
    const atk_damage = $.additional_atk + $.atk_damage - 1
    const crit_damage = $.additional_crit + $.crit_damage - 1

    return element * atk_damage * crit_damage * $.all_atk * $.bonus_damage * $.skill_atk
        * (element * $.elemental_bonus_damage) * $.stat_up * $.atk_up
}