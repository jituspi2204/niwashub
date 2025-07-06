
export interface LoadingProps {
    loading?: boolean;
    text?: string | undefined;
}

export type LoadingState = {
  loading: boolean;
  message?: string;
  loadingStyle? : 'overlay' | any;
}