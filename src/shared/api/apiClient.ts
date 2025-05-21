const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = {
  get: async (url: string) => {
    try {
      const response = await fetch(`${API_URL}/api${url}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API ошибка:", response.status, errorText);
        return null;
      }

      const text = await response.text();
      if (!text) {
        return null;
      }

      return JSON.parse(text);
    } catch (error) {
      console.error("Ошибка apiClient.get:", error);
      return null;
    }
  },

  post: async (url: string, body: Record<string, unknown>) => {
    try {
      const response = await fetch(`${API_URL}/api${url}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("POST ошибка:", response.status, errorText);
        throw new Error("Ошибка запроса");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
