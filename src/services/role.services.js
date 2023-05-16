import { RoleModel } from '../models/index.js';

export const getAllRoles = async () => {
    const roles = await RoleModel.find();
    return roles;
};
