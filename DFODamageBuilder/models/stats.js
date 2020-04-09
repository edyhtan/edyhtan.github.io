export default class Modifiers {
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

    constructor() {}

    get_data(json_data) {
        this.atk_damage = json_data.atk_damage
        this.crit_damage = json_data.crit_damage
        this.additional_atk = json_data.additional_atk
        this.additional_crit = json_data.additional_crit
        this.bonus_damage = json_data.bonus_damage
        this.elemental_bonus_damage = json_data.data.elemental_bonus_damage
        this.all_atk = json_data.all_atk
        this.atk_up = json_data.atk_up
        this.stat_up = json_data.stat_up
        this.skill_atk = json_data.skill_atk
        this.fire = json_data.fire
        this.water = json_data.water
        this.light = json_data.light
        this.shadow = json_data.shadow
    }
}

export default class BaseAttribute {
    str = 0;
    int = 0;

    phy_atk = 0;
    mag_atk = 0;
    ind_atk = 0;

    phy_crit = 0;
    mag_crit = 0;

    constructor() {
    }

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
