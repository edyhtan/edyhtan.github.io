function is_undefined(old_val, new_val) {
    return new_val === undefined ? old_val : new_val
}

export const skill_level = {
    1:0, 5:1, 10:2, 15:3, 20:4, 25:5, 30:6, 35:7, 40:8, 45:9, 48:10, 50:11, 60:12, 70:13,
    75:14, 80:15, 85:16, 90:17, 95:18, 100:19,
    _length: 20 // hack....
}

export class Modifiers {
    // non-stackable
    atk_damage = 0; // used to known as smash damage
    crit_damage = 0;

    // additive stackable
    additional_atk = 0;
    additional_crit = 0;
    bonus_damage = 0; // used to known as elenore
    elemental_bonus_damage = 0; // now works with the highest elemental
    all_atk = 0;
    atk_up = 0; // physical/magical/independent percentage increase
    stat_up = 0; // strength/intelligent percentage increase

    // multiplicative stackable
    skill_atk = 0;

    // elemental boost
    fire = 0;
    water = 0;
    light = 0;
    shadow = 0;

    // skill bonus
    skill_up = []
    skill_cdr = []

    constructor(json_data = null) {
        this.skill_up.length = skill_level._length
        this.skill_up.fill(0)
        this.skill_cdr.length = skill_level._length
        this.skill_cdr.fill(0)
        if (json_data) {
            this.get_data(json_data)
        }
    }

    get_data(json_data) {
        this.atk_damage = is_undefined(this.atk_damage, json_data.atk_damage)
        this.crit_damage = is_undefined(this.crit_damage, json_data.crit_damage)
        this.additional_atk = is_undefined(this.additional_atk, json_data.additional_atk)
        this.additional_crit = is_undefined(this.additional_crit, json_data.additional_crit)
        this.bonus_damage = is_undefined(this.bonus_damage, json_data.bonus_damage)
        this.elemental_bonus_damage = is_undefined(this.elemental_bonus_damage, json_data.elemental_bonus_damage)
        this.all_atk = is_undefined(this.all_atk, json_data.all_atk)
        this.atk_up = is_undefined(this.atk_up,json_data.atk_up)
        this.stat_up = is_undefined(this.stat_up, json_data.stat_up)
        this.skill_atk = is_undefined(this.skill_atk, json_data.skill_atk)
        this.fire = is_undefined(this.fire, json_data.fire)
        this.water = is_undefined(this.water, json_data.water)
        this.light = is_undefined(this.light, json_data.light)
        this.shadow = is_undefined(this.shadow, json_data.shadow)

        // parsing skill level bonus and cdr data
        if (json_data.skill_up !== undefined) {
            for (const _ of json_data.skill_up) {
                const lower = skill_level[_.range[0]]
                const upper = skill_level[_.range[1]]

                for (let i = lower; i <= upper; i++) {
                    this.skill_up[i] += _.value
                }
            }
        }

        if (json_data.skill_cdr !== undefined) {
            for (const _ of json_data.skill_cdr) {
                const lower = skill_level[_.range[0]]
                const upper = skill_level[_.range[1]]

                for (let i = lower; i <= upper; i++) {
                    this.skill_cdr[i] += _.value
                }
            }
        }

    }
}

export class BaseAttribute {
    str = 0;
    int = 0;

    phy_atk = 0;
    mag_atk = 0;
    ind_atk = 0;

    phy_crit = 0;
    mag_crit = 0;

    constructor() {}

    get_data(json_data) {
        this.str = json_data.str;
        this.int = json_data.int;
        this.phy_atk = json_data.phy_atk;
        this.mag_atk = json_data.mag_atk;
        this.ind_atk = json_data.ind_atk;
        this.phy_crit = json_data.phy_crit;
        this.mag_crit = json_data.mag_crit;
    }
}
