// Routine.tsx (solo fragmento modificado)
import { Box, Heading, Text, useTheme, Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";

import { routinesByDay, type RoutineDay } from "./routinesData";
import { ExerciseList } from "./ExerciseList";

const days = Object.keys(routinesByDay);

export function Routine() {
  const theme = useTheme();
  const [selectedDay, setSelectedDay] = useState<string>(days[0]);

  const routineForDay: RoutineDay | undefined = routinesByDay[selectedDay];

  if (!routineForDay) return <Text>No hay rutina para este día.</Text>;

  return (
    <Box
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
        Rutina del día: {selectedDay}
      </Heading>

      <Box overflowX="auto" whiteSpace="nowrap" mb={4}>
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

      <Text fontWeight="semibold" mb={1}>
        Categoría:{" "}
        {Array.isArray(routineForDay.category)
          ? routineForDay.category.join(" | ")
          : routineForDay.category}
      </Text>

      {/* Aquí la duración */}
      <Text fontWeight="semibold" mb={4}>
        Duración estimada: {routineForDay.duration} minutos
      </Text>

      <ExerciseList exercises={routineForDay.exercises} />
    </Box>
  );
}
