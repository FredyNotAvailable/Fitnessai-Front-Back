// src/services/userReportService.ts
import axios from "axios";
import { db } from '../config/firebase';
import { UserReport, ExerciseHistoryByDate } from '../models/UserReport';
import { Profile } from '../models/Profile';
import { CardioHistory } from '../models/CardioHistory';
import { ExerciseHistory } from '../models/ExerciseHistory';
import { RoutineDay } from '../models/RoutineDay';
import { SleepHistory } from '../models/SleepHistory';
import { WaterHistory } from '../models/WaterHistory';
import { WeightHistory } from '../models/WeightHistory';

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function getUserReportWithAI(userId: string): Promise<UserReport & { aiSummary: string } | null> {
  try {
    // --- Obtener datos desde Firestore ---
    const profileDoc = await db.collection('profiles').doc(userId).get();
    if (!profileDoc.exists) return null;
    const profile = profileDoc.data() as Profile;

    const cardioSnap = await db.collection('cardioHistories')
      .where('userId', '==', userId)
      .orderBy('date', 'desc')
      .get();
    const cardioHistory: CardioHistory[] = cardioSnap.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<CardioHistory,'id'>) }));

    const exerciseSnap = await db.collection('exerciseHistories')
      .where('userId', '==', userId)
      .orderBy('date', 'desc')
      .get();
    const exerciseHistoryArray: ExerciseHistory[] = exerciseSnap.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<ExerciseHistory,'id'>) }));
    const exerciseHistory: ExerciseHistoryByDate = exerciseHistoryArray.reduce((acc, eh) => {
      if (!acc[eh.date]) acc[eh.date] = [];
      acc[eh.date].push(eh);
      return acc;
    }, {} as ExerciseHistoryByDate);

    const routineSnap = await db.collection('routineDays')
      .where('userId','==',userId).get();
    const routineDays: RoutineDay[] = routineSnap.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<RoutineDay,'id'>) }));

    const sleepSnap = await db.collection('sleepHistories')
      .where('userId','==',userId)
      .orderBy('date','desc').get();
    const sleepHistory: SleepHistory[] = sleepSnap.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<SleepHistory,'id'>) }));

    const waterSnap = await db.collection('waterHistories')
      .where('userId','==',userId)
      .orderBy('date','desc').get();
    const waterHistory: WaterHistory[] = waterSnap.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<WaterHistory,'id'>) }));

    const weightSnap = await db.collection('weightHistories')
      .where('userId','==',userId)
      .orderBy('date','desc').get();
    const weightHistory: WeightHistory[] = weightSnap.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<WeightHistory,'id'>) }));

    // --- Generar resumen AI completo ---
const prompt = `
Eres un entrenador personal experto en análisis de datos de entrenamiento. 
Con la siguiente información, genera un **informe técnico en Markdown completamente en español**, profesional y fácil de interpretar.

Requisitos del informe:
1. Divide el informe en secciones claras: **Perfil**, **Cardio**, **Ejercicios**, **Rutinas**, **Sueño**, **Agua**, **Peso**, **Conclusiones** y **Recomendaciones**.
2. Todas las cabeceras y títulos de secciones, así como los nombres de ejercicios, deben ir en **negrita** sin comillas.
3. Incluye análisis técnico con métricas, tendencias, comparaciones históricas y volumen total de ejercicios.
4. Señala fortalezas, áreas de mejora y riesgos potenciales de forma concisa.
5. Utiliza **tablas Markdown estándar** para todos los datos cuantitativos (Cardio, Ejercicios, Sueño, Agua, Peso).
6. Mantén un tono profesional y basado en datos, sin emojis, stickers ni información personal del usuario.
7. Resalta solo con negrita o itálicas los datos importantes como pesos, objetivos o métricas clave.
8. Genera listas con guiones o viñetas donde sea relevante.
9. Si algún ejercicio tiene un ID interno (como baseId u otro hash):
   - Busca en los demás registros o datos proporcionados si ese ID tiene un nombre asociado.
   - Si se encuentra, reemplázalo por el nombre real del ejercicio en español.
   - Si no hay nombre disponible, usa un nombre descriptivo en español como **Ejercicio registrado**.
   - Nunca dejes solo el ID.
10. Evita cualquier ID o hash en el Markdown final.
11. Mantén Markdown limpio y profesional, con separadores '---' entre secciones y observaciones fuera de las tablas.
12. Todo el contenido debe estar completamente en español, incluyendo títulos de columnas de tablas y observaciones -> TODO.

Datos del usuario:
- Perfil: ${JSON.stringify(profile, null, 2)}
- Cardio: ${JSON.stringify(cardioHistory, null, 2)}
- Ejercicios: ${JSON.stringify(exerciseHistoryArray, null, 2)}
- Rutinas: ${JSON.stringify(routineDays, null, 2)}
- Sueño: ${JSON.stringify(sleepHistory, null, 2)}
- Agua: ${JSON.stringify(waterHistory, null, 2)}
- Peso: ${JSON.stringify(weightHistory, null, 2)}
`;

    const aiResponse = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Eres un entrenador personal experto. Solo responde resúmenes motivacionales y consejos de fitness." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`
        }
      }
    );

    const aiSummary = aiResponse.data.choices[0].message.content;

    return {
      profile,
      cardioHistory,
      exerciseHistory,
      routineDays,
      sleepHistory,
      waterHistory,
      weightHistory,
      aiSummary
    };

  } catch (error) {
    console.error("Error fetching user report with AI:", error);
    return null;
  }
}
