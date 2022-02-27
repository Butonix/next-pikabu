import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { LiteralUnion, signIn } from "next-auth/react";
import {
  BuiltInProviderType,
  RedirectableProviderType,
} from "next-auth/providers";

import { Box, Fade, TextField, Typography } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { UserInput } from "@shared/types";

interface SidebarLoginFormProps {
  loading: boolean;
  setLoading: (value: React.SetStateAction<boolean>) => void;
}

export const SidebarLoginForm: React.FC<SidebarLoginFormProps> = ({
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
    const response = await signIn<RedirectableProviderType>("credentials", {
      ...data,
      redirect: false,
    });
    setLoading(false);

    if (response?.error) {
      switch (response.error) {
        case "No user found!":
          setErrorMessage("Пользователь не найден");
          break;
        case "Could not log you in!":
          setErrorMessage("Неверный пароль");
          break;
        default:
          setErrorMessage(response.error);
      }
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
        <Typography align="center">Авторизация</Typography>

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
          Войти
        </LoadingButton>
      </Box>
    </Fade>
  );
};
