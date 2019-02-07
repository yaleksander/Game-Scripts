/*
    RPG Paper Maker Copyright (C) 2017-2019 Marie Laporte

    This file is part of RPG Paper Maker.

    RPG Paper Maker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    RPG Paper Maker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
*/

// -------------------------------------------------------
//
//  CLASS SystemMonster : SystemHero
//
// -------------------------------------------------------

/** @class
*   A monster of the game.
*   @extends SystemHero
*/
function SystemMonster(){
    SystemHero.call(this);
}

SystemMonster.prototype = Object.create(SystemHero.prototype);

SystemMonster.prototype.readJSON = function(json) {
    SystemHero.prototype.readJSON.call(this, json);

    this.rewards = {
        xp: new SystemProgressionTable(this.getProperty("finalLevel"))
    }
    this.rewards.xp.readJSON(json.xp);
}


SystemMonster.prototype.getRewardExperience = function(level) {
    return this.rewards.xp.getProgressionAtLevel(level);
}
