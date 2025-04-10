import { style_1, style_2, style_3 } from "../constants/cv-templates";

export const templateStyles = {
  'style_1': style_1,
  'style_2': style_2,
  'style_3': style_3,
} as const;

export const templateStyleByIndex: Record<number, string> = {
  1: 'style_1',
  2: 'style_2',
  3: 'style_3',
  4: 'style_1',
};

export type TemplateType = keyof typeof templateStyles;
