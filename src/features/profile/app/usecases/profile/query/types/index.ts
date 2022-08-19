import { ProfileDto } from '@cbidigital/profile-module/features/profile/domain/dtos';
import { ProfileCatholicAttributesDto } from '../../../../services';

export * from './get-list-profiles.types';
export * from './get-profile-by-id.types';
export * from './get-list-profiles-of-user.types';

export type ProfileDtoOutput = ProfileDto & { attributes?: ProfileCatholicAttributesDto };
