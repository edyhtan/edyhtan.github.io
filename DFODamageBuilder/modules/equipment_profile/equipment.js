import {Modifiers, BaseAttribute} from "./stats.js";

export const equip_type = {
    undef: -1,
    shoulder: 0, top: 1, bottom: 2, belt: 3, shoe: 4,
    bracelet: 5, necklace: 6, ring: 7,
    sub: 8, magic_stone: 9, earring: 10,
    weapon: 11
}

export class Equipment {
    name = "";
    type = equip_type.undef;
    base = null
    static_damage_mod = null
    triggering_mod = []
    set_id = 0

    constructor(json_data = null, equipment_type = equip_type.undef) {
        if (json_data) {
            this.load_gear(json_data, equipment_type)
        }
    }

    load_gear(json_data, equipment_type) {
        this.static_damage_mod = new Modifiers(json_data)
        this.type = equipment_type
        this.name = json_data.name
        this.set_id = json_data.set_id
    }
}

export class SetBonus {
    name = ""
    set_id = 0
    set_item = 0
    static_mod = null
    trigger_mod = []

    constructor(json_data = null) {
        if (json_data != null) {
            this.load_set(json_data)
        }
    }

    load_set(json_data) {
        this.static_mod = new Modifiers(json_data)
        this.set_id = json_data.set_id
        this.set_item = json_data.set_item
    }
}