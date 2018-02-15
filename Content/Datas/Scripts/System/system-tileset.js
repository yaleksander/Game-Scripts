/*
    RPG Paper Maker Copyright (C) 2017 Marie Laporte

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
//  CLASS SystemTileset
//
// -------------------------------------------------------

/** @class
*   A tileset of the game.
*   @property {SystemPicture} picture The picture used for this tileset.
*   @property {number[]} autotiles All the IDs of used autotiles for this
*   tileset.
*   @property {number[]} walls All the IDs of used walls for this tileset.
*   @property {CollisionSquare[]} collisions List of all the collisions
*   according to the position on the texture.
*/
function SystemTileset(){
    this.collisions = null;
}

SystemTileset.prototype = {

    /** Read the JSON associated to the tileset.
    *   @param {Object} json Json object describing the object.
    */
    readJSON: function(json){
        var i, l;
        var jsonAutotiles = json.auto, jsonWalls = json.walls;
        var jsonCollisions = json.collisions;

        this.picture = $datasGame.pictures.list[PictureKind.Tilesets][json.pic];

        // Special elements
        l = jsonAutotiles.length;
        this.autotiles = new Array(l);
        for (i = 0; i < l; i++)
            this.autotiles[i] = jsonAutotiles[i].id;
        l = jsonWalls.length;
        this.walls = new Array(l);
        for (i = 0; i < l; i++)
            this.walls[i] = jsonWalls[i].id;

        // Collisions
        this.jsonCollisions = json.collisions;
    },

    // -------------------------------------------------------

    /** Get the path to the picture tileset.
    *   @returns {string}
    */
    getPath: function(){
        return this.picture.getPath(PictureKind.Tilesets);
    },

    // -------------------------------------------------------

    /** Read collisions according to image size.
    */
    readCollisions: function(image){
        var i, j, l, w, h, index, collision;
        var jsonTab, jsonKey, jsonVal;
        w = Math.floor(image.width / $SQUARE_SIZE);
        h = Math.floor(image.height / $SQUARE_SIZE);

        // Initialize
        this.collisions = new Array(w * h);
        for (i = 0; i < w * h; i++)
            this.collisions[i] = null;

        // Insert collision
        for (i = 0, l = this.jsonCollisions.length; i < l ; i++) {
            jsonTab = this.jsonCollisions[i];
            jsonKey = jsonTab.k;
            jsonVal = jsonTab.v;
            index = jsonKey[0] + (jsonKey[1] * w);
            collision = new CollisionSquare;
            collision.readJSON(jsonVal);
            this.collisions[index] = collision;
        }

        this.jsonCollisions = null;
    }
}
