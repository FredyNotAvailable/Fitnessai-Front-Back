// src/components/profile/InitialProfileWizard.tsx
import { Box, Button, Flex, Stack, useToast, Progress, Text, Link, Divider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import type { Profile } from "../../models/Profile";
import { validateProfileStep } from "../../utils/validateProfileStep";
import { useProfile } from "../../hooks/useProfile";
import { register } from "../../services/authService";

import { Step0 } from "./Step0";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { Step6 } from "./Step6";
import { Step7 } from "./Step7";
import type { UserData } from "../../types/UserData";

export function InitialProfileWizard() {
  const [step, setStep] = useState(0);

  // 🔹 Datos de Firebase Auth
  const [userData, setUserData] = useState<UserData>({
    fullname: "",
    email: "",
    password: "",
  });

  // 🔹 Datos del perfil
  const [profileData, setProfileData] = useState<Profile>({
    userId: "",
    gender: "",
    trainingDays: [],
    weight: 0,
    height: 0,
    birthdate: "",
    goal: "",
    experience: "",
  });

  const toast = useToast();
  const totalSteps = 8;
  const { create, loading } = useProfile();

  const updateUserData = (fields: Partial<typeof userData>) => {
    setUserData((prev) => ({ ...prev, ...fields }));
  };

  const updateProfileData = (fields: Partial<Profile>) => {
    setProfileData((prev) => ({ ...prev, ...fields }));
  };

  const onNext = async () => {
    const error = validateProfileStep(step, profileData, userData);
    if (error) {
      toast({ title: error, status: "warning" });
      return;
    }

    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    } else {
      try {
        await register(userData.email, userData.password, userData.fullname);

        toast({ title: "Usuario registrado correctamente", status: "success", duration: 3000 });

        await create({
          ...profileData,
        });

        toast({ title: "Perfil creado correctamente", status: "success", duration: 3000 });
        // navigate("/dashboard");
      } catch (err: any) {
        toast({ title: err.message || "Error al crear perfil", status: "error",  isClosable: true });
      }
    }
  };

  const onBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

return (
  <Flex
    minH="50vh"
    w="full"
    maxW={{ base: "90vw", md: "container.md" }}
    mx="auto"
    px={{ base: 4, md: 8 }}
    py={4}
    align="center"
    justify="center"
    flexDirection="column"
  >
    <Box
      bg="white"
      p={6}
      rounded="md"
      shadow="md"
      maxW="sm"
      w="full"
      /* Aquí va la restricción de altura: */
      height="500px"   // o minH y maxH iguales
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Header con paso y progreso */}
      <Box mb={6}>
        <Text color="primary.900" fontWeight="bold" mb={1} textAlign="center">
          Paso {step + 1} de {totalSteps}
        </Text>
        <Progress
          value={((step + 1) / totalSteps) * 100}
          size="sm"
          rounded="md"
          bg="gray.200"
          sx={{ "& > div": { bg: "black" } }}
        />
      </Box>

      {/* Contenido central scrollable */}
      <Box
        flex="1"
        overflowY="auto"
        mb={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {step === 0 && <Step0 data={userData} update={updateUserData} />}
        {step === 1 && <Step1 data={profileData} update={updateProfileData} />}
        {step === 2 && <Step2 data={profileData} update={updateProfileData} />}
        {step === 3 && <Step3 data={profileData} update={updateProfileData} />}
        {step === 4 && <Step4 data={profileData} update={updateProfileData} />}
        {step === 5 && <Step5 data={profileData} update={updateProfileData} />}
        {step === 6 && <Step6 data={profileData} update={updateProfileData} />}
        {step === 7 && <Step7 />}
      </Box>

      {/* Botones navegación */}
      <Stack direction="row" justify="space-between" spacing={4}>
        <Button
          flex="1"
          onClick={onBack}
          isDisabled={step === 0 || loading}
          bg="primary.900"
          color="white"
          _hover={{ bg: "primary.800" }}
        >
          Anterior
        </Button>
        <Button
          flex="1"
          onClick={onNext}
          isLoading={loading}
          bg="primary.800"
          color="white"
          _hover={{ bg: "primary.700" }}
        >
          {step === totalSteps - 1 ? "Registrate" : "Siguiente"}
        </Button>
      </Stack>

      <Divider my={4} />

      <Text textAlign="center" fontSize="sm" color="gray.600">
        ¿Ya tienes cuenta?{" "}
        <Link
          as={RouterLink}
          to="/login"
          color="blue.500"
          fontWeight="bold"
          _hover={{ textDecoration: "underline" }}
        >
          Inicia sesión
        </Link>
      </Text>
    </Box>
  </Flex>
);


}
