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

export const getUserAddressById = async (
  userId: string,
  addressDirectionId: string
): Promise<AddressDirection> => {
  const response = await api.get<AddressDirection>(
    `/users/${userId}/address-directions/${addressDirectionId}`
  );
  return response.data;
};

export const createAddress = async (
  userId: string,
  data: AddressDirectionInput
): Promise<User> => {
  const response = await api.post<User>(
    `/users/${userId}/address-directions`,
    data
  );
  return response.data;
};

export const deleteAddress = async (
  userId: string,
  addressDirectionId: string
): Promise<User> => {
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
