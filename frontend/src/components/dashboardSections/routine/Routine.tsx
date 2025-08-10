// src/components/routine/Routine.tsx

import {
  Box,
  Heading,
  Text,
  useTheme,
  Button,
  ButtonGroup,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useRoutineDay } from "../../../hooks/useRoutineDay";
import { useAuth } from "../../../contexts/AuthContext";
import { ExerciseCard } from "./ExerciseCard";

export function Routine() {
  const theme = useTheme();
  const { user, loading: authLoading } = useAuth();
  const {
    routineDaysByUser,
    loadByUserId,
    generateWeekly,
    loading,
    error,
  } = useRoutineDay();

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    if (user?.uid) {
      loadByUserId(user.uid).then((routines) => {
        if (routines.length) setSelectedDay(routines[0].day);
        else setSelectedDay(null);
      });
    }
  }, [user?.uid, loadByUserId]);

  const handleGenerate = useCallback(async () => {
    if (!user?.uid) return;
    try {
      await generateWeekly(user.uid);
      const updatedRoutines = await loadByUserId(user.uid);
      if (updatedRoutines.length) setSelectedDay(updatedRoutines[0].day);
      else setSelectedDay(null);
    } catch (e) {
      console.error("Error generando rutina semanal:", e);
    }
  }, [user?.uid, generateWeekly, loadByUserId]);

  if (authLoading || loading) {
    return <Spinner size="xl" label="Cargando rutinas..." />;
  }

  if (!user) {
    return <Text>Por favor inicia sesión para ver tus rutinas.</Text>;
  }

  if (error) {
    return <Text color="red.500">Error al cargar rutinas: {error}</Text>;
  }

  if (!routineDaysByUser.length) {
    return (
      <Box textAlign="center" p={4}>
        <Text>No hay rutinas disponibles.</Text>
        <Button mt={4} colorScheme="teal" onClick={handleGenerate} isLoading={loading}>
          Generar Rutina Semanal
        </Button>
      </Box>
    );
  }

  const days = routineDaysByUser.map((r) => r.day);
  const routineForDay = routineDaysByUser.find((r) => r.day === selectedDay);

return (
  <Box
    w="100%"
    mx="auto"
    bg="white"
    p={6}
    rounded="xl"
    shadow="lg"
    borderWidth={1}
    borderColor={theme.colors.gray[200]}
    display="flex"
    flexDirection="column"
    maxH="750px"
  >
    {/* Sección fija arriba: título, botón y botones días */}
    <Box flex="none" mb={4}>
      <Box textAlign="center" mb={4}>
        <Button colorScheme="teal" onClick={handleGenerate} isLoading={loading}>
          Generar Rutina Semanal
        </Button>
      </Box>

      <Heading size="lg" mb={1} color="primary.900" textAlign="center">
        Rutina del día: {selectedDay}
      </Heading>

      {/* Mostrar categorías, duración y notas */}
      <Box textAlign="center" mb={4}>
        {routineForDay?.categories && routineForDay.categories.length > 0 && (
          <Text
            fontWeight="semibold"
            fontSize="md"
            color={theme.colors.primary[600]}
            textTransform="capitalize"
            mb={2}
          >
            Categorías: {routineForDay.categories.join(" | ")}
          </Text>
        )}

        {routineForDay?.duration && (
          <Text fontSize="sm" color={theme.colors.gray[700]} mb={2}>
            Duración: {routineForDay.duration} min
          </Text>
        )}

        {routineForDay?.notes && (
          <Text fontSize="sm" color={theme.colors.gray[700]} fontStyle="italic">
            Notas: {routineForDay.notes}
          </Text>
        )}
      </Box>

      <Box overflowX="auto" whiteSpace="nowrap">
        <ButtonGroup isAttached variant="outline" size="md">
          {days.map((day, index) => {
            const isSelected = day === selectedDay;
            return (
              <Button
                key={day}
                onClick={() => setSelectedDay(day)}
                bg={isSelected ? theme.colors.primary[500] : "transparent"}
                color={isSelected ? "white" : theme.colors.gray[700]}
                _hover={{
                  bg: isSelected ? theme.colors.primary[600] : theme.colors.gray[100],
                }}
                _active={{
                  bg: isSelected ? theme.colors.primary[700] : theme.colors.gray[200],
                }}
                borderColor={theme.colors.gray[300]}
                borderRight={index === days.length - 1 ? "1px solid" : "none"}
                whiteSpace="nowrap"
                minWidth="max-content"
              >
                {day}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
    </Box>

    {/* Sección scrollable: lista de ejercicios */}
    <Box
      flex="1"
      overflowY="auto"
      pt={2}
      pr={2}
    >
      {routineForDay?.exercises.length ? (
        routineForDay.exercises.map((exercise) => (
          <ExerciseCard key={exercise.exerciseBaseId} exercise={exercise} />
        ))
      ) : (
        <Text textAlign="center" color={theme.colors.gray[600]}>
          No hay ejercicios para este día.
        </Text>
      )}
    </Box>
  </Box>
);


}
