import { Box, Heading, Text, useTheme, Flex, Icon } from "@chakra-ui/react";
import {
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaChartLine } from "react-icons/fa";

interface DataEntry {
  date: string; // formato ISO string
  value: number; // valor numérico genérico
}

interface GenericChartProps {
  data: DataEntry[];
  title?: string;
  height?: string | number;
  yLabel?: string; // etiqueta eje Y (ej. "Peso (kg)", "Temperatura (°C)")
  showDerivedValue?: boolean; // si mostrar un valor derivado tipo BMI
  derivedValueFn?: (value: number) => number; // función para derivar otro valor opcional
  derivedLabel?: string; // etiqueta del valor derivado en tooltip

  fixedYRange?: boolean; // activa rango fijo personalizado
  fixedYMin?: number;    // mínimo eje Y si fixedYRange=true
  fixedYMax?: number;    // máximo eje Y si fixedYRange=true
  fixedYTickStep?: number; // paso entre ticks si fixedYRange=true (opcional)
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function calculateTickStep(min: number, max: number): number {
  const range = max - min;
  if (range <= 5) return 1;
  if (range <= 10) return 2;
  if (range <= 50) return 5;
  return 10;
}

export function GenericLineChart({
  data,
  title,
  height = 280,
  yLabel = "Valor",
  showDerivedValue = false,
  derivedValueFn,
  derivedLabel = "",
  fixedYRange = false,
  fixedYMin,
  fixedYMax,
  fixedYTickStep,
}: GenericChartProps) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Box p={6} bg="white" rounded="lg" shadow="md" textAlign="center">
        <Text>No hay datos para mostrar.</Text>
      </Box>
    );
  }

  // Orden ascendente por fecha (del más antiguo al más reciente)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const values = sortedData.map((d) => d.value);

  const minValue =
    fixedYRange && fixedYMin !== undefined
      ? fixedYMin
      : Math.floor(Math.min(...values));

  let maxValue =
    fixedYRange && fixedYMax !== undefined
      ? fixedYMax
      : Math.ceil(Math.max(...values));

  if (!fixedYRange && minValue === maxValue) {
    maxValue += 1;
  }

  let tickStep: number;
  if (fixedYRange) {
    tickStep =
      fixedYTickStep !== undefined ? fixedYTickStep : calculateTickStep(minValue, maxValue);
  } else {
    tickStep = calculateTickStep(minValue, maxValue);
  }

  const yTicks = [];
  for (let v = minValue; v <= maxValue; v += tickStep) {
    yTicks.push(Number(v.toFixed(5)));
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      const value = payload[0].payload.value;
      const derivedValue = derivedValueFn ? derivedValueFn(value) : null;
      return (
        <Box
          bg="white"
          p={3}
          rounded="md"
          boxShadow="md"
          border="1px solid #ddd"
          maxW="220px"
        >
          <Text fontWeight="bold" mb={2}>
            Fecha:{" "}
            {new Date(label!).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Text>

          <Flex align="center" gap={2} mb={1}>
            <Icon as={FaChartLine} boxSize="14px" color={theme.colors.gray[600]} />
            <Text fontSize="sm">
              {yLabel}: {value}
            </Text>
          </Flex>

          {showDerivedValue && derivedValue !== null && (
            <Text fontSize="sm">
              {derivedLabel}: {derivedValue}
            </Text>
          )}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      bg="white"
      p={6}
      rounded="3xl"
      shadow="xl"
      w="full"
      borderWidth="1px"
      borderColor={theme.colors.gray[200]}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      {title && (
        <Heading
          size="md"
          mb={4}
          color="primary.900"
          textAlign="center"
          userSelect="none"
        >
          {title}
        </Heading>
      )}

      <Box w="full" height={height}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sortedData}
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="date"
              tickFormatter={(str) =>
                new Date(str).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              stroke={theme.colors.status.green}
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[minValue, maxValue]}
              ticks={yTicks}
              label={{
                value: yLabel,
                angle: -90,
                position: "insideLeft",
                fill: theme.colors.gray[600],
              }}
            />
            <CartesianGrid vertical={false} stroke={theme.colors.gray[200]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={theme.colors.status.green}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={700}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
