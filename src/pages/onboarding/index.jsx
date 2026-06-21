import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Building2, Globe, MapPin, Mail, Phone, Calendar, Clock, DollarSign, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { onboardingService, authService } from "../../service";

const onboardingSchema = z.object({
  name: z.string().min(3, "Organization Name must be at least 3 characters").max(100, "Organization Name must be at most 100 characters"),
  organizationType: z.enum([
    "private_company",
    "public_company",
    "startup",
    "government",
    "ngo",
    "education",
    "healthcare",
    "manufacturing",
    "it_services",
    "consultancy",
    "other"
  ], { required_error: "Please select an organization type" }),
  industry: z.enum([
    "information_technology",
    "healthcare",
    "education",
    "finance",
    "manufacturing",
    "retail",
    "real_estate",
    "telecommunications",
    "hospitality",
    "construction",
    "transportation",
    "media",
    "legal_services",
    "other"
  ], { required_error: "Please select an industry" }),
  companySize: z.enum([
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+"
  ], { required_error: "Please select company size" }),
  country: z.string().min(1, "Country is required"),
  timezone: z.string().min(1, "Timezone is required"),
  organizationEmail: z.string().email("Invalid email format"),
  organizationPhone: z.string().regex(/^\d{8,15}$/, "Phone number must be between 8 and 15 digits"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  currency: z.string().min(1, "Currency is required"),
  workingDays: z.array(z.string()).nonempty("Must select at least one working day"),
  officeStartTime: z.string().min(1, "Office start time is required"),
  officeEndTime: z.string().min(1, "Office end time is required"),
});

const weekdays = [
  { label: "Mon", value: "monday" },
  { label: "Tue", value: "tuesday" },
  { label: "Wed", value: "wednesday" },
  { label: "Thu", value: "thursday" },
  { label: "Fri", value: "friday" },
  { label: "Sat", value: "saturday" },
  { label: "Sun", value: "sunday" }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      organizationType: "startup",
      industry: "information_technology",
      companySize: "1-10",
      country: "",
      timezone: "Asia/Kolkata",
      organizationEmail: "",
      organizationPhone: "",
      website: "",
      currency: "INR",
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      officeStartTime: "09:00",
      officeEndTime: "18:00"
    }
  });

  const selectedDays = watch("workingDays") || [];

  const handleDayToggle = (dayValue) => {
    if (selectedDays.includes(dayValue)) {
      setValue("workingDays", selectedDays.filter(d => d !== dayValue), { shouldValidate: true });
    } else {
      setValue("workingDays", [...selectedDays, dayValue], { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    const res = await onboardingService.onboardOrganization(data);
    setLoading(false);
    if (res.success) {
      // Update local storage user profile with onboardingCompleted = true
      const userDataStr = localStorage.getItem("userData");
      if (userDataStr) {
        try {
          const u = JSON.parse(userDataStr);
          u.onboardingCompleted = true;
          u.organizationId = res.data.id;
          localStorage.setItem("userData", JSON.stringify(u));
        } catch (e) {
          console.error(e);
        }
      }
      setSuccess(true);
      setTimeout(() => {
        // Redirect to dashboard (admin SSO)
        const profile = localStorage.getItem("subscription");
        let sub = null;
        if (profile) {
          try {
            sub = JSON.parse(profile);
          } catch(e) {}
        }
        authService.handlePostAuthRedirect(sub, navigate);
      }, 2000);
    } else {
      setErrorMsg(res.message || "Failed to onboard organization. Please try again.");
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Determine if current step fields are valid to enable/disable Next button
  const isStepValid = () => {
    if (step === 1) {
      const nameVal = watch("name");
      const orgType = watch("organizationType");
      const ind = watch("industry");
      const size = watch("companySize");
      return nameVal && nameVal.length >= 3 && nameVal.length <= 100 && orgType && ind && size && !errors.name && !errors.organizationType && !errors.industry && !errors.companySize;
    }
    if (step === 2) {
      const countryVal = watch("country");
      const tz = watch("timezone");
      const email = watch("organizationEmail");
      const phone = watch("organizationPhone");
      const website = watch("website");
      
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const phoneValid = /^\d{8,15}$/.test(phone);
      const websiteValid = !website || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(website);
      
      return countryVal && tz && emailValid && phoneValid && websiteValid && !errors.country && !errors.timezone && !errors.organizationEmail && !errors.organizationPhone && !errors.website;
    }
    return isValid;
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white animate-fade-in">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 text-emerald-400 animate-bounce">
              <CheckCircle2 size={40} />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Setup Completed!</h2>
          <p className="text-slate-400">
            Your workspace is set up successfully. We are redirecting you to your admin dashboard...
          </p>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-2xl font-bold tracking-tight text-white bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
            Suhtech ORGA
          </span>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-white">
          Onboard your Organization
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Complete the setup to start managing your workspace
        </p>

        {/* Progress Bar */}
        <div className="mt-8 px-4 sm:px-0">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase mb-2">
            <span>Step {step} of 3</span>
            <span>{step === 1 ? "Organization Details" : step === 2 ? "Location & Contact" : "Workspace Settings"}</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl animate-fade-in">
        <div className="bg-slate-900 border border-slate-800/80 sm:rounded-2xl shadow-2xl p-8 space-y-6">
          {errorMsg && (
            <div className="bg-red-950/40 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Organization Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      placeholder="e.g. Acme Corporation"
                      {...register("name")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Organization Type *
                    </label>
                    <select
                      {...register("organizationType")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="private_company">Private Company</option>
                      <option value="public_company">Public Company</option>
                      <option value="startup">Startup</option>
                      <option value="government">Government</option>
                      <option value="ngo">NGO</option>
                      <option value="education">Education</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="it_services">IT Services</option>
                      <option value="consultancy">Consultancy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Industry *
                    </label>
                    <select
                      {...register("industry")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="information_technology">Information Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="finance">Finance</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="real_estate">Real Estate</option>
                      <option value="telecommunications">Telecommunications</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="construction">Construction</option>
                      <option value="transportation">Transportation</option>
                      <option value="media">Media</option>
                      <option value="legal_services">Legal Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Company Size *
                  </label>
                  <select
                    {...register("companySize")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="1-10">1-10 Employees</option>
                    <option value="11-50">11-50 Employees</option>
                    <option value="51-200">51-200 Employees</option>
                    <option value="201-500">201-500 Employees</option>
                    <option value="501-1000">501-1000 Employees</option>
                    <option value="1000+">1000+ Employees</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Location & Contact */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Country *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="text"
                        placeholder="e.g. India"
                        {...register("country")}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    {errors.country && (
                      <span className="text-red-400 text-xs mt-1 block">{errors.country.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Timezone *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="text"
                        placeholder="e.g. Asia/Kolkata"
                        {...register("timezone")}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    {errors.timezone && (
                      <span className="text-red-400 text-xs mt-1 block">{errors.timezone.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Organization Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="email"
                      placeholder="e.g. contact@acme.com"
                      {...register("organizationEmail")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  {errors.organizationEmail && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.organizationEmail.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Organization Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      {...register("organizationPhone")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  {errors.organizationPhone && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.organizationPhone.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      placeholder="e.g. https://acme.com (optional)"
                      {...register("website")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  {errors.website && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.website.message}</span>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Workspace Settings */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Currency *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <select
                      {...register("currency")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="AED">AED (dhs)</option>
                    </select>
                  </div>
                  {errors.currency && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.currency.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Working Days *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {weekdays.map((day) => {
                      const active = selectedDays.includes(day.value);
                      return (
                        <button
                          key={day.value}
                          type="button"
                          onClick={() => handleDayToggle(day.value)}
                          className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                            active
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.workingDays && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.workingDays.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Office Start Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="time"
                        {...register("officeStartTime")}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    {errors.officeStartTime && (
                      <span className="text-red-400 text-xs mt-1 block">{errors.officeStartTime.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Office End Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="time"
                        {...register("officeEndTime")}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    {errors.officeEndTime && (
                      <span className="text-red-400 text-xs mt-1 block">{errors.officeEndTime.message}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Form actions */}
            <div className="flex gap-4 pt-4 border-t border-slate-800/80">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-800 bg-slate-950 text-sm font-medium text-slate-300 hover:bg-slate-900 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-medium text-white transition flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-medium text-white transition flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Onboarding...
                    </>
                  ) : (
                    "Complete Setup"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
