import { useState } from "react";
import { Box, Heading, Text, Spinner, useTheme, Button } from "@chakra-ui/react";
import { useUserReport } from "../../../hooks/useUserReport";
import { useAuth } from "../../../contexts/AuthContext";
import { UserReportModal } from "./UserReportModal";

export function GenerateReport() {
  const theme = useTheme();
  const { user } = useAuth();
  const userId = user?.uid;

  const [fetchReport, setFetchReport] = useState(false);
  const { report, loading, error } = useUserReport(fetchReport ? userId : undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = () => setFetchReport(true);
  const handleOpen = () => report && setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  if (!userId) {
    return (
      <Box p={6} bg={theme.colors.yellow[50]} rounded="md">
        <Text color={theme.colors.yellow[700]}>Usuario no ha iniciado sesión.</Text>
      </Box>
    );
  }

  return (
    <Box
      p={6}
      bg={theme.colors.gray[50]}
      rounded="md"
      borderWidth="1px"
      borderColor={theme.colors.gray[200]}
    >
      <Heading size="md" mb={4} color={theme.colors.primary?.[700]}>
        Resumen de Usuario
      </Heading>

      {/* Contenedor de botones y spinner */}
      <Box display="flex" alignItems="center" flexWrap="wrap" gap={4} mb={4}>
        <Button colorScheme="blue" onClick={handleGenerate} isDisabled={fetchReport}>
          Generar resumen
        </Button>
        <Button colorScheme="green" onClick={handleOpen} isDisabled={!report}>
          Abrir resumen
        </Button>

        {loading && (
          <Spinner size="lg" color={theme.colors.primary?.[700]} ml="auto" />
        )}
      </Box>

      {error && (
        <Box p={4} bg={theme.colors.red[50]} rounded="md">
          <Heading size="sm" color={theme.colors.red[600]}>
            Error
          </Heading>
          <Text color={theme.colors.red[700]}>{error}</Text>
        </Box>
      )}

      {/* Modal con el reporte */}
      {report && (
        <UserReportModal
          isOpen={isModalOpen}
          onClose={handleClose}
          report={report}
        />
      )}
    </Box>
  );
}
