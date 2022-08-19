import { CreateAttributesValuesInput, IUseCase, UseCasePipeMethod, ValidatorUtil } from '@cbidigital/aqua';
import { ProfileTokens } from '@cbidigital/profile-module/constants';
import { CreateProfileUseCase, CreateProfileUseCaseContext } from '@cbidigital/profile-module/features/profile/app/usecases/profile/command';
import { IProfileRepo } from '@cbidigital/profile-module/features/profile/domain/repos';
import { IProfileMapper } from '@cbidigital/profile-module/utils/objects/mappers';
import { Inject, Provider, Scope } from '@heronjs/common';
import { ProfileCatholicTokens } from '../../../../../../constants';
import { ProfileLaityAttributesDto } from '../../../../domain/dtos';
import {
    CreateProfileLaityUseCaseBeforeValidateInput,
    CreateProfileLaityUseCaseBeforeValidateOutput,
    CreateProfileLaityUseCaseSubInput,
    CreateProfileLaityUseCaseSubInputModel,
} from './types';

@Provider({ token: ProfileCatholicTokens.Usecase.CREATE_PROFILE_LAITY, scope: Scope.REQUEST })
export class CreateProfileLaityUseCase extends CreateProfileUseCase {
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
        CreateProfileLaityUseCaseBeforeValidateInput,
        CreateProfileLaityUseCaseBeforeValidateOutput
    > = async (input) => {
        const model = await ValidatorUtil.validatePlain<CreateProfileLaityUseCaseSubInput>(
            CreateProfileLaityUseCaseSubInputModel,
            input,
        );

        const { attributes } = model;
        const attributeValues: CreateAttributesValuesInput = [];
        const defaultPositionGroupCode = {
            code: 'positionGroupCode',
            value: 'laity' 
        }
        attributeValues.push(defaultPositionGroupCode);
        const defaultFullName = {
            code: 'fullName',
            value: input.lastName + ' ' + input.firstName
        }
        attributeValues.push(defaultFullName);

        if (model.attributes) {
            Object.keys(model.attributes).forEach((key: string) => {
                const code = key as keyof ProfileLaityAttributesDto;
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
