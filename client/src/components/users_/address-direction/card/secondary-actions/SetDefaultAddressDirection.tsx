import { useAuthUser } from "../../../../../hooks/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDefaultAddressDirection } from "../../../../../api/users/address.api";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import BackdropLoading from "../../../../common/loaders/BackdropLoading";

const SetDefaultAddressDirection = ({ addressId }: { addressId: string }) => {
  const queryClient = useQueryClient();
  const { data: authUser } = useAuthUser();
  const { mutate: setDefaultAddressDirectionMutation, isPending } = useMutation(
    {
      mutationFn: setDefaultAddressDirection,
      onSuccess: () => {
        console.log("address created");
        toast.success("Set as default address direction successfully");
        queryClient.invalidateQueries({
          queryKey: [`user-${authUser?._id}-address-direction`],
        });
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error setting as default address direction");
      },
    }
  );
  const handleClick = () => {
    setDefaultAddressDirectionMutation({
      userId: authUser?._id ?? "",
      addressDirectionId: addressId,
    });
  };
  if (isPending) return <BackdropLoading />;
  return (
    <Button onClick={handleClick} variant="outlined" size="small">
      default
    </Button>
  );
};

export default SetDefaultAddressDirection;
