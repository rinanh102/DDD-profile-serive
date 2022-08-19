import { DtoUtil, UseCasePipeMethod } from '@cbidigital/aqua';
import { ProfileTokens } from '@cbidigital/profile-module/constants';
import { GetListProfilesUseCase } from '@cbidigital/profile-module/features/profile/app/usecases/profile/query';
import { ProfileDto } from '@cbidigital/profile-module/features/profile/domain/dtos';
import { IProfileDAO } from '@cbidigital/profile-module/features/profile/infra/databases';
import { Inject, Optional, Provider, Scope } from '@heronjs/common';
import {
    GetListProfilesCatholicUseCaseMapInput,
    GetListProfilesCatholicUseCaseMapOutput,
    ProfileDtoOutput,
} from './types';

@Provider({ token: ProfileTokens.Usecase.GET_LIST_PROFILES, scope: Scope.REQUEST })
export class GetListProfilesCatholicUseCase extends GetListProfilesUseCase {
    constructor(@Inject(ProfileTokens.Dao.PROFILE) _profileDAO: IProfileDAO) {
        super(_profileDAO);
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }

    override map: UseCasePipeMethod<
        GetListProfilesCatholicUseCaseMapInput,
        GetListProfilesCatholicUseCaseMapOutput
    > = async (input) => {
        return input.map((i) =>
            DtoUtil.map<Partial<ProfileDtoOutput>>(i, {
                useUnixtime: true,
                handler: (item) => {
                    const profileDto = item as Partial<ProfileDto>;
                    const attributes = profileDto.attributeValues?.reduce((a, b) => {
                        return {
                            ...a,
                            [b.attributeCode]: b.value,
                        };
                    }, {}) as any;

                    return { ...profileDto, attributes } as Partial<ProfileDtoOutput>;
                },
            }),
        );
    };
}
