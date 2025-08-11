import { Box, Heading, Text, useTheme } from "@chakra-ui/react";

export function MotivationalMessageCard() {
  const theme = useTheme();

  return (
    <Box
      bg={theme.colors.gray[50]}
      p={6}
      rounded="md"
      borderWidth="1px"
      borderColor={theme.colors.gray[200]}
      height="100%"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading size="md" mb={2} color={theme.colors.primary?.[700]}>
        Stay Focused & Keep Growing
      </Heading>

      <Text fontSize="sm" fontWeight="semibold" mb={4} color={theme.colors.gray[600]}>
        Your progress is the result of consistent effort and dedication.
      </Text>

      <Text fontSize="md" color={theme.colors.gray[700]} lineHeight="tall">
        Remember, every workout, every healthy meal, and every rest day contributes to a stronger, healthier you. Keep pushing forward and trust the process — success is closer than you think.
      </Text>
    </Box>
  );
}
