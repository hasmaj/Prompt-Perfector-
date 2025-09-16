
export type SuggestionCategory = 'Clarity' | 'Specificity' | 'Persona' | 'Format' | 'Constraint' | 'Ambiguity';

export interface PromptSuggestion {
  title: string;
  description: string;
  category: SuggestionCategory;
}

export interface PromptAnalysis {
  taskType: string;
  coreObjective: string;
  suggestions: PromptSuggestion[];
  overallScore: number;
  feedback: string;
}
