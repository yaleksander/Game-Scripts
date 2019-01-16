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
//  CLASS WindowBox
//
// -------------------------------------------------------

/** @class
*   A class for window boxes.
*   @extends Bitmap
*   @property {number[]} windowDimension Dimensions of the window (rectangle).
*   @property {Object} content Content (containing a draw function) to display
*   inside the window.
*   @property {number[]} padding Padding of the box.
*   @property {number[]} contentDimension Dimension of content.
*   @param {number} x The x coords.
*   @param {number} y The y coords.
*   @param {number} w The w coords.
*   @param {number} h The h coords.
*   @param {Object} [content=null] - Content (containing a draw function) to
*   display inside the window.
*   @param {number[]} [padding=[0,0,0,0]] - Padding of the box.
*/
function WindowBox(x, y, w, h, content, padding) {
    Bitmap.call(this, x, y, w, h);

    // Default values
    if (typeof content === 'undefined') content = null;
    if (typeof padding === 'undefined') padding = [0,0,0,0];

    this.padding = padding;
    this.content = content;
    this.updateDimensions();
    this.bordersOpacity = 1;
    this.backgroundOpacity = 1;
    this.selected = false;
}

WindowBox.prototype = {

    updateDimensions: function() {

        // Setting content dimensions
        this.contentDimension = [
            this.x + this.padding[0],
            this.y + this.padding[1],
            this.w - (2 * this.padding[2]),
            this.h - (2 * this.padding[3])
        ];

        // Adjusting dimensions
        this.windowDimension = [
            RPM.getScreenX(this.x),
            RPM.getScreenY(this.y),
            RPM.getScreenX(this.w),
            RPM.getScreenY(this.h)
        ];
    },

    setX: function(x){
        Bitmap.prototype.setX.call(this, x);
        this.updateDimensions();
    },

    // -------------------------------------------------------

    setY: function(y){
        Bitmap.prototype.setY.call(this, y);
        this.updateDimensions();
    },

    // -------------------------------------------------------

    setW: function(w){
        Bitmap.prototype.setW.call(this, w);
        this.updateDimensions();
    },

    // -------------------------------------------------------

    setH: function(h){
        Bitmap.prototype.setH.call(this, h);
        this.updateDimensions();
    },

    // -------------------------------------------------------

    /** Draw the window
    *   @param {Canvas.Context} context The canvas context.
    *   @param {boolean} [isChoice=false] - Indicate if this window box is used
    *   for a window choices.
    */
    draw: function(context, isChoice){

        // Default values
        if (typeof isChoice === 'undefined') isChoice = false;

        // Draw box
        $datasGame.system.getWindowSkin().drawBox(context, this.windowDimension,
            this.selected);

        // Draw content
        if (this.content !== null){
            if (isChoice){
                this.content.draw(context,
                     this.contentDimension[0],
                     this.contentDimension[1],
                     this.contentDimension[2],
                     this.contentDimension[3]
                );
            }
            else{
                this.content.drawInformations(context,
                     this.contentDimension[0],
                     this.contentDimension[1],
                     this.contentDimension[2],
                     this.contentDimension[3]
                );
            }
        }
    }
}
