import { Box, Text, Spinner } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/AuthContext";
import { useWeightHistoriesByUser } from "../../../hooks/useWeightHistory";
import { GenericLineChart } from "./GenericLineChart";

interface WeightStatsProps {
  startDate: string | null;
  endDate: string | null;
}

export function WeightStats({ startDate, endDate }: WeightStatsProps) {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.uid;

  const { histories, loading, error } = useWeightHistoriesByUser(userId);

  if (authLoading || loading) return <Spinner />;
  if (error) return <Text color="red.500">Error: {error}</Text>;
  if (!histories.length) return <Text>No hay datos disponibles.</Text>;

  // Filtrar por rango de fechas
  const filtered = histories.filter(({ date }) => {
    if (startDate && date < startDate) return false;
    if (endDate && date > endDate) return false;
    return true;
  });

  if (filtered.length === 0) {
    return <Text>No hay datos en el rango seleccionado.</Text>;
  }

  // Mapear para el gráfico
  const data = filtered.map(({ date, weight }) => ({
    date,
    value: weight,
  }));

  return (
    <Box>
      <GenericLineChart
        data={data}
        title="Evolución de Peso"
        yLabel="Peso (kg)"
        height={270}
      />
    </Box>
  );
}
