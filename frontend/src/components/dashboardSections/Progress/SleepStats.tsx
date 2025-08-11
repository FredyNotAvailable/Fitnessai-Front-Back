import { Text, Spinner, Box } from "@chakra-ui/react";
import { useSleepHistoriesByUser } from "../../../hooks/useSleepHistory";
import { GenericLineChart } from "./GenericLineChart";
import { useAuth } from "../../../contexts/AuthContext";

interface StatsProps {
  startDate: string | null;
  endDate: string | null;
}

export function SleepStats({ startDate, endDate }: StatsProps) {
  const { user, loading: authLoading } = useAuth();

  const userId = user?.uid;

  const { histories, loading, error } = useSleepHistoriesByUser(userId);

  if (authLoading || loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!histories.length) return <Text>No hay datos de sueño disponibles.</Text>;

  // Filtrar por rango de fechas
  const filtered = histories.filter(({ date }) => {
    if (startDate && date < startDate) return false;
    if (endDate && date > endDate) return false;
    return true;
  });

  if (filtered.length === 0) {
    return <Text>No hay datos de sueño en el rango seleccionado.</Text>;
  }

  const data = filtered.map(({ date, duration }) => ({
    date,
    value: duration,
  }));

  return (
    <Box>
      <GenericLineChart
        data={data}
        title="Evolución del Sueño"
        yLabel="Horas dormidas"
        height={270}
      />
    </Box>
  );
}
