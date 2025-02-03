export const apiClient = async (url: string, options?: RequestInit) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/api${url}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Произошла ошибка");
    }

    return response.json();
  } catch (error: unknown) {
    throw error;
  }
};
