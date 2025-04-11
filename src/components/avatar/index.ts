import { AvatarContainer } from "./container";
import { AvatarPresentational } from "./presentational";
import type {
  AvatarProps,
  AvatarSize,
  AvatarContainerProps,
  AvatarPresentationalProps,
  AvatarFacade,
} from "./facade";

export const Avatar: AvatarFacade = {
  Container: AvatarContainer,
  Presentational: AvatarPresentational,
};

export type {
  AvatarProps,
  AvatarSize,
  AvatarContainerProps,
  AvatarPresentationalProps,
  AvatarFacade,
};

export default Avatar;
