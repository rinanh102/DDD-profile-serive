import { AuthInput } from '@cbidigital/aqua';
import { UpdateProfileUseCaseInput, UpdateProfileUseCaseValidateInput } from '@cbidigital/profile-module/features/profile/app/usecases/profile/command';
import { ProfileDto } from '@cbidigital/profile-module/features/profile/domain/dtos';
import { Expose, Type } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { ProfilePriestAttributesDto } from '../../../../../domain/dtos';
import { UpdateProfileCommonUseCaseAttributesInputModel } from './update-profile-common.types';

export type UpdateProfilePriestUseCaseAttributesInput = Partial<ProfilePriestAttributesDto>;
export class UpdateProfilePriestUseCaseAttributesInputModel extends UpdateProfileCommonUseCaseAttributesInputModel
    implements UpdateProfilePriestUseCaseAttributesInput
{
    @Expose()
    @IsOptional()
    @IsBoolean()
    public readonly isStudyingAbroad?: boolean;

    @Expose()
    @IsOptional()
    @IsDateString()
    @MaxLength(10)
    public readonly ordainedDate?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    @MaxLength(10)
    public readonly oldPositionEndDate?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    @MaxLength(10)
    public readonly newPositionStartDate?: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public readonly ordainedDepartmentId?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly celebratingPriest?: string;
    @Expose()
    @IsOptional()
    @IsString()
    public readonly celebratingPriestHolyNameCode?: string;
    
}
export type UpdateProfilePriestUseCaseSubInput = {
    attributes: UpdateProfilePriestUseCaseAttributesInput;
};
export class UpdateProfilePriestUseCaseSubInputModel implements UpdateProfilePriestUseCaseSubInput {
    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateProfilePriestUseCaseAttributesInputModel)
    public readonly attributes!: UpdateProfilePriestUseCaseAttributesInput;
}

export type UpdateProfilePriestUseCaseBeforeValidateInput = Omit<
    UpdateProfileUseCaseInput,
    'attributeValues'
> & {
    attributes: UpdateProfilePriestUseCaseAttributesInput;
};
export type UpdateProfilePriestUseCaseBeforeValidateOutput = UpdateProfileUseCaseValidateInput;
