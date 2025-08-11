import { Box, Heading, HStack, useTheme } from "@chakra-ui/react";
import { WaterHabit } from "./WaterHabit";
import { SleepHabit } from "./SleepHabit";
import { CardioHabit } from "./CardioHabit";
import { WeightHabit } from "./WeightHabit";
import { useAuth } from "../../../contexts/AuthContext";

export function Habits() {
  const theme = useTheme();
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>Debes iniciar sesión para ver tus hábitos</div>;

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
      position="relative"
      minH="200"
    >
      <Heading size="lg" mb={4} color="primary.900" textAlign="center">
        Hábitos Diarios
      </Heading>

      <HStack justify="space-around" flexWrap="wrap" spacing={8}>
        <WaterHabit userId={user.uid} goalAmount={2} />
        <SleepHabit userId={user.uid} goalDuration={8} />
        <CardioHabit userId={user.uid} goalDuration={30} />
        <WeightHabit userId={user.uid} /> {/* Solo userId, sin props extras */}
      </HStack>
    </Box>
  );
}
