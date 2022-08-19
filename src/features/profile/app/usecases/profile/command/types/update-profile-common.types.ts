import { UpdateProfileUseCaseInput, UpdateProfileUseCaseValidateInput } from '@cbidigital/profile-module/features/profile/app/usecases/profile/command';
import { Expose, Type } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { ProfileCommonAttributesDto } from '../../../../../domain/dtos';
import { PositionGroup } from '../../../../../domain/enums';

export type UpdateProfileCommonUseCaseAttributesInput = Partial<ProfileCommonAttributesDto>;
export class UpdateProfileCommonUseCaseAttributesInputModel
    implements UpdateProfileCommonUseCaseAttributesInput
{
    @Expose()
    @IsOptional()
    @IsString()
    public readonly holyName?: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public readonly positionId?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly societyName?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public readonly dod?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly nationality?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly positionGroupCode?: PositionGroup;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly fullName?: string;
}
export type UpdateProfileCommonUseCaseSubInput = {
    attributes: UpdateProfileCommonUseCaseAttributesInput;
};
export class UpdateProfileCommonUseCaseSubInputModel implements UpdateProfileCommonUseCaseSubInput {
    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateProfileCommonUseCaseAttributesInputModel)
    public readonly attributes!: UpdateProfileCommonUseCaseAttributesInput;
}


export type UpdateProfileCommonUseCaseBeforeValidateInput = Omit<
    UpdateProfileUseCaseInput,
    'attributeValues'
> & {
    attributes: UpdateProfileCommonUseCaseAttributesInput;
};
export type UpdateProfileCommonUseCaseBeforeValidateOutput = UpdateProfileUseCaseValidateInput;
