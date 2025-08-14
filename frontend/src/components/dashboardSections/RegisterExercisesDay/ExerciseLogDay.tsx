import {
  Box,
  VStack,
  useTheme,
  useToast,
  Heading,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { ExerciseModal } from "./ExerciseModal";
import { useAuth } from "../../../contexts/AuthContext";
import { useExerciseHistoriesByUserAndDate } from "../../../hooks/useExerciseHistory";
import { useExerciseBases } from "../../../hooks/useExerciseBase";
import { ExerciseList } from "./ExerciseList";

// Simulación de guardado en backend
async function saveExerciseToBackend(data: {
  userId: string;
  exerciseBaseId: string;
  sets: number;
  reps: number;
  weight: number;
  notes: string;
  date: string;
}) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) resolve();
      else reject(new Error("Error guardando ejercicio"));
    }, 700);
  });
}

export function ExerciseLogDay() {
  const theme = useTheme();
  const toast = useToast();
  const { user } = useAuth();

  const today = new Date().toISOString().slice(0, 10);

  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);

  const { histories, loading: loadingHistories, error: errorHistories } =
    useExerciseHistoriesByUserAndDate(user?.uid ?? "", today, refreshKey);

  const { exerciseBases, loading: loadingBases, error: errorBases } =
    useExerciseBases();

  const forceRefresh = useCallback(() => {
    setRefreshKey((prev) => !prev);
  }, []);

  const handleSave = async (data: {
    userId: string;
    exerciseBaseId: string;
    sets: number;
    reps: number;
    weight: number;
    notes: string;
  }) => {
    try {
      await saveExerciseToBackend({ ...data, date: today });
      toast({
        title: "Ejercicio guardado",
        description: "El ejercicio se registró correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setModalOpen(false);
      forceRefresh();
    } catch (error: any) {
      toast({
        title: "Error al guardar",
        description:
          error?.message || "No se pudo registrar el ejercicio.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="container.md"
      mx="auto"
      p={6}
      bg="white"
      rounded="2xl"
      shadow="lg"
      borderWidth="1px"
      borderColor={theme.colors.gray[200]}
      height="600px"
      maxHeight="600px"
      display="flex"
      flexDirection="column"
    >
      <VStack spacing={6} align="stretch" flex="1" overflow="hidden">
        {/* Encabezado */}
        <Box flexShrink={0}>
          <Heading size="lg" color="primary.900" mb={2}>
            Registra tus ejercicios diarios
          </Heading>
          <Text color="gray.600" mb={4}>
            Aquí puedes registrar tus ejercicios realizados hoy y ver el
            historial reciente.
          </Text>

          <Flex align="center" justify="space-between" mb={4}>
            <Heading size="md" color="primary.700">
              Ejercicios realizados
            </Heading>
            <Button
              colorScheme="primary"
              onClick={() => setModalOpen(true)}
            >
              Registrar ejercicio
            </Button>
          </Flex>
        </Box>

        {/* Lista scrollable */}
        <Box
          flex="1"
          overflowY="auto"
          borderTop="1px solid"
          borderColor={theme.colors.gray[200]}
          pt={4}
        >
          <ExerciseList
            histories={histories}
            exerciseBases={exerciseBases}
            loading={loadingHistories || loadingBases}
            error={errorHistories ?? errorBases ?? null}
          />
        </Box>
      </VStack>

      {/* Modal */}
      <ExerciseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={user?.uid ?? ""}
        date={today}
        onSaved={handleSave}
      />
    </Box>
  );
}
