import {
  Box,
  Heading,
  Text,
  VStack,
  useTheme,
  Flex,
  Icon,
  IconButton,
  CircularProgress,
  HStack,
} from "@chakra-ui/react";
import { FaDumbbell, FaPlus } from "react-icons/fa";

type DailyTrainingStats = {
  dailyGoalMinutes: number;
  totalMinutesToday: number;
  todaysCategory?: string;
  totalExercises: number;        // total ejercicios programados hoy
  exercisesDone: number;          // ejercicios completados hoy
};

type DailyTrainingStatsCardProps = {
  cardHeight?: number | string;
};

export function DailyTrainingStatsCard({ cardHeight }: DailyTrainingStatsCardProps) {
  const theme = useTheme();

  const stats: DailyTrainingStats = {
    dailyGoalMinutes: 30,
    totalMinutesToday: 22,
    todaysCategory: "Pecho",
    totalExercises: 12,
    exercisesDone: 7,
  };

  const minutesProgress =
    stats.dailyGoalMinutes > 0
      ? Math.min((stats.totalMinutesToday / stats.dailyGoalMinutes) * 100, 100)
      : 0;

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
      position="relative"
      height={cardHeight}
      minHeight={cardHeight ? undefined : "auto"}
    >
      <Heading size="lg" mb={6} color="primary.900" textAlign="center">
        Progreso Diario
      </Heading>

      <Flex justify="center" mb={6} position="relative" w="80px" h="80px" mx="auto">
        <CircularProgress
          value={minutesProgress}
          size="80px"
          thickness="10px"
          color={minutesProgress >= 100 ? "green.400" : "primary.500"}
          trackColor={theme.colors.gray[200]}
          capIsRound
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color={minutesProgress >= 100 ? "green.400" : "primary.500"}
          fontSize="32px"
          pointerEvents="none"
        >
          <Icon as={FaDumbbell} />
        </Box>
      </Flex>

      <Text textAlign="center" fontSize="xl" fontWeight="bold" mb={1} color="primary.700">
        {stats.totalMinutesToday} / {stats.dailyGoalMinutes} minutos entrenados
      </Text>

      <Text textAlign="center" fontSize="lg" fontWeight="semibold" color="primary.600" mb={6}>
        Ejercicios: {stats.exercisesDone} / {stats.totalExercises}
      </Text>

      <VStack spacing={3} align="center" mb={12}>
        {stats.todaysCategory ? (
          <Text fontSize="lg" fontWeight="semibold" color="primary.600">
            Categoría entrenada hoy: {stats.todaysCategory}
          </Text>
        ) : (
          <Text fontSize="md" color="gray.500">
            No se registró entrenamiento hoy
          </Text>
        )}
      </VStack>

      {/* Botón flotante en esquina derecha inferior */}
      <IconButton
        position="absolute"
        bottom={4}
        right={4}
        bg={theme.colors.gray[900]}
        color="white"
        borderRadius="full"
        size="xl"
        w={14}
        h={14}
        boxShadow="md"
        aria-label="Agregar entrenamiento"
        icon={<FaPlus size={28} />}
        _hover={{ bg: theme.colors.gray[800] }}
        zIndex={10}
      />
    </Box>
  );
}
