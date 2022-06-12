export default class Tower {
    static run () {
        var tower = <StructureTower>(Game.getObjectById(<Id<_HasId>>'TOWER_ID'));
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure: { hits: number; hitsMax: number; }) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
}
