import { Modifiers, BaseAttribute } from './models/stats.js'

var mod = new Modifiers()
fetch("./data/epic_95/tb_cloth.json").then(response => response.json()).then(arr => mod.get_data(arr[0]))