import { Modifiers, BaseAttribute } from './models/stats.js'

var mod = new Modifiers()
var json_data = fetch("./data/epic_95/tb_cloth.json")
    .then(response => response.json())[0]

console.log(json_data)