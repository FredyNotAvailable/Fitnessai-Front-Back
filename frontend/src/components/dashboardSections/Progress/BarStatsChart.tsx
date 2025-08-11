import { Box, Heading, Text, useTheme, Flex, Icon } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaChartBar } from "react-icons/fa";

import type { DataEntryMulti } from "../../../models/ChartTypes";

interface BarStatsChartProps {
  data: DataEntryMulti[];
  title?: string;
  height?: string | number;
  yLabel?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function BarStatsChart({
  data,
  title,
  height = 320,
  yLabel = "Cantidad",
}: BarStatsChartProps) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Box p={6} bg="white" rounded="lg" shadow="md" textAlign="center">
        <Text>No hay datos para mostrar.</Text>
      </Box>
    );
  }

  // Ordenar datos ascendentemente por fecha (del más antiguo al más reciente)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

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
            Fecha:{" "}
            {new Date(label!).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Text>

          {payload.map((entry, idx) => (
            <Flex key={idx} align="center" gap={2} mb={1}>
              <Icon as={FaChartBar} boxSize="14px" color={entry.color} />
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
          <BarChart
            data={sortedData}
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="date"
              tickFormatter={(str) =>
                new Date(str).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })
              }
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={false}
              tickLine={false}
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
            <Bar dataKey="sets" fill="#3182ce" />
            <Bar dataKey="reps" fill="#38a169" />
            <Bar dataKey="weight" fill="#dd6b20" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
