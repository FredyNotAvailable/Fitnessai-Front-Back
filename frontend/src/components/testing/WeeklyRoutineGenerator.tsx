import { useEffect, useCallback } from 'react';
import { Button, Box, Text, Spinner } from '@chakra-ui/react';
import { useRoutineDay } from '../../hooks/useRoutineDay';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';

export function WeeklyRoutineGenerator() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const {
    generateWeekly,
    loadByUserId,
    routineDaysByUser,
    loading,
    error,
  } = useRoutineDay();

  // Carga rutinas al cambiar el usuario
  useEffect(() => {
    if (user?.uid) {
      loadByUserId(user.uid);
    }
  }, [user?.uid, loadByUserId]);

  // Memoizamos la función para evitar recreación en cada render
  const handleGenerate = useCallback(async () => {
    if (!user?.uid || !profile) return;
    try {
      await generateWeekly(profile.userId);
      await loadByUserId(user.uid);
    } catch (e) {
      console.error('Error generando rutina semanal:', e);
    }
  }, [user?.uid, profile, generateWeekly, loadByUserId]);

  // Mostrar estados de carga o errores comunes
  if (authLoading || profileLoading) return <Text>Cargando usuario y perfil...</Text>;
  if (!user) return <Text>Por favor inicia sesión para ver y generar rutinas.</Text>;
  if (profileError) return <Text color="red.500">Error al cargar perfil: {profileError}</Text>;
  if (!profile) return <Text>Perfil no encontrado. Por favor crea tu perfil primero.</Text>;

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Button
        onClick={handleGenerate}
        isLoading={loading}
        colorScheme="teal"
        mb={4}
        isDisabled={loading} // evitar clicks mientras carga
      >
        Generar Rutina Semanal
      </Button>

      {error && <Text color="red.500" mb={4}>{error}</Text>}

      {loading && !routineDaysByUser.length && (
        <Spinner size="xl" label="Cargando..." mb={4} />
      )}

      {/* {!loading && routineDaysByUser.length > 0 ? (
        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="sm"
          overflowX="auto"
          whiteSpace="pre-wrap"
          fontFamily="monospace"
          fontSize="sm"
        >
          <pre>{JSON.stringify(routineDaysByUser, null, 2)}</pre>
        </Box>
      ) : (
        !loading && (
          <Text>No hay rutinas generadas aún para este usuario.</Text>
        )
      )} */}
    </Box>
  );
}
