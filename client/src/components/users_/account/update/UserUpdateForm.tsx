import { useFormik } from "formik";
import Grid from "@mui/material/Grid2";
import { useAuthUser } from "../../../../hooks/auth";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { userInputSchema } from "../../../../validation-schemas/user-schemas/user.validation";
import SubmitButton from "../../../common/buttons/submit-button/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../../api/users/user.api";
import TextField from "../../../common/textfields/TextField";
import { toast } from "react-toastify";
import CircleLoadingGrid from "../../../common/loaders/CircleLoadingGrid";
import ContainerCircleLoader from "../../../common/loaders/ContainerCircleLoader";

const UserUpdateForm = () => {
  const { data: authUser } = useAuthUser();

  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const initialValues = {
    username: authUser?.username ?? "",
    email: authUser?.email ?? "",
    firstName: authUser?.firstName ?? "",
    lastName: authUser?.lastName ?? "",
    mobilePhone: authUser?.mobilePhone ?? "",
    bio: authUser?.bio ?? "",
    birthday: authUser?.birthday ?? "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(userInputSchema),
    onSubmit: ({ birthday, ...values }) => {
      const formattedBirthday = new Date(birthday);
      updateUserMutation({
        userId: authUser?._id ?? "",
        data: { birthday: formattedBirthday, ...values },
      });
    },
  });

  console.log(formik.values);

  if (isPending) return <ContainerCircleLoader />;
  return (
    <Grid spacing={3} container component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          name="username"
          label="Username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={
            formik.touched.username && Boolean(formik.errors.username)
              ? formik.errors.username
              : undefined
          }
          focused={
            formik.touched.username && Boolean(!formik.errors.username)
              ? true
              : undefined
          }
          color={
            formik.touched.username && Boolean(!formik.errors.username)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          id="email"
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email && Boolean(formik.errors.email)
              ? formik.errors.email
              : undefined
          }
          focused={
            formik.touched.email && Boolean(!formik.errors.email)
              ? true
              : undefined
          }
          color={
            formik.touched.email && Boolean(!formik.errors.email)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="firstName"
          label="First Name"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={
            formik.touched.firstName && Boolean(formik.errors.firstName)
              ? formik.errors.firstName
              : undefined
          }
          focused={
            formik.touched.firstName && Boolean(!formik.errors.firstName)
              ? true
              : undefined
          }
          color={
            formik.touched.firstName && Boolean(!formik.errors.firstName)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={
            formik.touched.lastName && Boolean(formik.errors.lastName)
              ? formik.errors.lastName
              : undefined
          }
          focused={
            formik.touched.lastName && Boolean(!formik.errors.lastName)
              ? true
              : undefined
          }
          color={
            formik.touched.lastName && Boolean(!formik.errors.lastName)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="mobilePhone"
          label="Phone Number"
          placeholder="Phone Number"
          value={formik.values.mobilePhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.mobilePhone && Boolean(formik.errors.mobilePhone)
          }
          helperText={
            formik.touched.mobilePhone && Boolean(formik.errors.mobilePhone)
              ? formik.errors.mobilePhone
              : undefined
          }
          focused={
            formik.touched.mobilePhone && Boolean(!formik.errors.mobilePhone)
              ? true
              : undefined
          }
          color={
            formik.touched.mobilePhone && Boolean(!formik.errors.mobilePhone)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          type="date"
          name="birthday"
          label="Birthday"
          placeholder="Birthday"
          value={formik.values.birthday}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.birthday && Boolean(formik.errors.birthday)}
          helperText={
            formik.touched.birthday && Boolean(formik.errors.birthday)
              ? formik.errors.birthday
              : undefined
          }
          focused={
            formik.touched.birthday && Boolean(!formik.errors.birthday)
              ? true
              : undefined
          }
          color={
            formik.touched.birthday && Boolean(!formik.errors.birthday)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="bio"
          label="Bio"
          placeholder="Bio"
          multiline
          rows={4}
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={
            formik.touched.bio && Boolean(formik.errors.bio)
              ? formik.errors.bio
              : undefined
          }
          focused={
            formik.touched.bio && Boolean(!formik.errors.bio) ? true : undefined
          }
          color={
            formik.touched.bio && Boolean(!formik.errors.bio)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton isValid={formik.isValid} fullWidth />
      </Grid>
    </Grid>
  );
};

export default UserUpdateForm;
