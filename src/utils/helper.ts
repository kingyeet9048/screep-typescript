// /*
//  * Module code goes here. Use 'module.exports' to export things:
//  * module.exports.thing = 'a thing';
//  *
//  * You can import it from another modules like this:
//  * var mod = require('misc.helper');
//  * mod.thing == 'a thing'; // true
const BODYPART_COST2: { [name: string]: number} = { "move" : 50, "work": 100, "attack": 80, "carry": 50, "heal": 250, "ranged_attack": 150, "tough": 10, "claim": 600 };

export default {
    partCost (parts: {}) {
        var total = 0;
        for(var body_part in parts) {
            total += BODYPART_COST2[body_part];
        }
        return total;
    },
    findAllSpawns () {
        var total = 0;
        for (const spawn in Game.spawns) {
            total++;
        }
        return total;
    }
};
