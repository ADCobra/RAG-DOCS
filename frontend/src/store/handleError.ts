import { isAxiosError } from "axios";

const handleError = (error: unknown) => {
  if (isAxiosError(error)) {
    throw error.response?.data?.message || "An unexpected error occurred";
  }
  throw error instanceof Error ? error.message : "An unexpected error occurred";
}

export default handleError;