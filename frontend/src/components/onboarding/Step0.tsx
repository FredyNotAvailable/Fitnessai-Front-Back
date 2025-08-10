// Step0.tsx
import { Box, Input, FormControl, FormLabel, Stack } from '@chakra-ui/react';

type Step0Props = {
  data: { fullname: string; email: string; password: string };
  update: (fields: Partial<{ fullname: string; email: string; password: string }>) => void;
};

export function Step0({ data, update }: Step0Props) {
  return (
    <Box w="full" maxW="sm">
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Nombre completo</FormLabel>
          <Input
            placeholder="Escribe tu nombre"
            value={data.fullname || ''}
            onChange={(e) => update({ fullname: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Escribe tu email"
            value={data.email || ''}
            onChange={(e) => update({ email: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            placeholder="Escribe tu contraseña"
            value={data.password || ''}
            onChange={(e) => update({ password: e.target.value })}
          />
        </FormControl>
      </Stack>
    </Box>
  );
}
