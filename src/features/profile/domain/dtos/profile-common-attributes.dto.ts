import { PositionGroup } from "../enums";

export type ProfileCommonAttributesDto = {
    holyNameCode: string;
    positionId: string;
    societyNameCode?: string;
    dod: string;
    nationality: string;
    positionGroupCode?: PositionGroup;
    fullName: string;
};