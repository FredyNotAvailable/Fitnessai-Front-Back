import { Box, Heading, HStack, VStack, Text, Icon, useTheme, CircularProgress, IconButton } from "@chakra-ui/react";
import { FaTint, FaBed, FaRunning, FaPlus } from "react-icons/fa";

type Habit = {
  id: string;
  label: string;
  icon: React.ElementType;
  completed: boolean;
  currentAmount?: string;
  goalAmount?: string;
};

export function Habits() {
  const theme = useTheme();

  const habits: Habit[] = [
    { id: "water", label: "Water", icon: FaTint, completed: true, currentAmount: "1.5L", goalAmount: "2L" },
    { id: "sleep", label: "Sleep", icon: FaBed, completed: false, currentAmount: "6h", goalAmount: "8h" },
    { id: "cardio", label: "Cardio", icon: FaRunning, completed: true, currentAmount: "30min", goalAmount: "30min" },
  ];

  const completedCount = habits.filter(h => h.completed).length;

  function parseAmount(value?: string) {
    if (!value) return 0;
    const match = value.match(/[\d\.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  return (
    <Box
      w="100%"
      mx="auto"
      bg="white"
      p={6}
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
      borderColor={theme.colors.gray[200]}
      position="relative" // permite posicionar el botón flotante
      minH="200"        // opcional: asegura mínimo alto para que no se reduzca con el botón
    >
      <Heading size="lg" mb={4} color="primary.900" textAlign="center">
        Daily Habits
      </Heading>

      <HStack justify="space-around" flexWrap="wrap" spacing={8}>
        {habits.map(({ id, label, icon, completed, currentAmount, goalAmount }) => {
          const hasProgress = currentAmount && goalAmount;
          const currentNum = parseAmount(currentAmount);
          const goalNum = parseAmount(goalAmount);
          const progress = goalNum > 0 ? Math.min((currentNum / goalNum) * 100, 100) : 0;

          return (
            <VStack key={id} spacing={1} opacity={completed ? 1 : 0.4} w="80px" position="relative">
              {hasProgress ? (
                <Box position="relative" w="64px" h="64px">
                  <CircularProgress
                    value={progress}
                    size="64px"
                    thickness="6px"
                    color={completed ? "green.400" : "gray.400"}
                    trackColor={theme.colors.gray[200]}
                    capIsRound
                  />
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    color={completed ? "green.400" : "gray.400"}
                    fontSize="28px"
                    pointerEvents="none"
                  >
                    <Icon as={icon} />
                  </Box>
                </Box>
              ) : (
                <Icon as={icon} boxSize={8} color={completed ? "green.400" : "gray.400"} />
              )}
              <Text fontSize="sm" color={completed ? "green.600" : "gray.600"}>
                {label}
              </Text>
              {hasProgress && (
                <Text fontSize="xs" color="gray.500" userSelect="none">
                  {currentAmount} / {goalAmount}
                </Text>
              )}
            </VStack>
          );
        })}
      </HStack>

      <Text mt={6} textAlign="center" fontWeight="bold" color="primary.700">
        Completed {completedCount} of {habits.length} habits today
      </Text>

      {/* Botón flotante sin afectar layout */}
      <IconButton
        position="absolute"
        bottom={4}
        right={4}
        bg={theme.colors.gray[900]}
        color="white"
        borderRadius="full"
        size="xl"
        w={14}
        h={14}
        boxShadow="md"
        aria-label="Agregar hábito"
        icon={<FaPlus size={28} />}
        _hover={{ bg: theme.colors.gray[800] }}
        zIndex={10}
      />
    </Box>
  );
}
