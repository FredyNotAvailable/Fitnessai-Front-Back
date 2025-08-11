import { Box, Text, Spinner } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/AuthContext";
import { useWaterHistoriesByUser } from "../../../hooks/useWaterHistory";
import { GenericLineChart } from "./GenericLineChart";

interface WaterStatsProps {
  startDate: string | null;
  endDate: string | null;
}

export function WaterStats({ startDate, endDate }: WaterStatsProps) {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.uid;

  const { histories, loading, error } = useWaterHistoriesByUser(userId);

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
  const data = filtered.map(({ date, liters }) => ({
    date,
    value: liters,
  }));

  return (
    <Box>
      <GenericLineChart
        data={data}
        title="Consumo de Agua"
        yLabel="Litros (L)"
        height={270}
      />
    </Box>
  );
}
