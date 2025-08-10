import { Box, Text, VStack, HStack, Image, useTheme } from "@chakra-ui/react";
import type { Exercise } from "./routinesData";
import { getExerciseBaseById } from "./routinesData";

type ExerciseListProps = {
  exercises: Exercise[];
};

export function ExerciseList({ exercises }: ExerciseListProps) {
  const theme = useTheme();

  return (
    <VStack spacing={4} align="stretch">
      {exercises.map((exercise) => {
        const base = getExerciseBaseById(exercise.id);
        if (!base) return null; // aún dejamos esta validación por seguridad

        return (
          <Box
            key={exercise.id}
            p={4}
            borderWidth="1px"
            borderColor={theme.colors.gray[300]}
            rounded="md"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          >
            <HStack spacing={4} align="center">
              <Image
                src={base.photoUrl}
                alt={base.name}
                boxSize="80px"
                objectFit="cover"
                rounded="md"
                border="1px solid"
                borderColor={theme.colors.gray[300]}
              />
              <VStack align="start" spacing={1} flex="1">
                <Text fontWeight="bold" fontSize="lg">
                  {base.name}
                </Text>

                <Text fontSize="sm" color={theme.colors.gray[600]}>
                  Series: {exercise.series} &nbsp;|&nbsp; Reps: {exercise.reps} &nbsp;|&nbsp; Peso: {exercise.weight}
                </Text>
              </VStack>
            </HStack>

            {base.description && (
              <Text mt={2} fontSize="sm" color={theme.colors.gray[600]}>
                {base.description}
              </Text>
            )}
          </Box>
        );
      })}
    </VStack>
  );
}
