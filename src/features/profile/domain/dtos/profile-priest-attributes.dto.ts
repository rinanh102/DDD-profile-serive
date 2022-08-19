import { ProfileCommonAttributesDto } from ".";

export type ProfilePriestAttributesDto = ProfileCommonAttributesDto & {
    isStudyingAbroad?: boolean;
    ordainedDate?: string;
    ordainedDepartmentId?: string;
    celebratingPriest?: string;
    celebratingPriestHolyNameCode? : string;
    oldPositionEndDate?: string;
    newPositionStartDate?: string;
}