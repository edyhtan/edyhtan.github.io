import Modifers from './models/stats.js'
import BaseAttribute from './models/stats.js'

var mod = new Modifers()
var json_data = fetch("./data/epic_95/tb_cloth.json")
    .then(response => response.json())[0]

console.log(json_data)