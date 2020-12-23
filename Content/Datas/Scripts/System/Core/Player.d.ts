import { Enum } from "../Common";
import CharacterKind = Enum.CharacterKind;
import { System } from "..";
import { Skill } from "./Skill";
import { Item } from "./Item";
/** @class
 *  A character in the team/hidden/reserve.
 *  @param {CharacterKind} [kind=undefined] The kind of the character (hero or monster)
 *  @param {number} [id=undefined] The ID of the character
 *  @param {number} [instanceID=undefined] The instance id of the character
 *  @param {Skill[]} [skills=undefined] List of all the learned skills
 *  @param {Record<string, any>} [json=undefined] Json object describing the items
 */
declare class Player {
    id: number;
    kind: CharacterKind;
    instid: number;
    system: System.Hero;
    name: string;
    levelingUp: boolean;
    sk: Skill[];
    equip: Item[];
    expList: number[];
    testedLevelUp: boolean;
    remainingXP: number;
    totalRemainingXP: number;
    totalTimeXP: number;
    timeXP: number;
    obtainedXP: number;
    stepLevelUp: number;
    constructor(kind?: CharacterKind, id?: number, instanceID?: number, skills?: Skill[], name?: string, json?: Record<string, any>);
    /**
     *  Get the max size of equipment kind names.
     *  @static
     *  @returns {number}
    */
    static getEquipmentLength(): number;
    /**
     *  Get the max size of equipment kind names.
     *  @static
     *  @param {number[]} values The values
     *  @returns {GamePlayer}
     */
    static getTemporaryPlayer(values?: number[]): Player;
    /**
     *  Get the player informations System.
     *  @returns {System.Hero}
     */
    getSystem(): System.Hero;
    /**
     *  Get a compressed object for saving the character in a file.
     *  @returns {Record<string, any>}
     */
    getSaveCharacter(): Record<string, any>;
    /**
     *  Get the statistics for save character.
     *  @returns {number[]}
     */
    getSaveStat(): number[];
    /**
     *  Get the equips for save character.
     *  @returns {number[][]}
     */
    getSaveEquip(): number[][];
    /**
     *  Check if the character is dead.
     *  @returns {boolean}
     */
    isDead(): boolean;
    /**
     *  Instanciate a character in a particular level.
     *  @param {number} level The level of the new character
     */
    instanciate(level: number): void;
    /**
     *  Get the stats thanks to equipments.
     *  @param {System.CommonSkillItem} item The System item
     *  @param {number} equipmentID The equipment ID
     *  @returns {number[][]}
     */
    getEquipmentStatsAndBonus(item?: System.CommonSkillItem, equipmentID?: number): number[][];
    /**
     *  Update stats with equipment stats
     *  @param {number[]} list The stats list
     *  @param {number[]} bonus The bonus list
     */
    updateEquipmentStats(list?: number[], bonus?: number[]): void;
    /**
     *  Initialize stat value.
     *  @param {System.Statistic} statistic The statistic
     *  @param {number} bonus The value
     */
    initStatValue(statistic: System.Statistic, value: number): void;
    /** Update stats value.
     *  @param {System.Statistic} statistic The statistic
     *  @param {number} bonus The value
     */
    updateStatValue(statistic: System.Statistic, value: number): void;
    /**
     *  Update all the stats values.
     */
    updateAllStatsValues(): void;
    /**
     *  Get the bar abbreviation.
     *  @param {System.Statistic} stat The statistic
     *  @returns {string}
     */
    getBarAbbreviation(stat: System.Statistic): string;
    /**
     *  Read the JSON associated to the character and items.
     *  @param {Record<string, any>} json Json object describing the items
    */
    read(json: Record<string, any>): void;
    /**
     *  Get the current level.
     *  @returns {number}
     */
    getCurrentLevel(): number;
    /**
     *  Apply level up.
     */
    levelUp(): void;
    /**
     *  Get the experience reward.
     *  @returns {number}
     */
    getRewardExperience(): number;
    /**
     *  Get the currencies reward.
     *  @returns {Record<string, any>}
     */
    getRewardCurrencies(): Record<string, number>;
    /**
     *  Get the loots reward.
     *  @returns {Record<string, any>[]}
     */
    getRewardLoots(): Record<string, any>[];
    /**
     *  Update remaining xp according to full time.
     *  @param {number} fullTime Full time in milliseconds
     */
    updateRemainingXP(fullTime: number): void;
    /**
     *  Update obtained experience.
     */
    updateObtainedExperience(): void;
    /**
     *  Update experience and check if leveling up.
     *  @returns {boolean}
     */
    updateExperience(): boolean;
    /**
     *  Pass the progressive experience and directly update experience.
     */
    passExperience(): void;
    /**
     *  Pause experience (when leveling up).
     */
    pauseExperience(): void;
    /**
     *  Unpause experience.
     */
    unpauseExperience(): void;
    /**
     *  Check if experience is updated.
     *  @returns {boolean}
     */
    isExperienceUpdated(): boolean;
}
export { Player };
