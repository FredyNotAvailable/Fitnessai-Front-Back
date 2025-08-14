export type UserReport = {
  profile: {
    userId: string;
    gender: string;
    birthdate: string;
    height: number;
    goal: string;
    experience: string;
    trainingDays: string[];
    weight: number;
  };
  cardioHistory: {
    id: string;
    date: string;
    category: string;
    distance: number;
    duration: number;
  }[];
  exerciseHistory: Record<
    string,
    {
      id: string;
      exerciseBaseId: string;
      sets: number;
      reps: number;
      weight: number;
    }[]
  >;
  routineDays: {
    id: string;
    day: string;
    notes: string;
    exercises: {
      exerciseBaseId: string;
      sets: number;
      reps: number;
      weight: number;
    }[];
    categories: string[];
  }[];
  sleepHistory: {
    id: string;
    date: string;
    duration: number;
    quality: string;
  }[];
  waterHistory: {
    id: string;
    date: string;
    liters: number;
  }[];
  weightHistory: {
    id: string;
    date: string;
    weight: number | string;
  }[];
  aiSummary: string;
};
