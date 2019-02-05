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
//  CLASS Land
//
// -------------------------------------------------------

/** @class
*   A land in the map.
*   @property {number[]} texture Texture rect of the land.
*/
function Land() {
    MapElement.call(this);

    this.up = true;
}

Land.prototype = {

    /** Read the JSON associated to the land.
    *   @param {Object} json Json object describing the object.
    */
    read: function(json) {
        MapElement.prototype.read.call(this, json);

        var up = json.up;
        this.texture = json.t;

        if (this.texture.length === 2) {
            this.texture.push(1); this.texture.push(1);
        }

        if (typeof(up) !== 'undefined')
            this.up = up;
    },

    /** Return the rect index.
    *   @returns {number}
    */
    getIndex: function(width) {
        return this.texture[0] + (this.texture[1] * width);
    },

    /** Update the geometry associated to this land.
    *   @returns {THREE.Geometry}
    */
    updateGeometry: function(geometry, collision, position, width, height, x, y,
                             w, h, i)
    {
        var localPosition = RPM.positionToBorderVector3(position);
        var a = localPosition.x;
        var yLayerOffset = RPM.positionLayer(position) * 0.05;
        if (!this.up)
            yLayerOffset *= -1;
        var b = localPosition.y + yLayerOffset;
        var c = localPosition.z;
        var objCollision = null;

        // Vertices
        geometry.vertices.push(new THREE.Vector3(a, b, c));
        geometry.vertices.push(new THREE.Vector3(a + $SQUARE_SIZE, b, c));
        geometry.vertices.push(new THREE.Vector3(a + $SQUARE_SIZE, b,
                                                 c + $SQUARE_SIZE));
        geometry.vertices.push(new THREE.Vector3(a, b, c + $SQUARE_SIZE));
        var j = i * 4;
        geometry.faces.push(new THREE.Face3(j, j + 1, j + 2));
        geometry.faces.push(new THREE.Face3(j, j + 2, j + 3));

        // Texture
        var coefX = 0.1 / width;
        var coefY = 0.1 / height;
        x += coefX;
        y += coefY;
        w -= (coefX * 2);
        h -= (coefY * 2);
        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(x, y),
            new THREE.Vector2(x + w, y),
            new THREE.Vector2(x + w, y + h)
        ]);
        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(x, y),
            new THREE.Vector2(x + w, y + h),
            new THREE.Vector2(x, y + h)
        ]);

        // Collision
        if (collision !== null) {
            var rect = collision.rect;

            if (!collision.hasAllDirections()) {
                if (rect === null) {
                    rect = [
                        a  + $SQUARE_SIZE / 2,
                        b + 0.5,
                        c + $SQUARE_SIZE / 2,
                        $SQUARE_SIZE,
                        $SQUARE_SIZE,
                        0
                    ]
                }

                objCollision = {
                    p: position,
                    l: localPosition,
                    b: rect,
                    c: collision
                }
            }
            else if (rect !== null) {
                objCollision = {
                    p: position,
                    l: localPosition,
                    b: [
                        a + rect[0] + $SQUARE_SIZE / 2,
                        b + 0.5,
                        c + rect[1] + $SQUARE_SIZE / 2,
                        rect[2],
                        rect[3],
                        0
                    ],
                    c: null
                }
            }
        }

        return objCollision;
    }
}
