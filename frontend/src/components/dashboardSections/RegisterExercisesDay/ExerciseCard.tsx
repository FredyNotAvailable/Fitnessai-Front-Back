import { Box, Text, Flex, useTheme, Image } from "@chakra-ui/react";
import type { ExerciseHistory } from "../../../models/ExerciseHistory";
import type { ExerciseBase } from "../../../models/ExerciseBase";

// Diccionario para categorías en minúscula
const Categoria = {
  chest: "Pecho",
  back: "Espalda",
  arm: "Brazo",
  leg: "Pierna",
} as const;

function traducirCategoria(cat: string) {
  if (!cat) return cat;
  return (Categoria as any)[cat.toLowerCase()] || cat;
}

interface ExerciseCardProps {
  history: ExerciseHistory;
  base: ExerciseBase;
}

export function ExerciseCard({ history, base }: ExerciseCardProps) {
  const theme = useTheme();

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      borderColor={theme.colors.gray[300]}
      bg={theme.colors.gray[50]}
      display="flex"
      alignItems="center"
      gap={4}
    >
      {base.photoUrl && (
        <Image
          src={"https://i.pinimg.com/736x/18/67/23/18672311e25fb09ff6e48f78fcc7a6ad.jpg"}
          // src={base.photoUrl}
          alt={base.name}
          boxSize="80px"
          objectFit="cover"
          borderRadius="md"
        />
      )}
      <Box flex="1">
        <Flex justify="space-between" mb={2}>
          <Text fontWeight="bold" fontSize="lg" color="primary.900">
            {base.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {history.date}
          </Text>
        </Flex>

        <Text fontSize="sm" color="gray.600" mb={1}>
          Categoría: {traducirCategoria(base.category)}
        </Text>
        <Text mb={2}>{base.description}</Text>

        <Text>
          Series: {history.sets} | Repeticiones: {history.reps} | Peso: {history.weight} kg
        </Text>
        {history.notes && (
          <Text mt={1} fontStyle="italic" color="gray.600">
            Notas: {history.notes}
          </Text>
        )}
      </Box>
    </Box>
  );
}
