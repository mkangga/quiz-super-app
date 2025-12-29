import { Quiz } from "../types";

// Service AI dinonaktifkan sesuai permintaan
// File ini disisakan agar tidak terjadi error pada import di file lain (jika ada)

export const generateQuizByTopic = async (topic: string): Promise<Quiz> => {
  console.warn("Fitur AI telah dinonaktifkan.");
  throw new Error("Fitur pembuatan kuis dengan AI tidak tersedia di versi ini.");
};