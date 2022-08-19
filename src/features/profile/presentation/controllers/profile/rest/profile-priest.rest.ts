import { IGetEavAttributeUseCase, IGetListEavAttributeUseCase } from '@cbidigital/aqua';
import { SortInput } from '@cbidigital/aqua/database/query-util';
import { ProfileTokens } from '@cbidigital/profile-module/constants';
import { ICreateProfileUseCase, IUpdateprofileUseCase, CreateProfileUseCaseInput, IDeleteProfileUseCase } from '@cbidigital/profile-module/features/profile/app/usecases/profile/command';
import { IGetProfileUseCase, IGetListProfilesUseCase } from '@cbidigital/profile-module/features/profile/app/usecases/profile/query';
import {
    Body,
    CacheLookup,
    CacheStore,
    Delete,
    Get,
    Guard,
    Inject,
    Param,
    Patch,
    Post,
    Principal,
    Query,
    Rest,
} from '@heronjs/common';
import { StatusCodes } from 'http-status-codes';
import { positionGroupCode, ProfileCatholicTokens } from '../../../../../../constants';
import { PositionGroup } from '../../../../domain/enums';


@Rest('/admin/profiles/priest')
export class ProfilePriestRest {
    constructor(
        @CacheLookup() readonly cacheStore: CacheStore, 
        @Inject(ProfileCatholicTokens.Usecase.CREATE_PROFILE_PRIEST)
        private readonly _createProfilePriestUseCase: ICreateProfileUseCase,
        @Inject(ProfileCatholicTokens.Usecase.UPDATE_PROFILE_PRIEST)
        private readonly _updateProfilePriestUseCase: IUpdateprofileUseCase,
        @Inject(ProfileTokens.Usecase.DELETE_PROFILE)
        private readonly _deleteProfileUseCase: IDeleteProfileUseCase,
        @Inject(ProfileTokens.Usecase.GET_PROFILE_BY_ID)
        private readonly _getProfileUseCase: IGetProfileUseCase,
        @Inject(ProfileTokens.Usecase.GET_LIST_PROFILES)
        private readonly _getListProfileUseCase: IGetListProfilesUseCase,
       
    ) {}

    @Post({ uri: '/' })
    @Guard({ private: true })
    public async create(@Body() body: CreateProfileUseCaseInput, @Principal('sub') authId: string) {
        body.userId = null;
        return this._createProfilePriestUseCase.exec(body, {
            auth: {
                authId,
            },
        });
    }

    @Patch({ uri: '/:id' })
    @Guard({ private: true })
    public async update(@Param('id') id: string, @Body() body: any, @Principal('sub') authId: string) {
        return this._updateProfilePriestUseCase.exec(
            {
                ...body,
                id,
            },
            {
                auth: {
                    authId,
                },
            },
        );
    }

    @Delete({ uri: '/:id', code: StatusCodes.NO_CONTENT })
    @Guard({ private: true })
    public async delete(@Param('id') id: string, @Principal('sub') authId: string) {
        return this._deleteProfileUseCase.exec(
            {
                id,
            },
            {
                auth: {
                    authId,
                },
            },
        );
    }

    @Get({ uri: '/:id' })
    @Guard({ private: true })
    public async getProfileById(@Param('id') id: string, @Principal('sub') authId: string) {
        return this._getProfileUseCase.exec(id, {
            auth: {
                authId,
            },
        });
    }

    @Get({ uri: '/' })
    @Guard({ private: true })
    public async findAll(
        @Query('filter') filter: object,
        @Query('eavFilter') eavFilter: any,
        @Query('offset') offset: number,
        @Query('limit') limit: number,
        @Query('sort') sort: SortInput,
        @Principal('sub') authId: string,
    ) {
        if (!eavFilter)
            eavFilter = {};

        eavFilter[positionGroupCode] = { eq: PositionGroup.Priest };
        return this._getListProfileUseCase.exec(
            {
                offset,
                limit,
                sort,
                filter,
                eavFilter
            },
            {
                auth: {
                    authId,
                },
            },
        );
    }

}
