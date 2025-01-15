import { api } from "../../config/axios.config";
import { AddressDirectionInput, User } from "../../types/user";

export const createAddress = async (
  userId: string,
  data: AddressDirectionInput
): Promise<User> => {
  const response = await api.post<User>(
    `/users/${userId}/address-direction`,
    data
  );
  return response.data;
};

export const updateAddress = async (
  userId: string,
  addressDirectionId: string,
  data: AddressDirectionInput
): Promise<User> => {
  const response = await api.put<User>(
    `/users/${userId}/address-direction/${addressDirectionId}`,
    data
  );
  return response.data;
};

export const deleteAddress = async (
  userId: string,
  addressDirectionId: string
): Promise<User> => {
  const response = await api.delete<User>(
    `/users/${userId}/address-direction/${addressDirectionId}`
  );
  return response.data;
};
