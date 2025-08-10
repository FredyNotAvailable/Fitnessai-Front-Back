import { Box, Heading, Text, VStack, Divider, useTheme } from "@chakra-ui/react";

// Tipos simplificados locales
type Gender = "male" | "female" | "other";
type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
type Goal = "lose_weight" | "gain_muscle" | "maintain";
type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export function Profile() {
  const theme = useTheme();

  // Datos internos locales (ejemplo)
  const userId = "abc123";
  const username = "Fredy Gonzalez";
  const gender: Gender = "male";
  const trainingDays: WeekDay[] = ["Monday", "Wednesday", "Friday"];
  const height = 167;       // cm
  const weight = 72;       // cm
  const birthdate = "2002-11-05";  // ISO string
  const goal: Goal = "gain_muscle";
  const experience: ExperienceLevel = "intermediate";

  // Cálculo simple edad actual
  const age = birthdate
    ? Math.floor((Date.now() - new Date(birthdate).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : null;

  return (
    <Box
      // Cambié maxW container.md por w full para que ocupe todo el ancho disponible
      w="100%"
      mx="auto"
      bg="white"
      p={6}
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
      borderColor={theme.colors.gray[200]}
    >
      <Heading size="lg" mb={4} color="primary.900" textAlign="center">
        Perfil de Usuario: {username}
      </Heading>

      <VStack spacing={3} align="start" mb={6}>
        <Text><b>User ID:</b> {userId}</Text>
        <Text><b>Género:</b> {gender}</Text>
        <Text><b>Días de entrenamiento:</b> {trainingDays.join(", ")}</Text>
        <Text><b>Objetivo:</b> {goal.replace("_", " ")}</Text>
        <Text><b>Nivel de experiencia:</b> {experience}</Text>
        <Divider />
        <Text><b>Altura:</b> {height} cm</Text>
        <Text><b>Peso:</b> {weight} kg</Text>
        <Text><b>Edad:</b> {age} años</Text>
      </VStack>
    </Box>
  );
}
