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
//  CLASS SceneBattle
//
//  Step 4 : End of battle
//      SubStep 0 : Victory message
//      SubStep 1 : Experience update
//      SubStep 2 : Level up
//      SubStep 3 : End transition
//
// -------------------------------------------------------

SceneBattle.prototype.initializeStep4 = function(){
    var i, l;
    this.windowTopInformations.content = new GraphicText("Victory!");

    // Heroes
    for (i = 0, l = $game.teamHeroes.length; i < l; i++) {
        this.battlers[CharacterKind.Hero][i].setVictory();
    }

    // Check rewards
    this.xp = 0;
    for (i = 0, l = this.battlers[CharacterKind.Monster].length; i < l; i++) {
        this.xp += this.battlers[CharacterKind.Monster][i].character
            .getRewardExperience();
    }

    this.time = new Date().getTime();
    this.remainingXP = 0;
    this.remainingTimeXP = SceneBattle.TIME_PROGRESSION_XP;
};

// -------------------------------------------------------

SceneBattle.prototype.updateTeamXP = function(xp) {
    /*
    for (i = 0, l = $game.teamHeroes.length; i < l; i++) {
        this.battlers[CharacterKind.Hero][i].setVictory();
    }
    */
};

// -------------------------------------------------------

SceneBattle.prototype.updateStep4 = function() {
    switch (this.subStep) {
    case 0:
        if (new Date().getTime() - this.time >= SceneBattle.TIME_END_WAIT) {
            this.time = new Date().getTime();
            this.windowTopInformations.content = new GraphicText($datasGame
                .battleSystem.getExpStatistic().name + ": " + this.xp);
            $requestPaintHUD = true;
            this.subStep = 1;
        }
        break;
    case 1:
        var timeTick = new Date().getTime() - this.time;
        if (timeTick < this.remainingTimeXP)
        {
            this.updateTeamXP(timeTick / SceneBattle.TIME_PROGRESSION_XP);
        } else {
            this.subStep = 3;
        }

        break;
    case 2:
        this.subStep = 3;
        break;
    case 3:
        $requestPaintHUD = true;

        // Transition zoom
        if (this.transitionEnd === 2) {
            if (!this.transitionZoom) {
                this.camera.distance -= 5;
                if (this.camera.distance <= 10) {
                    this.camera.distance = 10;
                    this.transitionZoom = true;
                    $gameStack.topMinusOne().updateBackgroundColor();
                }
                return;
            }
            if (this.sceneMap.camera.distance < this.cameraDistance) {
                this.sceneMap.camera.distance += 5;
                this.sceneMap.camera.update();
                if (this.sceneMap.camera.distance >= this.cameraDistance) {
                    this.sceneMap.camera.distance = this.cameraDistance;
                } else {
                    return;
                }
            }
        }

        // Transition fade
        if (this.transitionEnd === 1) {
            if (!this.transitionColor) {
                this.transitionColorAlpha += SceneBattle.TRANSITION_COLOR_VALUE;
                if (this.transitionColorAlpha >= 1) {
                    this.transitionColorAlpha = 1;
                    this.transitionColor = true;
                    this.timeTransition = new Date().getTime();
                    $gameStack.topMinusOne().updateBackgroundColor();
                }
                return;
            }
            if (new Date().getTime() - this.timeTransition < SceneBattle
                .TRANSITION_COLOR_END_WAIT)
            {
                return;
            }
            if (this.transitionColorAlpha > 0) {
                this.transitionColorAlpha -= SceneBattle.TRANSITION_COLOR_VALUE;
                if (this.transitionColorAlpha <= 0) {
                    this.transitionColorAlpha = 0;
                }
                return;
            }
        }

        this.win();
        break;
    }
};

// -------------------------------------------------------

SceneBattle.prototype.onKeyPressedStep4 = function(key){

};

// -------------------------------------------------------

SceneBattle.prototype.onKeyReleasedStep4 = function(key){

};

// -------------------------------------------------------

SceneBattle.prototype.onKeyPressedRepeatStep4 = function(key){

};

// -------------------------------------------------------

SceneBattle.prototype.onKeyPressedAndRepeatStep4 = function(key){

};

// -------------------------------------------------------

SceneBattle.prototype.drawHUDStep4 = function() {
    if (this.subStep !== 3) {
        this.windowTopInformations.draw();
    }

    switch (this.subStep) {
    case 0:
        break;
    case 1:
        this.windowExperienceProgression.draw();
        break;
    case 2:
        break;
    case 3:
        // Transition fade
        if (this.transitionEnd === 1) {
            $context.fillStyle = "rgba(" + this.transitionEndColor.red + "," +
                this.transitionEndColor.green + "," + this.transitionEndColor.blue +
                "," + this.transitionColorAlpha + ")";
            $context.fillRect(0, 0, $canvasWidth, $canvasHeight);
        }
        break;
    }
};
