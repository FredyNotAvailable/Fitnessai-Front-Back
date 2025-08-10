// src/pages/ProgressPage.tsx

import { Box, Heading, VStack, Text, useTheme } from "@chakra-ui/react";
import { WeightChart } from "./WeightChart";

export function Progress() {
  const theme = useTheme();

  // Simulación de datos (en producción vendrían de API o contexto)
  const height = 167; // cm

  const weightHistory = [
    { date: "2024-04-01", weight: 64 },
    { date: "2024-06-01", weight: 66 },
    { date: "2025-01-01", weight: 69 },
    { date: "2025-08-01", weight: 72 },
  ];

  return (
    <Box
      maxW="container.md"
      mx="auto"
      p={6}
      bg="white"
      rounded="2xl"           // bordes bien redondeados tipo Apple
      shadow="lg"             // sombra suave y elegante
      borderWidth="1px"       // línea fina borde
      borderColor={theme.colors.gray[200]}
    >
      <VStack spacing={6} align="stretch">
        <Heading size="lg" mb={0} textAlign="center" color="primary.900">
          Progreso
        </Heading>
        <Text fontSize="md" color="gray.600" textAlign="center">
          Visualiza la evolución de tu peso para monitorear tu progreso en tiempo real.
        </Text>

        <WeightChart
          weightHistory={weightHistory}
          heightCm={height}
          title="Evolución de Peso"
        />
      </VStack>
    </Box>
  );
}
