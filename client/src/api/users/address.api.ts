import { api } from "../../config/axios.config";
import {
  AddressDirection,
  addressDirectionId,
  AddressDirectionInput,
  User,
  UserId,
} from "../../types/user";

export const getUserAddresses = async (
  username: string
): Promise<AddressDirection[]> => {
  const response = await api.get<AddressDirection[]>(
    `/users/${username}/address-directions`
  );
  return response.data;
};

export const getUserDefaultAdressDirection = async (userId: string) => {
  const response = await api.get<AddressDirection>(
    `/users/${userId}/default-address-direction`
  );
  return response.data;
};

export const getUserAddressById = async (
  userId: string,
  addressDirectionId: string
): Promise<AddressDirection> => {
  const response = await api.get<AddressDirection>(
    `/users/${userId}/address-directions/${addressDirectionId}`
  );
  return response.data;
};

export const createAddress = async ({
  data,
  userId,
}: UserId & {
  data: AddressDirectionInput;
}) => {
  const response = await api.post<User>(
    `/users/${userId}/address-directions`,
    data
  );
  return response.data;
};

export const deleteAddress = async ({
  addressDirectionId,
  userId,
}: addressDirectionId & UserId): Promise<User> => {
  const response = await api.delete<User>(
    `/users/${userId}/address-directions/${addressDirectionId}`
  );
  return response.data;
};

export const updateAddress = async ({
  addressDirectionId,
  userId,
  data,
}: addressDirectionId & UserId & { data: AddressDirectionInput }) => {
  const response = await api.put<User>(
    `/users/${userId}/address-directions/${addressDirectionId}`,
    data
  );
  return response.data;
};

export const setDefaultAddressDirection = async ({
  userId,
  addressDirectionId,
}: {
  userId: string;
  addressDirectionId: string;
}) => {
  const response = await api.put<User>(
    `/users/${userId}/address-directions/${addressDirectionId}/default`,
    {}
  );
  return response.data;
};
