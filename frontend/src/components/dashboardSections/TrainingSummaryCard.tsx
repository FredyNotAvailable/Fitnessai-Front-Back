import { Box, Heading, VStack, useTheme, Text, Flex, CircularProgress } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SummaryStats = {
  period: "Semana" | "Mes";
  totalWorkouts: number;
  totalExercises: number;
  goalWorkouts: number;
};

export function TrainingSummaryCard() {
  const theme = useTheme();

  const stats: SummaryStats = {
    period: "Semana",
    totalWorkouts: 4,
    totalExercises: 28,
    goalWorkouts: 5,
  };

  // Datos ejemplo ejercicios propuestos y realizados por día
  const chartData = [
    { day: "Lun", proposed: 5, done: 5 },
    { day: "Mar", proposed: 5, done: 2 },
    { day: "Mié", proposed: 5, done: 4 },
    { day: "Jue", proposed: 5, done: 3 },
    { day: "Vie", proposed: 5, done: 0 },
    { day: "Sáb", proposed: 0, done: 2 }, // día sin meta pero hizo ejercicios
    { day: "Dom", proposed: 0, done: 0 },
  ];

  const progress =
    stats.goalWorkouts > 0
      ? Math.min((stats.totalWorkouts / stats.goalWorkouts) * 100, 100)
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
    >
      <Heading size="lg" mb={4} color="primary.900" textAlign="center">
        Resumen {stats.period}
      </Heading>

      <Flex mb={6} align="center" justify="space-between" flexWrap="wrap" gap={6}>
        {/* Gráfico de barras ejercicios propuestos vs realizados */}
        <Box flex="1 1 60%" minW="280px" height="220px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.gray[200]} />
              <XAxis dataKey="day" tick={{ fill: theme.colors.gray[600] }} />
              <YAxis
                allowDecimals={false}
                tick={{ fill: theme.colors.gray[600] }}
                domain={[0, 'dataMax + 2']}
                label={{ value: 'Ejercicios', angle: -90, position: 'insideLeft', fill: theme.colors.gray[600] }}
              />
              <Tooltip />
              <Bar
                dataKey="proposed"
                name="Propuestos"
                fill={theme.colors.primary[500]}
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="done"
                name="Realizados"
                fill={theme.colors.green[400]}
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Porcentaje de progreso */}
        <Flex
          flex="0 0 120px"
          height="120px"
          align="center"
          justify="center"
          position="relative"
        >
          <CircularProgress
            value={progress}
            size="120px"
            thickness="12px"
            color={progress >= 100 ? "green.400" : "primary.500"}
            trackColor={theme.colors.gray[200]}
            capIsRound
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              fontWeight="bold"
              fontSize="24px"
              color={progress >= 100 ? "green.400" : "primary.500"}
            >
              {progress.toFixed(0)}%
            </Box>
          </CircularProgress>
        </Flex>
      </Flex>

      <VStack spacing={3} align="start">
        <Text>
          <b>Entrenamientos:</b> {stats.totalWorkouts} / {stats.goalWorkouts}
        </Text>
        <Text>
          <b>Ejercicios realizados:</b> {stats.totalExercises}
        </Text>
      </VStack>
    </Box>
  );
}
