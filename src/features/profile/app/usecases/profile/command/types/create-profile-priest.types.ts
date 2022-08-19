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
import { ProfilePriestAttributesDto } from '../../../../../domain/dtos';
import { CreateProfileCommonUseCaseAttributesInputModel } from './create-profile-common.types';



export type CreateProfilePriestUseCaseAttributesInput = ProfilePriestAttributesDto;
export class CreateProfilePriestUseCaseAttributesInputModel extends CreateProfileCommonUseCaseAttributesInputModel
    implements CreateProfilePriestUseCaseAttributesInput {
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
export type CreateProfilePriestUseCaseSubInput = {
    attributes: CreateProfilePriestUseCaseAttributesInput;
};
export class CreateProfilePriestUseCaseSubInputModel implements CreateProfilePriestUseCaseSubInput {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateProfilePriestUseCaseAttributesInputModel)
    public readonly attributes!: CreateProfilePriestUseCaseAttributesInput;
}

export type CreateProfilePriestUseCaseBeforeValidateInput = Omit<
    CreateProfileUseCaseInput,
    'attributeValues'
> & {
    attributes: CreateProfilePriestUseCaseAttributesInput;
};
export type CreateProfilePriestUseCaseBeforeValidateOutput = CreateProfileUseCaseValidateInput;
