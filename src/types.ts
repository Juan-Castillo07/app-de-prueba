export interface LessonPlan {
  title: string;
  objective: string;
  duration: string;
  materials: string[];
  activities: {
    time: string;
    description: string;
  }[];
  assessment: string;
}

export interface Quiz {
  title: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface Feedback {
  score: string;
  strengths: string[];
  areasForImprovement: string[];
  personalizedComment: string;
}

export type View = 'dashboard' | 'lesson-planner' | 'quiz-generator' | 'grading' | 'students';
