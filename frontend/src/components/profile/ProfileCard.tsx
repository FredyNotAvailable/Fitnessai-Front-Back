// src/components/profile/ProfileCard.tsx

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Icon,
  Divider,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../contexts/AuthContext";
import { formatGender, formatGoal, formatExperience, formatWeekDays } from "../../utils/formatters";
import { useState } from "react";
import { ProfileEdit } from "./ProfileEdit";
import type { Profile } from "../../models/Profile";

export function ProfileCard() {
  const { profile, loading, error, update } = useProfile();
  const { user } = useAuth();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <Box>Cargando...</Box>;
  if (error) return <Box color="red.500">Error: {error}</Box>;
  if (!profile) return <Box>No hay perfil disponible.</Box>;

  const age = profile.birthdate
    ? Math.floor(
        (Date.now() - new Date(profile.birthdate).getTime()) /
          (1000 * 60 * 60 * 24 * 365.25)
      )
    : null;

  async function handleSave(updatedProfile: Partial<Profile>) {
    try {
      await update(updatedProfile);
      toast({
        title: "Perfil actualizado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } catch (e: any) {
      toast({
        title: "Error al actualizar perfil",
        description: e.message || "Inténtalo de nuevo",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  if (isEditing) {
    return (
      <ProfileEdit
        profile={profile}
        user={user ?? {}}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
  <Box w="100%">
    <Flex justify="center" mb={6}>
      <Icon as={FaUser} boxSize={14} color="primary.500" />
    </Flex>

    <Heading size="lg" mb={6} textAlign="center" color="primary.900">
      Perfil de {user?.displayName ?? "Sin nombre"}
    </Heading>

    {/* Información Básica */}
    <Heading size="md" mb={4} color="primary.700">
      Información Básica
    </Heading>
    <SimpleGrid minChildWidth="150px" spacing={6} mb={6}>
      {[  
        { label: "Email", value: user?.email ?? "Sin email" },
        { label: "Género", value: formatGender(profile.gender) },
        {
          label: "Edad",
          value: (
            <Text
              as="span"
              fontWeight="semibold"
              fontSize="md"
              minW="60px"
              display="inline-block"
            >
              {age ?? "N/A"}
            </Text>
          ),
        },
      ].map(({ label, value }) => (
        <Box key={label}>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            {label}
          </Text>
          {typeof value === "string" ? (
            <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
              {value}
            </Text>
          ) : (
            value
          )}
        </Box>
      ))}
    </SimpleGrid>

    <Divider my={6} />

    {/* Datos Físicos */}
    <Heading size="md" mb={4} color="primary.700">
      Datos Físicos
    </Heading>
    <SimpleGrid minChildWidth="150px" spacing={6} mb={6}>
      {[  
        { label: "Peso (kg)", value: profile.weight },
        { label: "Altura (cm)", value: profile.height },
        { label: "Fecha de nacimiento", value: profile.birthdate },
        { label: "Días de entrenamiento", value: formatWeekDays(profile.trainingDays) },
      ].map(({ label, value }) => (
        <Box key={label}>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            {label}
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {value}
          </Text>
        </Box>
      ))}
    </SimpleGrid>

    <Divider my={6} />

    {/* Objetivos y Experiencia */}
    <Heading size="md" mb={4} color="primary.700">
      Objetivos y Experiencia
    </Heading>
    <SimpleGrid minChildWidth="150px" spacing={6} mb={6}>
      {[  
        { label: "Objetivo", value: formatGoal(profile.goal) },
        { label: "Experiencia", value: formatExperience(profile.experience) },
      ].map(({ label, value }) => (
        <Box key={label}>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            {label}
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {value}
          </Text>
        </Box>
      ))}
    </SimpleGrid>

    {/* Botón Editar abajo */}
    <Flex justify="center" mt={6}>
      <Button size="md" onClick={() => setIsEditing(true)} colorScheme="primary">
        Editar
      </Button>
    </Flex>
  </Box>
);

}
