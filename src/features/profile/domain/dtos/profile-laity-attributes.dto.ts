import { ProfileCommonAttributesDto } from ".";

export type ProfileLaityAttributesDto = ProfileCommonAttributesDto & {
    placeOfBirth? : string
    fatherHolyNameCode? : string;
    fatherName? : string;
    motherHolyNameCode? : string;
    motherName? : string;
    dateOfBaptism? : string;
    placeOfBaptism? : string;
    baptizedBy? : string;
    baptizedByHolyNameCode?: string;
    baptismalGodParent? : string;
    baptismalGodParentHolyNameCode?: string;
    dateOfFirstCommunion? : string;
    placeOfFirstCommunion? : string;
    dateOfComfirmation? : string;
    confirmationBookOrderNo? : string;
    placeOfConfirmation? : string;
    confirmationAdministeredBy? : string;
    confirmationAdministeredByHolyNameCode?: string;
    confirmationGodParent? : string;
    confirmationGodParentHolyNameCode? : string;
    dateOfMarriage? : string;
    marriageCertificateOrderNo? : string;
    placeOfMarriage? : string;
    marriedWith? : string;
    marriedWithHolyNameCode? : string;
    weddingCelebratedBy? : string;
    weddingCelebratedByHolyNameCode? : string;
    witness1? : string;
    witness1HolyNameCode? : string;
    witness2? : string;
    witness2HolyNameCode? : string;
    note? : string;
    dataEntriedBy? : string;
    dateOfDataEntry? : string;
    lastUpdatedBy? : string;
    lastUpdatedAt? : string;
}