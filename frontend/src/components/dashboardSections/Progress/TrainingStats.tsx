import { useAuth } from "../../../contexts/AuthContext";
import { useExerciseHistoriesByUser } from "../../../hooks/useExerciseHistory";
import { Text, Box } from "@chakra-ui/react";
// import { MultiLineChart } from "./MultiLineChart"; // Comentar el gráfico de líneas para ahora usar el de barras
import { BarStatsChart } from "./BarStatsChart"; // Nuevo componente gráfico de barras

import type { DataEntryMulti } from "../../../models/ChartTypes"; // IMPORTA tu tipo real

interface StatsProps {
  startDate: string | null;
  endDate: string | null;
}

export function TrainingStats({ startDate, endDate }: StatsProps) {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.uid;
  const { histories, loading, error } = useExerciseHistoriesByUser(userId);

  if (authLoading || loading) return <Text>Cargando datos de entrenamiento...</Text>;
  if (!user) return <Text>Debes iniciar sesión para ver las estadísticas.</Text>;
  if (error) return <Text color="red.500">Error: {error}</Text>;
  if (!histories.length) return <Text>No hay datos para el rango seleccionado.</Text>;

  // Filtrar por fechas
  const filtered = histories.filter(({ date }) => {
    if (startDate && date < startDate) return false;
    if (endDate && date > endDate) return false;
    return true;
  });

  if (filtered.length === 0) return <Text>No hay datos en el rango seleccionado.</Text>;

  // Agrupar por fecha sumando sets, reps y peso
  const grouped = filtered.reduce<Record<string, { sets: number; reps: number; weight: number }>>((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = { sets: 0, reps: 0, weight: 0 };
    acc[curr.date].sets += curr.sets;
    acc[curr.date].reps += curr.reps;
    acc[curr.date].weight += curr.weight;
    return acc;
  }, {});

  // const chartData: DataEntryMulti[] = Object.entries(grouped).map(([date, vals]) => ({
  //   date,
  //   sets: vals.sets,
  //   reps: vals.reps,
  //   weight: Number(vals.weight.toFixed(1)),
  // }));

    const chartData: DataEntryMulti[] = Object.entries(grouped).map(([date, vals]) => ({
    date,
    sets: vals.sets,
    reps: vals.reps,
    weight: Number(vals.weight.toFixed(1)),
  }));

  return (
    <Box>
      {/* Nuevo gráfico de barras */}
      <BarStatsChart
        data={chartData}
        title="Estadísticas de Entrenamiento (Barra)"
        yLabel="Cantidad"
        height={270}
      />
    </Box>
  );
}
