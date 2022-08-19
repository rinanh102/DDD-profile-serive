import { CreateProfileUseCaseInput, CreateProfileUseCaseValidateInput } from '@cbidigital/profile-module/features/profile/app/usecases/profile/command/types';
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
import { ProfileCommonAttributesDto } from '../../../../../domain/dtos';
import { PositionGroup } from '../../../../../domain/enums';

export type CreateProfileCommonUseCaseAttributesInput = ProfileCommonAttributesDto;
export class CreateProfileCommonUseCaseAttributesInputModel
    implements CreateProfileCommonUseCaseAttributesInput
{
    @Expose()
    @IsNotEmpty()
    @IsString()
    public readonly holyNameCode!: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public readonly positionId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly societyNameCode?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public readonly dod!: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly nationality!: string;

    @Expose()
    @IsOptional()
    @IsString()
    public readonly positionGroupCode?: PositionGroup;
    
    @Expose()
    @IsOptional()
    @IsString()
    public readonly fullName!: string;
}
export type CreateProfileCommonUseCaseSubInput = {
    attributes: CreateProfileCommonUseCaseAttributesInput;
};
export class CreateProfileCommonUseCaseSubInputModel implements CreateProfileCommonUseCaseSubInput {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateProfileCommonUseCaseAttributesInputModel)
    public readonly attributes!: CreateProfileCommonUseCaseAttributesInput;
}


export type CreateProfileCommonUseCaseBeforeValidateInput = Omit<
CreateProfileUseCaseInput,
    'attributeValues'
> & {
    attributes: CreateProfileCommonUseCaseAttributesInput;
};
export type CreateProfileCommonUseCaseBeforeValidateOutput = CreateProfileUseCaseValidateInput;
