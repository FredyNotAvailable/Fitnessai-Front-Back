import { Box, Text, useTheme } from "@chakra-ui/react";
import { ExerciseCard } from "./ExerciseCard";

interface RoutineExerciseListProps {
  exercises: any[];
}

export function RoutineExerciseList({ exercises }: RoutineExerciseListProps) {
  const theme = useTheme();

  return (
    <Box flex="1" overflowY="auto" pt={2} pr={2}>
      {exercises && exercises.length > 0 ? (
        exercises.map((exercise) => (
          <ExerciseCard key={exercise.exerciseBaseId} exercise={exercise} />
        ))
      ) : (
        <Text textAlign="center" color={theme.colors.gray[600]}>
          No hay ejercicios para este día.
        </Text>
      )}
    </Box>
  );
}
