// src/components/profile/ProfileView.tsx

import { Box, Heading, Text, SimpleGrid, Divider } from "@chakra-ui/react";
import { formatGender, formatGoal, formatExperience, formatWeekDays } from "../../utils/formatters";
import type { Profile } from "../../models/Profile";

type Props = {
  profile: Profile;
  user: { displayName?: string | null; email?: string | null };
  age: number | null;
};

export function ProfileView({ profile, user, age }: Props) {
  return (
    <Box w="100%">
      <Heading size="lg" mb={6} textAlign="center" color="primary.900">
        Perfil de {user?.displayName ?? "Sin nombre"}
      </Heading>

      {/* Información Básica */}
      <Heading size="md" mb={4} color="primary.700">
        Información Básica
      </Heading>
      <SimpleGrid minChildWidth="150px" spacing={6} mb={6}>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Email
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {user?.email ?? "Sin email"}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Género
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {formatGender(profile.gender)}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Edad
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {age ?? "N/A"}
          </Text>
        </Box>
      </SimpleGrid>

      <Divider my={6} />

      {/* Datos Físicos */}
      <Heading size="md" mb={4} color="primary.700">
        Datos Físicos
      </Heading>
      <SimpleGrid minChildWidth="150px" spacing={6} mb={6}>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Peso (kg)
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {profile.weight}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Altura (cm)
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {profile.height}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Fecha de nacimiento
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {profile.birthdate}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Días de entrenamiento
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {formatWeekDays(profile.trainingDays)}
          </Text>
        </Box>
      </SimpleGrid>

      <Divider my={6} />

      {/* Objetivos y Experiencia */}
      <Heading size="md" mb={4} color="primary.700">
        Objetivos y Experiencia
      </Heading>
      <SimpleGrid minChildWidth="150px" spacing={6}>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Objetivo
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {formatGoal(profile.goal)}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            Experiencia
          </Text>
          <Text fontWeight="semibold" fontSize="md" noOfLines={1}>
            {formatExperience(profile.experience)}
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
