import {Modifiers} from "./loadout/stats.js";

export function get_final_multiplier(equip_list) {
    const all_mod = equip_list.map(equip => equip.static_damage_mod)
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