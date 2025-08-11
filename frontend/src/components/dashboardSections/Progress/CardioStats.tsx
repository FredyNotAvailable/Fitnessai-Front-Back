import { useAuth } from "../../../contexts/AuthContext";
import { useCardioHistoriesByUser } from "../../../hooks/useCardioHistory";
import { Text, Box } from "@chakra-ui/react";
import { GenericLineChart } from "./GenericLineChart"; // Ajusta la ruta si es necesario

interface StatsProps {
  startDate: string | null;
  endDate: string | null;
}

interface DataEntry {
  date: string;
  value: number;
}

export function CardioStats({ startDate, endDate }: StatsProps) {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.uid;

  const { histories, loading, error } = useCardioHistoriesByUser(userId);

  if (authLoading || loading)
    return <Text>Cargando datos de cardio...</Text>;

  if (!user)
    return <Text>Debes iniciar sesión para ver las estadísticas de cardio.</Text>;

  if (error) return <Text color="red.500">Error: {error}</Text>;

  if (!histories.length)
    return <Text>No hay datos disponibles para el rango seleccionado.</Text>;

  // Filtrar por rango de fechas
  const filteredHistories = histories.filter(({ date }) => {
    if (startDate && date < startDate) return false;
    if (endDate && date > endDate) return false;
    return true;
  });

  if (filteredHistories.length === 0)
    return <Text>No hay datos en el rango seleccionado.</Text>;

  // Mapea para el chart; cambia "steps" por la propiedad real que usas en CardioHistory
  const chartData: DataEntry[] = filteredHistories.map(({ date, distance }) => ({
    date,
    value: distance,
  }));

  return (
    <Box>
      <GenericLineChart
        data={chartData}
        title="Evolución Cardio (Distancia)"
        yLabel="Distancia (km)"
        height={270}
      />
    </Box>
  );
}
