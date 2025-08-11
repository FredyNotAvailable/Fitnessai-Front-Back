import { Box, Heading, Text, useTheme, Flex, Icon } from "@chakra-ui/react";
import {
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaChartLine } from "react-icons/fa";

import type { DataEntryMulti } from '../../../models/ChartTypes'; // SOLO importar

interface MultiLineChartProps {
  data: DataEntryMulti[];
  title?: string;
  height?: string | number;
  yLabel?: string;
  lines: {
    dataKey: string;  // clave en los datos
    color: string;
    name: string;     // nombre para leyenda y tooltip
  }[];
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function MultiLineChart({
  data,
  title,
  height = 280,
  yLabel = "Valor",
  lines,
}: MultiLineChartProps) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Box p={6} bg="white" rounded="lg" shadow="md" textAlign="center">
        <Text>No hay datos para mostrar.</Text>
      </Box>
    );
  }

  // Calculamos mínimo y máximo entre todas las líneas para dominio Y
  const allValues = lines.flatMap(({ dataKey }) =>
    data.map((d) => d[dataKey] as number)
  );
  let minValue = Math.floor(Math.min(...allValues) / 5) * 5;
  let maxValue = Math.ceil(Math.max(...allValues) / 5) * 5;

  if (minValue === maxValue) {
    maxValue += 5;
  }

  const tickStep = 5;
  const yTicks = [];
  for (let v = minValue; v <= maxValue; v += tickStep) {
    yTicks.push(v);
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <Box
          bg="white"
          p={3}
          rounded="md"
          boxShadow="md"
          border="1px solid #ddd"
          maxW="240px"
        >
          <Text fontWeight="bold" mb={2}>
            Fecha: {new Date(label!).toLocaleDateString("es-ES")}
          </Text>

          {payload.map((entry, idx) => (
            <Flex key={idx} align="center" gap={2} mb={1}>
              <Icon as={FaChartLine} boxSize="14px" color={entry.color} />
              <Text fontSize="sm">
                {entry.name}: {entry.value}
              </Text>
            </Flex>
          ))}
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
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="date"
              tickFormatter={(str) =>
                new Date(str).toLocaleDateString("es-ES", {
                  month: "short",
                  year: "2-digit",
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
            <Legend verticalAlign="top" height={36} />
            {lines.map(({ dataKey, color }) => (
              <Line
                key={dataKey}
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={700}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
