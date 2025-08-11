import { Box, Image, Text, VStack, HStack, useTheme, Spinner } from "@chakra-ui/react";
import type { Exercise } from "../../../models/RoutineDay";
import { useExerciseBase } from "../../../hooks/useExerciseBase";

// Diccionario básico para traducción
function traducirTexto(text: string) {
  const diccionario: Record<string, string> = {
    "Chest": "Pecho",
    "Back": "Espalda",
    "Legs": "Piernas",
    "Shoulders": "Hombros",
    "Biceps": "Bíceps",
    "Triceps": "Tríceps",
    "Cardio": "Cardio",
    "Strength": "Fuerza",
    // Puedes agregar más traducciones específicas de ejercicios aquí
  };

  return diccionario[text] || text;
}

type Props = {
  exercise: Exercise;
};

export function ExerciseCard({ exercise }: Props) {
  const theme = useTheme();

  // Usamos el hook pasando el id para cargar el exerciseBase
  const { exerciseBase, loading, error } = useExerciseBase(exercise.exerciseBaseId);

  if (loading) {
    return (
      <Box
        w="100%"
        maxH="180px"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        boxShadow="md"
        bg="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error || !exerciseBase) {
    return (
      <Box
        w="100%"
        maxH="180px"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        boxShadow="md"
        bg="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="red.500">Error al cargar información del ejercicio.</Text>
      </Box>
    );
  }

  // Traduce nombre y descripción antes de mostrar
  const nombreTraducido = traducirTexto(exerciseBase.name);
  const descripcionTraducida = exerciseBase.description
    ? traducirTexto(exerciseBase.description)
    : "";

  return (
    <Box
      w="100%"
      maxH="180px"
      borderWidth="1px"
      borderRadius="md"
      p={4}
      overflowY="auto"
      boxShadow="md"
      bg="white"
      display="flex"
      gap={4}
    >
      {/* Foto */}
      <Image
        src={exerciseBase.photoUrl}
        alt={nombreTraducido}
        boxSize="120px"
        objectFit="cover"
        borderRadius="md"
        flexShrink={0}
      />

      {/* Contenido */}
      <VStack align="start" spacing={2} flex="1" overflow="hidden">
        <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
          {nombreTraducido}
        </Text>

        <HStack spacing={6}>
          <Text fontSize="sm">Series: {exercise.sets}</Text>
          <Text fontSize="sm">Repeticiones: {exercise.reps}</Text>
          <Text fontSize="sm">Peso: {exercise.weight} kg</Text>
        </HStack>

        <Text
          fontSize="sm"
          color={theme.colors.gray[600]}
          noOfLines={4}
          overflowY="auto"
          sx={{
            maxHeight: "4.5em",
          }}
        >
          {descripcionTraducida}
        </Text>
      </VStack>
    </Box>
  );
}
