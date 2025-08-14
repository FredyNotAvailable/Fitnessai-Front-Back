import { useState, useEffect, useCallback } from 'react';
import type { UserReport } from '../models/UserReport';
import { getUserReport } from '../services/userReportService';

/**
 * Hook para obtener el reporte completo de un usuario
 */
export function useUserReport(userId?: string) {
  const [report, setReport] = useState<UserReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReport() {
      if (!userId) {
        if (isMounted) {
          setReport(null);
          setError(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const data = await getUserReport(userId);
        if (isMounted) {
          setReport(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error al obtener el reporte del usuario';
          setError(message);
          setReport(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchReport();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  /**
   * Refrescar manualmente el reporte
   */
  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getUserReport(userId);
      setReport(data);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al obtener el reporte del usuario';
      setError(message);
      setReport(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    report,
    loading,
    error,
    refresh,
  };
}
