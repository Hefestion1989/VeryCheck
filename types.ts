export interface FactCheckCitation {
  titulo?: string;
  url: string;
}

export interface FactCheckResult {
  veredicto: "verdadero" | "falso" | "engañoso" | "indeterminado";
  confianza: number; // 0..1
  explicacion: string;
  citas: FactCheckCitation[];
  claim_normalizado: string;
}
