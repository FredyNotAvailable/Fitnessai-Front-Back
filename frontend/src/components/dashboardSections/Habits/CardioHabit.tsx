import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Icon,
  CircularProgress,
  Spinner,
} from "@chakra-ui/react";
import { FaRunning } from "react-icons/fa";

import { useCardioHistoryByUserAndDate } from "../../../hooks/useCardioHistory";
import { CardioHistoryModal } from "./CardioModal";
import type { CardioHistory } from "../../../models/CardioHistory";

type CardioHabitProps = {
  userId: string;
  goalDuration: number; // en minutos, por ejemplo 30
  today?: string; // ISO date string, opcional para testing o usar fecha actual por defecto
};

export function CardioHabit({ userId, goalDuration, today }: CardioHabitProps) {
  const currentDate = today ?? new Date().toISOString().slice(0, 10);

  const { cardioHistory, loading, error, create, update } =
    useCardioHistoryByUserAndDate(userId, currentDate);

  const [currentDuration, setCurrentDuration] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (cardioHistory) {
      setCurrentDuration(cardioHistory.duration);
      setCompleted(cardioHistory.duration >= goalDuration);
    } else {
      setCurrentDuration(0);
      setCompleted(false);
    }
  }, [cardioHistory, goalDuration]);

  useEffect(() => {
    console.log("CardioHistory:", cardioHistory);
  }, [cardioHistory]);

  function getProgressColor(amount: number) {
    if (amount >= goalDuration) return "green.400";
    if (amount >= goalDuration / 2) return "orange.400";
    return "red.400";
  }

  const progress = Math.min((currentDuration / goalDuration) * 100, 100);
  const progressColor = getProgressColor(currentDuration);

  async function handleSave(
    data: Omit<CardioHistory, "id" | "date" | "category" | "userId">
  ) {
    const fullData: Omit<CardioHistory, "id"> = {
      userId,
      date: currentDate,
      category: cardioHistory?.category ?? "run",
      ...data,
    };

    if (!cardioHistory) {
      await create(fullData);
    } else {
      await update(fullData);
    }
    setModalOpen(false);
  }

  return (
    <>
      <VStack
        spacing={1}
        opacity={completed ? 1 : 0.4}
        w="80px"
        position="relative"
        cursor={loading ? "not-allowed" : "pointer"}
        onClick={() => !loading && setModalOpen(true)}
        userSelect="none"
      >
        <Box position="relative" w="64px" h="64px">
          {loading ? (
            <Spinner size="lg" color={progressColor} />
          ) : (
            <CircularProgress
              value={progress}
              size="64px"
              thickness="6px"
              color={progressColor}
              trackColor="gray.200"
              capIsRound
            />
          )}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color={progressColor}
            fontSize="28px"
            pointerEvents="none"
          >
            <Icon as={FaRunning} />
          </Box>
        </Box>

        <Text fontSize="sm" color={completed ? "green.600" : "gray.600"}>
          Cardio
        </Text>
        <Text fontSize="xs" color="gray.500" userSelect="none">
          {currentDuration}min / {goalDuration}min
        </Text>

        {error && (
          <Text fontSize="xs" color="red.500" userSelect="none">
            {/* {error} */}
          </Text>
        )}
      </VStack>

      <CardioHistoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={{
          duration: cardioHistory?.duration ?? 0,
          distance: cardioHistory?.distance ?? 0,
          notes: cardioHistory?.notes ?? "",
        }}
        onSave={handleSave}
      />
    </>
  );
}
