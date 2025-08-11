import { Box, Heading, Text, useTheme } from "@chakra-ui/react";
import { UserStatsCard } from "./UserStatsCard";
import { MotivationalMessageCard } from "./MotivationalMessageCard";

export function Progress() {
  const theme = useTheme();

  return (
    <Box
      maxH="840px"
      height="840px"
      w="100%"
      mx="auto"
      bg="white"
      p={6}
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
      borderColor={theme.colors.gray[200]}
      position="relative"
      overflow="hidden"
      minH="200px"
      display="flex"
      flexDirection="column"
    >
      <Heading size="lg" mb={2} color="primary.900" textAlign="center">
        Estadísticas del Usuario
      </Heading>

      <Text
        mb={6}
        fontSize="md"
        color={theme.colors.gray[600]}
        textAlign="center"
        maxW="600px"
        mx="auto"
      >
        Aquí podrás ver un resumen detallado de tus estadísticas personales,
        incluyendo progreso, hábitos y rendimiento.
      </Text>

      <Box flex="1" display="flex" flexDirection="column" gap={4}>
        {/* Ajustamos flex para controlar espacio */}
        <Box flex={3} overflow="hidden">
          <UserStatsCard />
        </Box>
        <Box flex={1} overflow="hidden">
          <MotivationalMessageCard />
        </Box>
      </Box>
    </Box>
  );
}
