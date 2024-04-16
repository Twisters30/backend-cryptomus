type TUserSelect = {
  name: boolean;
  email: boolean;
  wallet: boolean;
  id: boolean;
};

export const USER_SELECT_FIELDS: TUserSelect = {
  name: true,
  email: true,
  wallet: true,
  id: true,
};

export const APP_SELECT_FIELDS: TUserSelect & { password: boolean } = {
  ...USER_SELECT_FIELDS,
  password: true,
};
