export function escapeYamlString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function validateLessonTitle(title: string): string | null {
  const trimmed = title.trim();
  if (!trimmed) return "El título es obligatorio.";
  if (trimmed.length > 200) return "El título no puede superar 200 caracteres.";
  return null;
}
