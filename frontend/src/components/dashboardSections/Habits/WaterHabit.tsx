import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Icon,
  CircularProgress,
  Spinner,
  useTheme,
} from "@chakra-ui/react";
import { FaTint } from "react-icons/fa";
import { useWaterHistory } from "../../../hooks/useWaterHistory";
import { WaterModal } from "./WaterModal";

type WaterHabitProps = {
  userId: string;
  goalAmount?: number; // litros, default 2
};

export function WaterHabit({ userId, goalAmount = 2 }: WaterHabitProps) {
  const theme = useTheme();

  // Obtener la fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().slice(0, 10);

  // Aquí uso el hook pasando userId y la fecha (no id)
  const { waterHistory, loading, error, create, update } = useWaterHistory(
    undefined,
    userId,
    today
  );

  const [currentLiters, setCurrentLiters] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (waterHistory) {
      setCurrentLiters(waterHistory.liters);
      setCompleted(waterHistory.liters >= goalAmount);
    } else {
      setCurrentLiters(0);
      setCompleted(false);
    }
  }, [waterHistory, goalAmount]);

  function getWaterColor(amount: number) {
    if (amount >= goalAmount) return theme.colors.status.green;
    if (amount >= goalAmount / 2) return theme.colors.status.orange;
    return theme.colors.status.red;
  }

  const progress = Math.min((currentLiters / goalAmount) * 100, 100);
  const waterColor = getWaterColor(currentLiters);

  async function handleSave(liters: number, notes: string) {
    if (!waterHistory) {
      // Aquí asegúrate de pasar la fecha correcta también al crear
      await create({
        userId,
        date: today,
        liters,
        notes,
      });
    } else {
      await update({ liters, notes });
    }
  }

  return (
    <>
      <VStack
        spacing={1}
        opacity={completed ? 1 : 0.7}
        w="80px"
        position="relative"
        cursor={loading ? "not-allowed" : "pointer"}
        onClick={() => !loading && setIsModalOpen(true)}
        userSelect="none"
      >
        <Box position="relative" w="64px" h="64px">
          {loading ? (
            <Spinner size="lg" color={waterColor} />
          ) : (
            <CircularProgress
              value={progress}
              size="64px"
              thickness="6px"
              color={waterColor}
              trackColor={theme.colors.gray[200]}
              capIsRound
            />
          )}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color={waterColor}
            fontSize="28px"
            pointerEvents="none"
          >
            <Icon as={FaTint} />
          </Box>
        </Box>
        <Text fontSize="sm" color={waterColor}>
          Agua
        </Text>
        <Text fontSize="xs" color="gray.500" userSelect="none">
          {currentLiters}L / {goalAmount}L
        </Text>
        {error && (
          <Text fontSize="xs" color="red.500" userSelect="none">
            {/* {error} */}
          </Text>
        )}
      </VStack>

      <WaterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialLiters={currentLiters}
        initialNotes={waterHistory?.notes ?? ""}
        goalAmount={goalAmount}
        loading={loading}
        onSave={handleSave}
      />
    </>
  );
}
