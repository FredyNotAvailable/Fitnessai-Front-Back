import { Box, HStack, VStack, Text, useTheme } from "@chakra-ui/react";
import { useMemo } from "react";

type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

const weekDays: WeekDay[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const shortDays = ["L", "M", "M", "J", "V", "S", "D"];

type Status = "done" | "missed";

export function WeeklyExerciseTracker() {
  const theme = useTheme();

  const weeklyExerciseStatus: Record<WeekDay, Status> = {
    Monday: "done",
    Tuesday: "missed",
    Wednesday: "missed",
    Thursday: "done",
    Friday: "done",
    Saturday: "missed",
    Sunday: "missed",
  };

  const today = new Date();
  const todayWeekDayIndex = today.getDay(); // Sunday=0 ... Saturday=6
  const adjustedTodayIndex = todayWeekDayIndex === 0 ? 6 : todayWeekDayIndex - 1;

  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() - adjustedTodayIndex);

  const weekDates = useMemo(() => {
    return [...Array(7).keys()].map((i) => {
      const d = new Date(mondayDate);
      d.setDate(mondayDate.getDate() + i);
      return d;
    });
  }, [mondayDate]);

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
      <Text fontWeight="bold" mb={4} textAlign="center" fontSize="xl" color="primary.900">
        Estado de ejercicio semanal
      </Text>

      <HStack spacing={4} justify="center" flexWrap="wrap">
        {weekDays.map((day, i) => {
          const status = weeklyExerciseStatus[day];
          const dateObj = weekDates[i];
          const dateNum = dateObj.getDate();

          const isToday = i === adjustedTodayIndex;
          const isFuture = dateObj > today;

          let borderColor = theme.colors.gray[400];
          if (isToday) borderColor = "black";
          else if (!isFuture) borderColor = status === "done" ? theme.colors.status.green : theme.colors.status.red;

          return (
            <VStack key={day} spacing={1} minW="40px" cursor="default">
              <Box
                w={10}
                h={10}
                rounded="full"
                borderWidth="2px"
                borderColor={borderColor}
                bg="transparent"
                color="black" // letra siempre negra
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                fontSize="lg" // mismo tamaño para letras y números
                userSelect="none"
              >
                {shortDays[i]}
              </Box>

              <Text
                fontSize="lg" // mismo tamaño que la letra del día
                color={isFuture ? theme.colors.gray[400] : theme.colors.gray[800]}
                userSelect="none"
              >
                {dateNum}
              </Text>
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );
}
