import { formatInr } from "./config/subscriptionPlans.js";
import { trackEvent } from "./utils/analytics.js";

const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL ||
  import.meta.env.VITE_BASE_URL ||
  "https://hrms-orga-backend.vercel.app";

const ADMIN_SITE_URL =
  import.meta.env.VITE_ADMIN_SITE_URL || "https://admin.suhtech.store";

const persistUserSession = (user, tokens, subscription) => {
  if (tokens?.accessToken) {
    localStorage.setItem("authToken", tokens.accessToken);
  }
  if (tokens?.refreshToken) {
    localStorage.setItem("refreshToken", tokens.refreshToken);
  }
  if (user) {
    localStorage.setItem("userData", JSON.stringify(user));
  }
  if (subscription) {
    localStorage.setItem("subscription", JSON.stringify(subscription));
  }
  localStorage.setItem("isLoggedIn", "true");
};

const clearUserSession = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userData");
  localStorage.removeItem("subscription");
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const hasSessionHint = () =>
  Boolean(
    localStorage.getItem("authToken") ||
      localStorage.getItem("refreshToken") ||
      localStorage.getItem("isLoggedIn") === "true",
  );

const refreshAccessToken = async () => {
  try {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        storedRefreshToken ? { refreshToken: storedRefreshToken } : {},
      ),
    });
    const data = await response.json();
    if (!response.ok) return false;
    persistUserSession(null, data.data?.tokens, null);
    return true;
  } catch {
    return false;
  }
};

const apiFetch = async (url, options = {}, retryOn401 = true) => {
  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (
    response.status === 401 &&
    retryOn401 &&
    !String(url).includes("/auth/refresh-token") &&
    !String(url).includes("/auth/login") &&
    !String(url).includes("/auth/register")
  ) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch(url, options, false);
    }
  }

  return response;
};

