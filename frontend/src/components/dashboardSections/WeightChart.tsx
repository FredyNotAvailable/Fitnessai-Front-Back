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
import { FaWeight } from "react-icons/fa";

interface WeightEntry {
  date: string;
  weight: number;
}

interface WeightChartProps {
  weightHistory: WeightEntry[];
  heightCm: number;
  title?: string;
  height?: string | number; // altura dinámica opcional, puede ser "100%" o número en px
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function WeightChart({
  weightHistory,
  heightCm,
  title,
  height = 280,
}: WeightChartProps) {
  const theme = useTheme();
  const heightMeters = heightCm / 100;

  const data = weightHistory.map((entry) => ({
    date: entry.date,
    weight: entry.weight,
    bmi: +(entry.weight / (heightMeters * heightMeters)).toFixed(1),
  }));

  const weights = data.map((d) => d.weight);
  let minWeight = Math.floor(Math.min(...weights) / 5) * 5;
  let maxWeight = Math.ceil(Math.max(...weights) / 5) * 5;

  if (minWeight === maxWeight) {
    maxWeight += 5;
  }

  const yTicks = [];
  for (let i = minWeight; i <= maxWeight; i += 5) {
    yTicks.push(i);
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      const { weight, bmi } = payload[0].payload;
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
            Fecha: {new Date(label!).toLocaleDateString("es-ES")}
          </Text>

          <Flex align="center" gap={2} mb={1}>
            <Icon as={FaWeight} boxSize="14px" color={theme.colors.gray[600]} />
            <Text fontSize="sm">Peso: {weight} kg</Text>
          </Flex>

          <Text fontSize="sm">IMC: {bmi}</Text>
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

      <Box w="full" flex="1" minHeight={0} height={height}>
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
              domain={[minWeight, maxWeight]}
              ticks={yTicks}
              label={{
                value: "Peso (kg)",
                angle: -90,
                position: "insideLeft",
                fill: theme.colors.gray[600],
              }}
            />
            <CartesianGrid vertical={false} stroke={theme.colors.gray[200]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="weight"
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
