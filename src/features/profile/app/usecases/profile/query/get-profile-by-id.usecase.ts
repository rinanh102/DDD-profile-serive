import { DtoUtil, UseCasePipeMethod } from '@cbidigital/aqua';
import { ProfileTokens } from '@cbidigital/profile-module/constants';
import { GetProfileByIdUseCase } from '@cbidigital/profile-module/features/profile/app/usecases/profile/query';
import { ProfileDto } from '@cbidigital/profile-module/features/profile/domain/dtos';
import { IProfileDAO } from '@cbidigital/profile-module/features/profile/infra/databases';
import { Inject, Optional, Provider, Scope } from '@heronjs/common';
import {
    GetProfileByIdCatholicUseCaseMapInput,
    GetProfileByIdCatholicUseCaseMapOutput,
    ProfileDtoOutput,
} from './types';

@Provider({ token: ProfileTokens.Usecase.GET_PROFILE_BY_ID, scope: Scope.REQUEST })
export class GetProfileByIdCatholicUseCase extends GetProfileByIdUseCase {
    constructor(@Inject(ProfileTokens.Dao.PROFILE) _profileDAO: IProfileDAO) {
        super(_profileDAO);
    }

    override map: UseCasePipeMethod<
        GetProfileByIdCatholicUseCaseMapInput,
        GetProfileByIdCatholicUseCaseMapOutput
    > = async (input) => {
        return DtoUtil.map<Partial<ProfileDtoOutput>>(input, {
            useUnixtime: true,
            handler: (item) => {
                const profileDto = item as Partial<ProfileDto>;
                const attributes = profileDto.attributeValues?.reduce((a, b) => {
                    return {
                        ...a,
                        [b.attributeCode]: b.value,
                    };
                }, {}) as any //Optional<ProfileCatholicAttributesDto>;

                return { ...profileDto, attributes } as Partial<ProfileDtoOutput>;
            },
        });
    };
}
