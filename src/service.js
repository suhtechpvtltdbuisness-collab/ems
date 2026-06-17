const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL ||
  import.meta.env.VITE_BASE_URL ||
  "https://hrms-orga-backend.vercel.app";

const ADMIN_SITE_URL =
  import.meta.env.VITE_ADMIN_SITE_URL || "https://admin.suhtech.store";

const persistUserSession = (user, tokens) => {
  if (tokens?.accessToken) {
    localStorage.setItem("authToken", tokens.accessToken);
  }
  if (tokens?.refreshToken) {
    localStorage.setItem("refreshToken", tokens.refreshToken);
  }
  if (user) {
    localStorage.setItem("userData", JSON.stringify(user));
  }
  localStorage.setItem("isLoggedIn", "true");
};

const clearUserSession = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userData");
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const apiFetch = (url, options = {}) =>
  fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

export const authService = {
  register: async (userData) => {
    try {
      const response = await apiFetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }

      persistUserSession(data.data?.user, data.data?.tokens);
      localStorage.setItem("isRegistered", "true");

      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },

  login: async (userData) => {
    try {
      const response = await apiFetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Login failed",
        };
      }

      persistUserSession(data.data?.user, data.data?.tokens);
      localStorage.setItem("isRegistered", "true");

      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },

  logout: async () => {
    try {
      await apiFetch(`${BASE_URL}/auth/logout`, { method: "POST" });
    } catch {
      // clear local session even if API call fails
    }
    clearUserSession();
    return { success: true, message: "Logout successful" };
  },

  getProfile: async () => {
    try {
      const response = await apiFetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
      });
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Not authenticated",
        };
      }

      if (data.data?.user) {
        localStorage.setItem("userData", JSON.stringify(data.data.user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isRegistered", "true");
      }

      return {
        success: true,
        data: data.data,
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },

  hasActiveSubscription: (plan) => {
    if (!plan) return false;
    if (!plan.active) return false;
    if (!plan.expired) return true;
    return new Date(plan.expired) > new Date();
  },

  redirectToAdminIfSubscribed: async () => {
    const profile = await authService.getProfile();
    if (
      profile.success &&
      authService.hasActiveSubscription(profile.data?.plan)
    ) {
      window.location.href = ADMIN_SITE_URL;
      return true;
    }
    return false;
  },

  redirectToAdmin: () => {
    window.location.href = ADMIN_SITE_URL;
  },

  getAdminSiteUrl: () => ADMIN_SITE_URL,
};
