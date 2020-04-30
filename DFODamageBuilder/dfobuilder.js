import { get_final_multiplier, load_equipment } from "./modules/lib.js";


const gear_loadout = new Array(gear_list.length).fill(null)


async function main() {
    const gear_list = await load_equipment()



    console.log(get_final_multiplier(gear_loadout))
}

main()