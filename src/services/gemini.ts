import { GoogleGenAI } from "@google/genai";
import { LessonPlan, Quiz, Feedback } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateLessonPlan = async (topic: string, gradeLevel: string): Promise<LessonPlan> => {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `Genera un plan de lección detallado para el tema "${topic}" para el nivel "${gradeLevel}". 
    Responde estrictamente en formato JSON con la siguiente estructura:
    {
      "title": "Título de la lección",
      "objective": "Objetivo de aprendizaje",
      "duration": "Duración estimada",
      "materials": ["Material 1", "Material 2"],
      "activities": [{"time": "10 min", "description": "Introducción..."}],
      "assessment": "Método de evaluación"
    }`,
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text.replace(/```json|```/g, ""));
};

export const generateQuiz = async (topic: string, numQuestions: number): Promise<Quiz> => {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `Genera un cuestionario de ${numQuestions} preguntas sobre "${topic}".
    Responde estrictamente en formato JSON con la siguiente estructura:
    {
      "title": "Título del Cuestionario",
      "questions": [
        {
          "question": "La pregunta",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "La opción correcta",
          "explanation": "Breve explicación"
        }
      ]
    }`,
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text.replace(/```json|```/g, ""));
};

export const generateFeedback = async (studentWork: string, criteria: string): Promise<Feedback> => {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `Evalúa el siguiente trabajo de un estudiante basado en estos criterios: "${criteria}".
    Trabajo del estudiante: "${studentWork}"
    
    Responde estrictamente en formato JSON con la siguiente estructura:
    {
      "score": "Calificación sugerida (ej. 8/10)",
      "strengths": ["Fortaleza 1", "Fortaleza 2"],
      "areasForImprovement": ["Área 1", "Área 2"],
      "personalizedComment": "Un comentario motivador y constructivo para el alumno"
    }`,
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text.replace(/```json|```/g, ""));
};
