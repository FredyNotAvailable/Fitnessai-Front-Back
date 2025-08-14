// src/services/userReportService.ts
import axios from "axios";
import { db } from '../config/firebase';
import {
  UserReportData,
  ProfileReport,
  CardioHistoryReport,
  ExerciseHistoryReport,
  RoutineDayReport,
  SleepHistoryReport,
  WaterHistoryReport,
  WeightHistoryReport,
  ExerciseRoutineReport,
  WeekDay
} from '../models/ReportModels';

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = "https://tusitio.com";
const SITE_NAME = "Mi App Fitness";

export async function getUserReportWithAI(userId: string): Promise<UserReportData & { aiSummary: string } | null> {
  try {
    // --- PERFIL ---
    const profileDoc = await db.collection('profiles').doc(userId).get();
    if (!profileDoc.exists) return null;
    const profile: ProfileReport = {
      userId,
      gender: profileDoc.data()?.gender ?? 'Unknown',
      trainingDays: profileDoc.data()?.trainingDays ?? [],
      weight: profileDoc.data()?.weight ?? 0,
      height: profileDoc.data()?.height ?? 0,
      birthdate: profileDoc.data()?.birthdate ?? '',
      goal: profileDoc.data()?.goal ?? 'Unknown',
      experience: profileDoc.data()?.experience ?? 'Unknown'
    };

    // --- CARDIO ---
    const cardioSnap = await db.collection('cardioHistories')
      .where('userId', '==', userId)
      .orderBy('date', 'desc').get();
    const cardioHistory: CardioHistoryReport[] = cardioSnap.docs.map(doc => ({
      id: doc.id,
      userId,
      date: doc.data().date,
      category: doc.data().category,
      duration: doc.data().duration,
      distance: doc.data().distance,
      notes: doc.data().notes ?? ''
    }));

    // --- EJERCICIOS ---
    const exerciseSnap = await db.collection('exerciseHistories')
      .where('userId', '==', userId)
      .orderBy('date', 'desc').get();
    const exerciseHistoryArray: ExerciseHistoryReport[] = exerciseSnap.docs.map(doc => ({
      id: doc.id,
      userId,
      date: doc.data().date,
      sets: doc.data().sets,
      reps: doc.data().reps,
      weight: doc.data().weight,
      baseId: doc.data().exerciseBaseId,
      name: undefined, // se asignará más adelante buscando el nombre real
      notes: doc.data().notes ?? ''
    }));

    // --- RUTINAS ---
    const routineSnap = await db.collection('routineDays')
      .where('userId','==',userId).get();
    const routineDays: RoutineDayReport[] = routineSnap.docs.map(doc => ({
      id: doc.id,
      userId,
      day: doc.data().day as WeekDay,
      exercises: (doc.data().exercises ?? []).map((ex: any) => ({
        exerciseId: ex.exerciseBaseId,
        name: undefined, // se asignará después
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight
      })),
      duration: doc.data().duration ?? 0,
      notes: doc.data().notes ?? ''
    }));

    // --- SUEÑO ---
    const sleepSnap = await db.collection('sleepHistories')
      .where('userId','==',userId)
      .orderBy('date','desc').get();
    const sleepHistory: SleepHistoryReport[] = sleepSnap.docs.map(doc => ({
      id: doc.id,
      userId,
      date: doc.data().date,
      duration: doc.data().duration,
      quality: doc.data().quality,
      notes: doc.data().notes ?? ''
    }));

    // --- AGUA ---
    const waterSnap = await db.collection('waterHistories')
      .where('userId','==',userId)
      .orderBy('date','desc').get();
    const waterHistory: WaterHistoryReport[] = waterSnap.docs.map(doc => ({
      id: doc.id,
      userId,
      date: doc.data().date,
      liters: doc.data().liters,
      notes: doc.data().notes ?? ''
    }));

    // --- PESO ---
    const weightSnap = await db.collection('weightHistories')
      .where('userId','==',userId)
      .orderBy('date','desc').get();
    const weightHistory: WeightHistoryReport[] = weightSnap.docs.map(doc => ({
      id: doc.id,
      userId,
      date: doc.data().date,
      weight: doc.data().weight,
      notes: doc.data().notes ?? ''
    }));

    // --- LOOKUP DE NOMBRES DE EJERCICIOS ---
    const exerciseBaseSnap = await db.collection('exerciseBases').get();
    const exerciseBaseMap: Record<string,string> = {};
    exerciseBaseSnap.docs.forEach(doc => {
      exerciseBaseMap[doc.id] = doc.data().name_es ?? doc.data().name ?? 'Ejercicio registrado';
    });

    // Asignar nombres reales a los ejercicios
    exerciseHistoryArray.forEach(eh => {
      eh.name = eh.baseId && exerciseBaseMap[eh.baseId] ? exerciseBaseMap[eh.baseId] : 'Ejercicio registrado';
    });
    routineDays.forEach(rd => {
      rd.exercises.forEach(ex => {
        ex.name = ex.exerciseId && exerciseBaseMap[ex.exerciseId] ? exerciseBaseMap[ex.exerciseId] : 'Ejercicio registrado';
      });
    });

    // --- CONSTRUIR PROMPT ---
const prompt = `
Eres un entrenador personal experto en análisis de datos de entrenamiento.
Con la siguiente información, genera un **informe técnico en Markdown completamente en español**, profesional, limpio y fácil de interpretar.

# Instrucciones para el Informe

A continuación se detallan las pautas para la generación del informe técnico de entrenamiento:

---

## 1. Estructura del Informe
El informe debe dividirse en las siguientes secciones **claras y visibles**:

- **Perfil**
- **Cardio**
- **Ejercicios**
- **Rutinas**
- **Sueño**
- **Agua**
- **Peso**
- **Conclusiones**
- **Recomendaciones**

---

## 2. Formato de Cabeceras y Nombres
- Todas las **cabeceras**, títulos de secciones y **nombres de ejercicios** deben ir en **negrita**.
- No utilizar comillas en nombres ni encabezados.

---

## 3. Tablas y Columnas
Todas las tablas deben utilizar nombres de columnas **consistentes en español**:

### Cardio
| **Fecha** | **Modalidad** | **Duración (min)** | **Distancia (km)** | **Ritmo medio** | **Observaciones** |

### Ejercicios
| **Fecha** | **Ejercicio** | **Series** | **Repeticiones** | **Peso (kg)** | **Volumen (kg)** |

### Rutinas
| **Ejercicio** | **Series** | **Repeticiones** | **Carga (kg)** | **Sub-total (kg)** |

### Sueño
| **Fecha** | **Duración (h)** | **Calidad** | **Observaciones** |

### Agua
| **Fecha** | **Consumo (L)** | **Observaciones** |

### Peso
| **Fecha** | **Peso (kg)** | **Variación (kg)** |

---

## 4. Idioma
- Todo el contenido debe estar completamente en **español**.

---

## 5. Manejo de IDs
- Nunca mostrar IDs en el informe.
- Si existe un nombre real de ejercicio, **reemplazar el ID por el nombre en español** en **negrita**.
- Si no hay nombre disponible, usar **Ejercicio registrado** como nombre genérico.

---

## 6. Análisis Técnico
- Incluir **métricas**, **tendencias**, **comparaciones históricas** y **volumen total de ejercicios** por grupo muscular.
- Señalar fortalezas, áreas de mejora y riesgos potenciales de manera concisa.

---

## 7. Tono y Presentación
- Mantener un **tono profesional**.
- No usar emojis ni incluir información personal del usuario.
- Mantener **observaciones fuera de las tablas** y usar listas con guiones o viñetas donde sea relevante.
- Para el **Perfil**, también generar cada atributo como lista con guiones.
- Separar secciones con \`---\` y mantener Markdown limpio.

---

**Nota:** Este formato permite que el informe sea visualmente claro, profesional y fácil de interpretar, destacando lo más importante mediante negritas y listas bien organizadas.

---

## Datos del Usuario

- **Perfil**:
\`\`\`json
${(JSON.stringify(profile, null, 2))}
\`\`\`

- **Cardio**:
\`\`\`json
${(JSON.stringify(cardioHistory, null, 2))}
\`\`\`

- **Ejercicios**:
\`\`\`json
${(JSON.stringify(exerciseHistoryArray, null, 2))}
\`\`\`

- **Rutinas**:
\`\`\`json
${(JSON.stringify(routineDays, null, 2))}
\`\`\`

- **Sueño**:
\`\`\`json
${(JSON.stringify(sleepHistory, null, 2))}
\`\`\`

- **Agua**:
\`\`\`json
${(JSON.stringify(waterHistory, null, 2))}
\`\`\`

- **Peso**:
\`\`\`json
${(JSON.stringify(weightHistory, null, 2))}
\`\`\`
`;




    // --- LLAMADA A AI ---
    const aiResponse = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "moonshotai/kimi-k2:free",
        messages: [
          { role: "system", content: "Eres un entrenador personal experto. Solo responde resúmenes motivacionales y consejos de fitness." },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json"
        }
      }
    );

    const aiSummary = aiResponse.data.choices[0].message.content;

    return {
      profile,
      cardioHistory,
      exerciseHistoryArray,
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
