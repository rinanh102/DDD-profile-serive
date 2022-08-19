import { UpdateProfileUseCaseInput, UpdateProfileUseCaseValidateInput } from '@cbidigital/profile-module/features/profile/app/usecases/profile/command/types';
import { Expose, Type } from 'class-transformer';
import {
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { ProfileLaityAttributesDto } from '../../../../../domain/dtos';
import { UpdateProfileCommonUseCaseAttributesInputModel } from './update-profile-common.types';

export type UpdateProfileLaityUseCaseAttributesInput = Partial<ProfileLaityAttributesDto>;
export class UpdateProfileLaityUseCaseAttributesInputModel extends UpdateProfileCommonUseCaseAttributesInputModel
    implements UpdateProfileLaityUseCaseAttributesInput
{
    @Expose()
    @IsOptional()
    @IsString()
    public readonly placeOfBirth?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly fatherHolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly fatherName?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly motherHolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly motherName?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    @MaxLength(10)
    public readonly dateOfBaptism?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly placeOfBaptism?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly baptizedBy?: string;
    
    @Expose()
    @IsOptional()
    @IsString()
    public readonly baptizedByHolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly baptismalGodParent?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly baptismalGodParentHolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    @MaxLength(10)
    public readonly dateOfFirstCommunion?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly placeOfFirstCommunion?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    @MaxLength(10)
    public readonly dateOfComfirmation?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly confirmationBookOrderNo?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly placeOfConfirmation?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly confirmationAdministeredBy?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly confirmationAdministeredByHolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly confirmationGodParent?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly confirmationGodParentHolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    @MaxLength(10)
    public readonly dateOfMarriage?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly marriageCertificateOrderNo?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly placeOfMarriage?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly marriedWith?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly marriedWithHolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly weddingCelebratedBy?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly weddingCelebratedByHolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly witness1?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly witness1HolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly witness2?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly witness2HolyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly note?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly dataEntriedBy?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    @MaxLength(10)
    public readonly dateOfDataEntry?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly lastUpdatedBy?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly lastUpdatedAt?: string;

}
export type UpdateProfileLaityUseCaseSubInput = {
    attributes: UpdateProfileLaityUseCaseAttributesInput;
};
export class UpdateProfileLaityUseCaseSubInputModel implements UpdateProfileLaityUseCaseSubInput {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UpdateProfileLaityUseCaseAttributesInputModel)
    public readonly attributes!: UpdateProfileLaityUseCaseAttributesInput;
}


export type UpdateProfileLaityUseCaseBeforeValidateInput = Omit<
    UpdateProfileUseCaseInput,
    'attributeValues'
> & {
    attributes: UpdateProfileLaityUseCaseAttributesInput;
};
export type UpdateProfileLaityUseCaseBeforeValidateOutput = UpdateProfileUseCaseValidateInput;