export const authService = {
  hasSessionHint,

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

      localStorage.setItem("isRegistered", "true");
      trackEvent("sign_up", { method: "email" });

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

  verifyEmail: async (token) => {
    try {
      const response = await apiFetch(`${BASE_URL}/auth/verify-email?token=${token}`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Email verification failed",
        };
      }
      return {
        success: true,
        message: data.message,
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }
  },

  resendVerification: async (email) => {
    try {
      const response = await apiFetch(`${BASE_URL}/auth/resend-verification`, {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to resend verification email",
        };
      }
      return {
        success: true,
        message: data.message,
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }
  },

  verifyOtp: async (payload) => {
    try {
      const response = await apiFetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data.message || "OTP verification failed",
        };
      }

      persistUserSession(
        data.data?.user,
        data.data?.tokens,
        data.data?.subscription,
      );
      localStorage.setItem("isRegistered", "true");

      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }
  },

  resendOtp: async (email) => {
    try {
      const response = await apiFetch(`${BASE_URL}/auth/resend-otp`, {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to resend verification OTP",
        };
      }
      return {
        success: true,
        message: data.message,
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
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

      persistUserSession(
        data.data?.user,
        data.data?.tokens,
        data.data?.subscription,
      );
      localStorage.setItem("isRegistered", "true");
      trackEvent("login", { method: "email" });

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

  googleLogin: async (token) => {
    try {
      const response = await apiFetch(`${BASE_URL}/auth/google`, {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Google Login failed",
        };
      }

      persistUserSession(
        data.data?.user,
        data.data?.tokens,
        data.data?.subscription,
      );
      localStorage.setItem("isRegistered", "true");
      trackEvent("google_login", { method: "google" });

      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong during Google Login",
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
    if (!hasSessionHint()) {
      return { success: false, message: "Not authenticated" };
    }

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
      if (data.data?.subscription) {
        localStorage.setItem(
          "subscription",
          JSON.stringify(data.data.subscription),
        );
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

  isSubscribed: (subscription) => subscription?.isSubscribed === true,

  hasActiveSubscription: (subscriptionOrPlan) => {
    if (subscriptionOrPlan?.isSubscribed !== undefined) {
      return subscriptionOrPlan.isSubscribed === true;
    }
    const plan = subscriptionOrPlan;
    if (!plan) return false;
    if (!plan.active) return false;
    if (!plan.expired) return true;
    return new Date(plan.expired) > new Date();
  },

  handlePostAuthRedirect: (subscription, navigate) => {
    const userDataStr = localStorage.getItem("userData");
    let user = null;
    if (userDataStr) {
      try {
        user = JSON.parse(userDataStr);
      } catch {
        // Ignore malformed cached user data.
      }
    }

    if (user && !user.onboardingCompleted) {
      if (navigate) {
        navigate("/onboarding");
      } else {
        window.location.href = "/onboarding";
      }
      return false;
    }

    if (authService.isSubscribed(subscription)) {
      authService.redirectToAdmin();
      return true;
    }
    if (navigate) {
      navigate("/pricing");
    } else {
      window.location.href = "/pricing";
    }
    return false;
  },

  redirectToAdminIfSubscribed: async () => {
    const profile = await authService.getProfile();
    if (
      profile.success &&
      authService.isSubscribed(profile.data?.subscription)
    ) {
      authService.redirectToAdmin();
      return true;
    }
    return false;
  },

  buildAdminSsoUrl: () => {
    const accessToken = localStorage.getItem("authToken");
    if (!accessToken) {
      return ADMIN_SITE_URL;
    }

    const params = new URLSearchParams();
    params.set("accessToken", accessToken);

    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      params.set("refreshToken", refreshToken);
    }

    const userData = localStorage.getItem("userData");
    if (userData) {
      params.set("userData", encodeURIComponent(userData));
    }

    const subscription = localStorage.getItem("subscription");
    if (subscription) {
      params.set("subscription", encodeURIComponent(subscription));
    }

    return `${ADMIN_SITE_URL}/auth/sso#${params.toString()}`;
  },

  redirectToAdmin: () => {
    window.location.href = authService.buildAdminSsoUrl();
  },

  getAdminSiteUrl: () => ADMIN_SITE_URL,
};

const loadRazorpayScript = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });

export const subscriptionService = {
  getPlans: async () => {
    try {
      const response = await apiFetch(`${BASE_URL}/subscriptions/plans`);
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch plans" };
      }
      return { success: true, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },

  getCurrent: async () => {
    try {
      const response = await apiFetch(`${BASE_URL}/subscriptions/current`);
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch subscription" };
      }
      return { success: true, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },

  activateFreeTrial: async () => {
    try {
      const response = await apiFetch(`${BASE_URL}/subscriptions/free-trial`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to start free trial",
        };
      }
      return { success: true, message: data.message, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },

  verifyTrial: async (payload) => {
    try {
      const response = await apiFetch(`${BASE_URL}/subscriptions/verify-trial`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Trial verification failed",
        };
      }
      if (data.data?.subscription) {
        localStorage.setItem(
          "subscription",
          JSON.stringify(data.data.subscription),
        );
      }
      return { success: true, message: data.message, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },

  createOrder: async (planType) => {
    try {
      const response = await apiFetch(`${BASE_URL}/subscriptions/create-order`, {
        method: "POST",
        body: JSON.stringify({ planType }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to create order" };
      }
      return { success: true, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },

  createAddonOrder: async (itemType, quantity = 1) => {
    try {
      const response = await apiFetch(`${BASE_URL}/subscriptions/create-addon-order`, {
        method: "POST",
        body: JSON.stringify({ itemType, quantity }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to create add-on order" };
      }
      return { success: true, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },

  verifyPayment: async (payload) => {
    try {
      const response = await apiFetch(`${BASE_URL}/subscriptions/verify-payment`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Payment verification failed" };
      }
      if (data.data?.subscription) {
        localStorage.setItem(
          "subscription",
          JSON.stringify(data.data.subscription),
        );
      }
      return { success: true, message: data.message, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },

  verifyAddonPayment: async (payload) => {
    try {
      const response = await apiFetch(`${BASE_URL}/subscriptions/verify-addon-payment`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Add-on payment verification failed" };
      }
      if (data.data?.plan) {
        const existing = JSON.parse(localStorage.getItem("subscription") || "{}");
        localStorage.setItem(
          "subscription",
          JSON.stringify({
            ...existing,
            isSubscribed: true,
            plan: data.data.plan,
          }),
        );
      }
      return { success: true, message: data.message, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },

  openSubscriptionCheckout: async (checkoutData, user) => {
    const planName = checkoutData.planName || "Free Trial";
    const amount = Number(checkoutData.amountInr ?? 0);

    try {
      await loadRazorpayScript();

      return await new Promise((resolve) => {
        let settled = false;
        const finish = (result) => {
          if (settled) return;
          settled = true;
          resolve(result);
        };
        const fail = (reason) => {
          if (settled) return;
          trackEvent("subscription_failed", { plan_name: planName, reason });
          finish({ success: false, message: reason });
        };
        const options = {
          key: checkoutData.keyId,
          subscription_id: checkoutData.subscriptionId,
          name: "Suhtech ORGA",
          description: `${checkoutData.trialDays}-day free trial, then ${formatInr(checkoutData.autoPayAmount)}/month`,
          handler: async (response) => {
            const result = await subscriptionService.verifyTrial({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySubscriptionId: response.razorpay_subscription_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (result.success) {
              trackEvent("free_trial_started", {
                trial_days: Number(checkoutData.trialDays || 7),
              });
              finish(result);
              return;
            }

            fail(result.message || "Trial verification failed");
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
          },
          theme: { color: "#756FCC" },
          modal: {
            ondismiss: () =>
              finish({ success: false, message: "Payment cancelled" }),
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on?.("payment.failed", (response) => {
          fail(
            response?.error?.description ||
              response?.error?.reason ||
              "Razorpay payment failed",
          );
        });

        trackEvent("plan_selected", {
          plan_name: planName,
          organization_type: checkoutData.organizationType || "unknown",
          amount,
        });
        trackEvent("subscription_started", {
          plan_name: planName,
          amount,
          currency: "INR",
        });
        rzp.open();
      });
    } catch (error) {
      const reason = error?.message || "Failed to open Razorpay checkout";
      trackEvent("subscription_failed", { plan_name: planName, reason });
      return { success: false, message: reason };
    }
  },

  openCheckout: async (orderData, user, analyticsData = {}) => {
    const planName =
      analyticsData.planName || orderData.planName || orderData.planType;
    const amount = Number(analyticsData.amount ?? 0);

    try {
      await loadRazorpayScript();

      return await new Promise((resolve) => {
        let settled = false;
        const finish = (result) => {
          if (settled) return;
          settled = true;
          resolve(result);
        };
        const fail = (reason) => {
          if (settled) return;
          trackEvent("subscription_failed", { plan_name: planName, reason });
          finish({ success: false, message: reason });
        };
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Suhtech ORGA",
          description: orderData.planName,
          order_id: orderData.orderId,
          handler: async (response) => {
            const result = await subscriptionService.verifyPayment({
              planType: orderData.planType,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (result.success) {
              trackEvent("purchase", {
                transaction_id: response.razorpay_payment_id,
                value: amount,
                currency: "INR",
                plan_name: planName,
              });
              finish(result);
              return;
            }

            fail(result.message || "Payment verification failed");
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
          },
          theme: { color: "#756FCC" },
          modal: {
            ondismiss: () =>
              finish({ success: false, message: "Payment cancelled" }),
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on?.("payment.failed", (response) => {
          fail(
            response?.error?.description ||
              response?.error?.reason ||
              "Razorpay payment failed",
          );
        });

        trackEvent("plan_selected", {
          plan_name: planName,
          organization_type: analyticsData.organizationType || "unknown",
          amount,
        });
        trackEvent("subscription_started", {
          plan_name: planName,
          amount,
          currency: "INR",
        });
        rzp.open();
      });
    } catch (error) {
      const reason = error?.message || "Failed to open Razorpay checkout";
      trackEvent("subscription_failed", { plan_name: planName, reason });
      return { success: false, message: reason };
    }
  },

  openAddonCheckout: async (orderData, user, analyticsData = {}) => {
    const planName =
      analyticsData.planName || orderData.planName || orderData.itemType;
    const amount = Number(analyticsData.amount ?? 0);

    try {
      await loadRazorpayScript();

      return await new Promise((resolve) => {
        let settled = false;
        const finish = (result) => {
          if (settled) return;
          settled = true;
          resolve(result);
        };
        const fail = (reason) => {
          if (settled) return;
          trackEvent("subscription_failed", { plan_name: planName, reason });
          finish({ success: false, message: reason });
        };

        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Suhtech ORGA",
          description: orderData.planName,
          order_id: orderData.orderId,
          handler: async (response) => {
            const result = await subscriptionService.verifyAddonPayment({
              itemType: orderData.itemType,
              quantity: orderData.quantity,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (result.success) {
              trackEvent("purchase", {
                transaction_id: response.razorpay_payment_id,
                value: amount,
                currency: "INR",
                plan_name: planName,
              });
              finish(result);
              return;
            }

            fail(result.message || "Add-on payment verification failed");
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
          },
          theme: { color: "#756FCC" },
          modal: {
            ondismiss: () =>
              finish({ success: false, message: "Payment cancelled" }),
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on?.("payment.failed", (response) => {
          fail(
            response?.error?.description ||
              response?.error?.reason ||
              "Razorpay payment failed",
          );
        });

        trackEvent("plan_selected", {
          plan_name: planName,
          organization_type: analyticsData.organizationType || "unknown",
          amount,
        });
        rzp.open();
      });
    } catch (error) {
      const reason = error?.message || "Failed to open Razorpay checkout";
      trackEvent("subscription_failed", { plan_name: planName, reason });
      return { success: false, message: reason };
    }
  },
};

export const onboardingService = {
  getStatus: async () => {
    try {
      const response = await apiFetch(`${BASE_URL}/api/onboarding/status`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch onboarding status" };
      }
      return { success: true, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },

  onboardOrganization: async (orgData) => {
    try {
      const response = await apiFetch(`${BASE_URL}/api/onboarding/organization`, {
        method: "POST",
        body: JSON.stringify(orgData),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to onboard organization", errors: data.errors };
      }
      return { success: true, message: data.message, data: data.data };
    } catch {
      return { success: false, message: "Something went wrong" };
    }
  },
};
