import { Databases, GateKeeper, Module, Stores } from '@heronjs/common';
import { MemoryCacheConfig } from './configs';
import { PullPublicKeyIntervalService } from './features/auth/app/services';
import { HealthCheckModule } from './features/healthz';
import { PostgresDatabase } from './features/profile/infra/databases/postgres';
import {
    ProfileRest,
    ProfileAdminRest,
    ProfileRelationshipTypeRest,
    ProfileRelationshipTypeAminRest,
    ProfileInternalRest,
} from '@cbidigital/profile-module/features/profile/presentation/controllers/profile';
import { ProfilesModule } from '@cbidigital/profile-module';
import {
    CreateProfileLaityUseCase,
    CreateProfilePriestUseCase,
    UpdateProfileLaityUseCase,
    UpdateProfilePriestUseCase,
} from './features/profile/app/usecases/profile/command';
import { ProfileSeedService } from './features/profile/app/services';
import {
    CreateProfileRelationshipTypeUseCase,
    UpdateProfileRelationshipTypeUseCase,
    DeleteProfileRelationshipTypeUseCase,
} from '@cbidigital/profile-module/features/profile/app/usecases/profile-relationship-type/command';
import {
    GetProfileRelationshipTypeUseCase,
    GetListProfileRelationshipTypesUseCase,
} from '@cbidigital/profile-module/features/profile/app/usecases/profile-relationship-type/query';
import {
    DeleteProfileUseCase,
    CreateProfileAttributeUseCase,
    UpdateProfileAttributeUseCase,
    DeleteProfileAttributeUseCase,
    CreateProfileUseCase,
    UpdateProfileUseCase,
} from '@cbidigital/profile-module/features/profile/app/usecases/profile/command';
import {
    GetProfileAttributeUseCase,
    GetListProfileAttributeUseCase,
} from '@cbidigital/profile-module/features/profile/app/usecases/profile/query';
import { AuthContext } from './context';
import { AuthenticationProvider } from './features/auth/infra/providers';
import {
    GetListProfilesCatholicUseCase,
    GetListProfilesOfUserCatholicUseCase,
    GetProfileByIdCatholicUseCase,
} from './features/profile/app/usecases/profile/query';
import { ProfileLaityRest, ProfilePriestRest } from './features/profile/presentation/controllers/profile';
@Module({
    controllers: [
        ProfileRest,
        ProfileRelationshipTypeRest,
        ProfileRelationshipTypeAminRest,
        ProfileInternalRest,
        ProfileLaityRest,
        ProfilePriestRest
    ],
    imports: [HealthCheckModule, ProfilesModule],
    services: [PullPublicKeyIntervalService, ProfileSeedService],
    providers: [
        AuthenticationProvider,

        // UseCases - profile
        CreateProfileUseCase,
        UpdateProfileUseCase,
        CreateProfileLaityUseCase,
        CreateProfilePriestUseCase,
        UpdateProfileLaityUseCase,
        UpdateProfilePriestUseCase,
        DeleteProfileUseCase,
        GetProfileByIdCatholicUseCase,
        GetListProfilesCatholicUseCase,
        GetListProfilesOfUserCatholicUseCase,

        //Usecase - eav
        CreateProfileAttributeUseCase,
        UpdateProfileAttributeUseCase,
        DeleteProfileAttributeUseCase,
        GetProfileAttributeUseCase,
        GetListProfileAttributeUseCase,

        // Usecase - profile relationship type
        CreateProfileRelationshipTypeUseCase,
        UpdateProfileRelationshipTypeUseCase,
        DeleteProfileRelationshipTypeUseCase,
        GetProfileRelationshipTypeUseCase,
        GetListProfileRelationshipTypesUseCase,
    ],
})
@GateKeeper(AuthContext, AuthContext.Resolver)
@Databases([PostgresDatabase])
@Stores([MemoryCacheConfig])
export class AppModule {}
