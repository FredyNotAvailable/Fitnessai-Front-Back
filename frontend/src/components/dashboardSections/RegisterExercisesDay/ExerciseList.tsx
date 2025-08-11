import { Box, Text, VStack } from "@chakra-ui/react";
import { ExerciseCard } from "./ExerciseCard";
import type { ExerciseHistory } from "../../../models/ExerciseHistory";
import type { ExerciseBase } from "../../../models/ExerciseBase";

export interface ExerciseListProps {
  histories: ExerciseHistory[];
  exerciseBases: ExerciseBase[];
  loading: boolean;
  error: string | null;
}

export function ExerciseList({ histories, exerciseBases, loading, error }: ExerciseListProps) {
  if (loading) {
    return (
      <Box textAlign="center" py={6}>
        <Text>Cargando ejercicios...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Text color="red.500">
        Error: {error}
      </Text>
    );
  }

  if (histories.length === 0) {
    return (
      <Text color="gray.500">No hay ejercicios registrados aún.</Text>
    );
  }

  return (
    <VStack spacing={3} align="stretch">
      {histories.map((history) => {
        const base = exerciseBases.find((ex) => ex.id === history.exerciseBaseId);
        if (!base) return null;
        return <ExerciseCard key={history.id} history={history} base={base} />;
      })}
    </VStack>
  );
}
