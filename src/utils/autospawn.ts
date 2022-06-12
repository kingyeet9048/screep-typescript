import { numberSpawnsFromCL, roleTypes } from "./globals";
import helpers from "./helper";

export default class AutoSpawn {

    static spawnAll() {
        this.placeSpawn();
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesters');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        if (harvesters.length < 2 && !Game.spawns['Spawn1'].spawning && Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 150) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: roleTypes.harvesters, room: "", building: false, upgrading: false } });
        }

        if (upgraders.length < 2 && !Game.spawns['Spawn1'].spawning && Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 150) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: roleTypes.upgrader, room: "", building: false, upgrading: false } });
        }

        if (builders.length < 2 && !Game.spawns['Spawn1'].spawning && Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 150) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new Builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: roleTypes.builder, room: "", building: false, upgrading: false } });
        }

        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                { align: 'left', opacity: 0.8 });
        }
    };

    static placeSpawn() {
        const numberSpawns = helpers.findAllSpawns();
        if (Game.rooms.sim.controller?.level) {
            if (numberSpawns < numberSpawnsFromCL[Game.rooms.sim.controller?.level]) {
                const position = new  RoomPosition(21,21, "sim")
                const result = Game.rooms.sim.createConstructionSite(position, STRUCTURE_SPAWN, "Spawn1");
                if (result == ERR_INVALID_TARGET){
                    const correctedPos = new RoomPosition(Game.spawns['Spawn1'].pos.x + 1,  Game.spawns['Spawn1'].pos.y + 1, "sim");
                    Game.rooms.sim.createConstructionSite(correctedPos, STRUCTURE_SPAWN);
                }
            }
        }
    }
};
