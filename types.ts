export enum Verdict {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  UNCERTAIN = 'UNCERTAIN',
  MISLEADING = 'MISLEADING',
}

export interface Source {
  title: string;
  uri: string;
}

export interface FactCheckResult {
  verdict: Verdict;
  explanation: string;
  sources: Source[];
  percentage: number;
}
