import { Box, Text, Progress } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export function Step7() {
  const [progress, setProgress] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return old + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isComplete]);

  return (
    <Box
      w="full"
      maxW="sm"
      h="100%"
      mx="auto"
      px={6}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
    >
      {!isComplete ? (
        <>
          <Text fontSize="3xl" fontWeight="bold" color="primary.900" mb={2}>
            {progress}%
          </Text>

          <Text fontSize="2xl" fontWeight="semibold" color="primary.900" mb={4}>
            Estamos configurando todo para usted
          </Text>

          <Progress
            value={progress}
            size="sm"
            rounded="md"
            mb={4}
            bg="gray.200"
            sx={{
              '& > div': { bg: 'black' },
            }}
          />

          <Text fontSize="md" color="gray.700">
            Construyendo su plan Fitness...
          </Text>
        </>
      ) : (
        <Box
          bg="white"
          p={6}
          rounded="md"
          shadow="md"
          maxW="md"
          mx="auto"
          textAlign="center"
        >
          <Text fontSize="3xl" fontWeight="bold" color="primary.900" mb={4}>
            ¡Felicidades! Tu plan personalizado está listo
          </Text>
          <Text fontSize="md" color="gray.700">
            Aquí puedes mostrar información adicional sobre el plan, consejos o
            cualquier dato relevante para el usuario.
          </Text>
        </Box>
      )}
    </Box>
  );
}
