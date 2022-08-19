import { CreateAttributesValuesInput, UseCasePipeMethod, ValidatorUtil } from '@cbidigital/aqua';
import { ProfileTokens } from '@cbidigital/profile-module/constants';
import { CreateProfileUseCase } from '@cbidigital/profile-module/features/profile/app/usecases/profile/command';
import { IProfileRepo } from '@cbidigital/profile-module/features/profile/domain/repos';
import { IProfileMapper } from '@cbidigital/profile-module/utils/objects/mappers';
import { Inject, Provider, Scope } from '@heronjs/common';
import { ProfileCatholicTokens } from '../../../../../../constants';
import { ProfilePriestAttributesDto } from '../../../../domain/dtos';
import {
    CreateProfilePriestUseCaseBeforeValidateInput,
    CreateProfilePriestUseCaseBeforeValidateOutput,
    CreateProfilePriestUseCaseSubInput,
    CreateProfilePriestUseCaseSubInputModel,
} from './types';

@Provider({ token: ProfileCatholicTokens.Usecase.CREATE_PROFILE_PRIEST, scope: Scope.REQUEST })
export class CreateProfilePriestUseCase extends CreateProfileUseCase {
    constructor(
        @Inject(ProfileTokens.Repo.PROFILE) _repo: IProfileRepo,
        @Inject(ProfileTokens.Mapper.PROFILE) _mapper: IProfileMapper,
    ) {
        super(_repo, _mapper);
        this.setMethods([
            this.beforeValidate.bind(this),
            this.validate.bind(this),
            this.processing.bind(this),
            this.map.bind(this),
        ]);
    }

    beforeValidate: UseCasePipeMethod<
        CreateProfilePriestUseCaseBeforeValidateInput,
        CreateProfilePriestUseCaseBeforeValidateOutput
    > = async (input) => {
        const model = await ValidatorUtil.validatePlain<CreateProfilePriestUseCaseSubInput>(
            CreateProfilePriestUseCaseSubInputModel,
            input,
        );

        const { attributes } = model;
        const attributeValues: CreateAttributesValuesInput = [];
        const defaultPositionGroupCode = {
            code: 'positionGroupCode',
            value: 'priest' 
        }
        const defaultFullName = {
            code: 'fullName',
            value: input.lastName + ' ' + input.firstName
        }
        attributeValues.push(defaultPositionGroupCode);
        attributeValues.push(defaultFullName);
        if (model.attributes) {
            Object.keys(model.attributes).forEach((key: string) => {
                const code = key as keyof ProfilePriestAttributesDto;
                if (attributes[code] !== undefined)
                    attributeValues.push({
                        code,
                        value: attributes[code],
                    });
            });
        }

        return {
            ...input,
            attributeValues,
        };
    };
}
