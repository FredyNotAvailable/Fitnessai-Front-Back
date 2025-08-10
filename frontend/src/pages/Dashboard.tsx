import { Flex, Box } from '@chakra-ui/react';
// import { Profile } from '../components/dashboardSections/Profile';
import { Progress } from '../components/dashboardSections/Progress';
import { Routine } from '../components/dashboardSections/routine/Routine';
import { Habits } from '../components/dashboardSections/Habits';
import { WeeklyExerciseTracker } from '../components/dashboardSections/WeeklyExerciseTracker';
import { DailyTrainingStatsCard } from '../components/dashboardSections/TrainingStatsCard';
import { TrainingSummaryCard } from '../components/dashboardSections/TrainingSummaryCard';
import { WeeklyRoutineGenerator } from '../components/testing/WeeklyRoutineGenerator';

const Dashboard = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={6}
      p={6}
      w="100%"
      maxW="100%"
      mx="0"
      overflowX="hidden"
      justify="flex-start"
      flexWrap="wrap"
    >
      {/* Columna 1 */}
      <Flex
        direction="column"
        w={{ base: "100%", md: "600px" }}  // ancho completo en móvil, 600px en desktop
        flexShrink={0}                    // evitar que se encoja en desktop
        gap={6}
      >
        {/* <Box>
          <WeeklyRoutineGenerator />
        </Box> */}
        
        <Box>
          <WeeklyExerciseTracker />
        </Box>
        <Box>
          <Habits />
        </Box>
        <Box>
          <DailyTrainingStatsCard />
        </Box>

      </Flex>

      {/* Columna 2 */}
      <Box
        w={{ base: "100%", md: "600px" }}
        flexShrink={0}
      >
        <Routine />
      </Box>

      {/* Columna 3 */}
      <Flex
        direction="column"
        w={{ base: "100%", md: "600px" }}
        flexShrink={0}
        gap={6}
      >
        <Box>
          <Progress />
        </Box>
        <Box>
          <TrainingSummaryCard />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
