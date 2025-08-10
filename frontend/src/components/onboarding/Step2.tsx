import { Box, Button, Text, Flex } from '@chakra-ui/react';

type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// Mapeo días inglés => español para UI
const diasMap: Record<WeekDay, string> = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
};

interface Step2Props {
  data: {
    trainingDays: WeekDay[];
  };
  update: (fields: Partial<any>) => void;
}

export function Step2({ data, update }: Step2Props) {
  const isSelected = (dia: WeekDay) => data.trainingDays.includes(dia);

  const toggleDay = (dia: WeekDay) => {
    if (isSelected(dia)) {
      update({ trainingDays: data.trainingDays.filter(d => d !== dia) });
    } else {
      update({ trainingDays: [...data.trainingDays, dia] });
    }
  };

  return (
    <Box
      bg="white"
      p={6}
      rounded="md"
      shadow="md"
      maxW="lg"
      w="full"
      maxH="400px"         // max height fijo
      display="flex"
      flexDirection="column"
    >
      {/* Título y subtítulo */}
      <Box mb={4}>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="primary.900"
          textAlign="center"
          mb={1}
        >
          ¿Cuántos días entrenas por semana?
        </Text>
        <Text fontSize="md" color="gray.600" textAlign="center">
          Esto se usará para calibrar tu plan personalizado
        </Text>
      </Box>

      {/* Contenedor de botones sin crecer forzado, solo scroll si sobrepasa */}
      <Flex
        wrap="wrap"
        justify="center"
        gap={2}
        overflowY="auto"
        maxH="250px"         // máximo para scroll
        minHeight="auto"     // que tome la altura natural mínima
      >
        {(Object.keys(diasMap) as WeekDay[]).map(dia => (
          <Button
            key={dia}
            onClick={() => toggleDay(dia)}
            bg={isSelected(dia) ? 'primary.900' : 'white'}
            color={isSelected(dia) ? 'white' : 'black'}
            border="1px solid"
            borderColor={isSelected(dia) ? 'primary.900' : 'gray.400'}
            _hover={{
              bg: isSelected(dia) ? 'primary.800' : 'gray.100',
            }}
            flex={{ base: '0 0 48%', md: '0 0 31%' }} // 2 por fila móvil, 3 en desktop
            minW="0"
          >
            {diasMap[dia]}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
