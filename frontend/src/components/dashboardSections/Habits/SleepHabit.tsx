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
import { FaBed } from "react-icons/fa";
import { useSleepHistoryByUserAndDate } from "../../../hooks/useSleepHistory";
import { SleepModal } from "./SleepModal";
import type { SleepQuality } from "../../../models/SleepHistory";

type SleepHabitProps = {
  userId: string;
  goalDuration?: number; // en horas, por ejemplo 8
};

export function SleepHabit({ userId, goalDuration = 8 }: SleepHabitProps) {
  const theme = useTheme();

  const today = new Date().toISOString().slice(0, 10);

  const { sleepHistory, loading, error, create, update } = useSleepHistoryByUserAndDate(
    userId,
    today
  );

  const [currentDuration, setCurrentDuration] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (sleepHistory) {
      setCurrentDuration(sleepHistory.duration);
      setCompleted(sleepHistory.duration >= goalDuration);
    } else {
      setCurrentDuration(0);
      setCompleted(false);
    }
  }, [sleepHistory, goalDuration]);

  function getSleepColor(duration: number) {
    if (duration >= goalDuration) return theme.colors.status.green;
    if (duration >= goalDuration / 2) return theme.colors.status.orange;
    return theme.colors.status.red;
  }

  const progress = Math.min((currentDuration / goalDuration) * 100, 100);
  const sleepColor = getSleepColor(currentDuration);

  // Aquí especificamos SleepQuality para quality
  async function handleSave(duration: number, quality: SleepQuality, notes: string) {
    if (!sleepHistory) {
      await create({
        userId,
        date: today,
        duration,
        quality,
        notes,
      });
    } else {
      await update({ duration, quality, notes });
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
            <Spinner size="lg" color={sleepColor} />
          ) : (
            <CircularProgress
              value={progress}
              size="64px"
              thickness="6px"
              color={sleepColor}
              trackColor={theme.colors.gray[200]}
              capIsRound
            />
          )}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color={sleepColor}
            fontSize="28px"
            pointerEvents="none"
          >
            <Icon as={FaBed} />
          </Box>
        </Box>
        <Text fontSize="sm" color={sleepColor}>
          Sueño
        </Text>
        <Text fontSize="xs" color="gray.500" userSelect="none">
          {currentDuration.toFixed(1)}h / {goalDuration}h
        </Text>
        {error && (
          <Text fontSize="xs" color="red.500" userSelect="none">
            {/* {error} */}
          </Text>
        )}
      </VStack>

      <SleepModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDuration={currentDuration}
        initialQuality={sleepHistory?.quality ?? 'fair'}
        initialNotes={sleepHistory?.notes ?? ""}
        goalDuration={goalDuration}
        loading={loading}
        onSave={handleSave}
      />
    </>
  );
}
