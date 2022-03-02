import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { RedirectableProviderType } from "next-auth/providers";

import { Box, Fade, TextField, Typography } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { UserInput } from "@shared/types";
import { registerUser } from "@rest/user";
import { AxiosError } from "axios";

interface SidebarRegisterFormProps {
  loading: boolean;
  setLoading: (value: React.SetStateAction<boolean>) => void;
}

export const SidebarRegisterForm: React.FC<SidebarRegisterFormProps> = ({
  loading,
  setLoading,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setLoading(true);
    const user = data;

    try {
      const response = await registerUser(user);
      console.log(response);
      await signIn<RedirectableProviderType>("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data.message);
      setErrorMessage(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const { ref: emailRef, ...emailProps } = register("email", {
    required: "Поле обязательно",
    pattern: {
      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: "Введите действительный адрес",
    },
    minLength: {
      value: 5,
      message: "Минимум 5 символов",
    },
  });
  const { ref: nameRef, ...nameProps } = register("name", {
    required: "Поле обязательно",
    pattern: {
      value: /[a-zA-Z0-9]$/,
      message: "Имя пользователя должно состоять только из A-Z и 0-9",
    },
    minLength: {
      value: 5,
      message: "Минимум 5 символов",
    },
  });
  const { ref: passwordRef, ...passwordProps } = register("password", {
    required: "Поле обязательно",
    minLength: {
      value: 6,
      message: "Минимум 6 символов",
    },
    maxLength: {
      value: 20,
      message: "Максимум 20 символов",
    },
  });

  return (
    <Fade in>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          pt: 2,
          px: 3,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography align="center">Регистрация</Typography>

        <TextField
          error={!!errors.email}
          helperText={errors?.email?.message}
          inputRef={emailRef}
          {...emailProps}
          placeholder="Адрес эл. почты"
          size="small"
          variant="outlined"
          sx={{ fontSize: "0.875rem" }}
          InputProps={{ sx: { fontSize: "0.875rem" } }}
        />
        <TextField
          error={!!errors.name}
          helperText={errors?.name?.message}
          inputRef={nameRef}
          {...nameProps}
          placeholder="Логин"
          size="small"
          variant="outlined"
          sx={{ fontSize: "0.875rem" }}
          InputProps={{ sx: { fontSize: "0.875rem" } }}
        />
        <TextField
          error={!!errors.password}
          helperText={errors?.password?.message}
          inputRef={passwordRef}
          {...passwordProps}
          placeholder="Пароль"
          size="small"
          variant="outlined"
          sx={{ fontSize: "0.875rem" }}
          InputProps={{ sx: { fontSize: "0.875rem" } }}
        />
        {errorMessage && (
          <Typography align="center" variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}

        <LoadingButton
          loading={loading}
          variant="contained"
          size="small"
          type="submit"
        >
          Создать аккаунт
        </LoadingButton>
      </Box>
    </Fade>
  );
};
