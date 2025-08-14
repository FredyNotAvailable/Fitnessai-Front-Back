import { 
  Box, Text, useTheme, Select, HStack
} from "@chakra-ui/react";
import { useState } from "react";

import { CardioStats } from "./CardioStats";
import { SleepStats } from "./SleepStats";
import { TrainingStats } from "./TrainingStats";
import { WaterStats } from "./WaterStats";
import { WeightStats } from "./WeightStats";

const categories = [
  { label: "Peso", value: "Peso" },
  { label: "Entrenamiento", value: "Entrenamiento" },
  { label: "Cardio", value: "Cardio" },
  { label: "Agua", value: "Agua" },
  { label: "Sueño", value: "Sueño" },
];

// Formatea Date a string ISO YYYY-MM-DD para input type="date" y props
function formatDateISO(date: Date | null): string {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

export function UserStatsCard() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("Peso");
  const [dateFrom] = useState<Date | null>(null);
  const [dateTo] = useState<Date | null>(null);

  // Pasamos strings o null porque los hijos esperan startDate: string | null
  const props = { 
    startDate: dateFrom ? formatDateISO(dateFrom) : null, 
    endDate: dateTo ? formatDateISO(dateTo) : null,
  };

  function renderCategoryComponent() {
    switch (selectedCategory) {
      case "Peso":
        return <WeightStats {...props} />;
      case "Entrenamiento":
        return <TrainingStats {...props} />;
      case "Cardio":
        return <CardioStats {...props} />;
      case "Agua":
        return <WaterStats {...props} />;
      case "Sueño":
        return <SleepStats {...props} />;
      default:
        return <Text>Selecciona una categoría para ver estadísticas.</Text>;
    }
  }

  return (
    <Box
      bg={theme.colors.gray[50]}
      p={4}
      rounded="md"
      borderWidth="1px"
      borderColor={theme.colors.gray[200]}
      height={{ base: "auto", md: "100%" }} // mobile: auto, desktop: 100%
      display="flex"
      flexDirection="column"
    >
      <HStack mb={4} justifyContent="space-between" flexWrap="nowrap" width="100%">
        <Select
          maxW="200px"
          flexShrink={0}
          value={selectedCategory}
          // placeholder="Selecciona categoría"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        {/* <HStack spacing={6} flexShrink={0}>
          <VStack spacing={1} align="start">
            <Text fontSize="sm">Desde</Text>
            <Input
              type="date"
              size="sm"
              maxW="140px"
              value={formatDateISO(dateFrom)}
              onChange={(e) => handleDateFromChange(e.target.value)}
            />
          </VStack>

          <VStack spacing={1} align="start">
            <Text fontSize="sm">Hasta</Text>
            <Input
              type="date"
              size="sm"
              maxW="140px"
              value={formatDateISO(dateTo)}
              onChange={(e) => handleDateToChange(e.target.value)}
            />
          </VStack>
        </HStack> */}
      </HStack>

      <Box
        flex="1"
        overflowY="auto"
        p={2}
        bg="white"
        rounded="md"
        border="1px solid"
        borderColor={theme.colors.gray[300]}
      >
        {renderCategoryComponent()}
      </Box>
    </Box>
  );
}
