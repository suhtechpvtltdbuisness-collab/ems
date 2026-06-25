import { LockKeyhole, RefreshCw, Zap } from "lucide-react";

const integrations = [
  {
    name: "Google Drive",
    description: "Document Storage",
    icon: "drive",
  },
  {
    name: "Google Meet",
    description: "Team Meetings",
    icon: "meet",
  },
  {
    name: "Gmail",
    description: "Email Notifications",
    icon: "gmail",
  },
  {
    name: "Google Calendar",
    description: "Leave & Meeting Sync",
    icon: "calendar",
  },
  {
    name: "Google Cloud",
    description: "Cloud Infrastructure",
    icon: "cloud",
  },
  {
    name: "Slack",
    description: "Team Communication",
    icon: "slack",
  },
];

function IntegrationIcon({ type }) {
  if (type === "drive") {
    return (
      <svg viewBox="0 0 87 78" className="h-[70px] w-[78px]" aria-hidden="true">
        <path fill="#0F9D58" d="M29 0h27l29 50H58z" />
        <path fill="#F4B400" d="M56 0 87 53 73 78 43 26z" />
        <path fill="#4285F4" d="M14 78 0 53l29-50 15 25L15 78z" />
        <path fill="#0066DA" d="M14 78 29 53h58L73 78z" />
        <path fill="#00AC47" d="M0 53 29 3l15 25-15 25z" />
        <path fill="#EA4335" d="M56 0 43 26l15 27h29z" opacity=".08" />
      </svg>
    );
  }

  if (type === "meet") {
    return (
      <svg viewBox="0 0 92 72" className="h-[64px] w-[78px]" aria-hidden="true">
        <path fill="#00832D" d="M54 17 68 3h18v66H68L54 55z" />
        <path fill="#00AC47" d="M54 17h14v38H54z" />
        <path fill="#EA4335" d="M6 8 20 22h35V3H13z" />
        <path fill="#FFBA00" d="M55 3v19H20V8l5-5z" />
        <path fill="#2684FC" d="M6 8 0 14v19h20V8z" />
        <path fill="#0066DA" d="M0 33v25l7 7h13V33z" />
        <path fill="#00AC47" d="M20 33h35v32H20z" />
      </svg>
    );
  }

  if (type === "gmail") {
    return (
      <svg viewBox="0 0 92 70" className="h-[62px] w-[78px]" aria-hidden="true">
        <path fill="#4285F4" d="M0 15 12 24v46H7a7 7 0 0 1-7-7z" />
        <path fill="#34A853" d="m80 24 12-9v48a7 7 0 0 1-7 7h-5z" />
        <path fill="#EA4335" d="M7 0h5l34 25L80 0h5a7 7 0 0 1 7 7v8L46 50 0 15V7a7 7 0 0 1 7-7" />
        <path fill="#FBBC04" d="M80 0h5a7 7 0 0 1 7 7v8l-12 9z" />
        <path fill="#C5221F" d="M0 15V7a7 7 0 0 1 7-7h5v24z" />
      </svg>
    );
  }

  if (type === "calendar") {
    return (
      <svg viewBox="0 0 72 72" className="h-[72px] w-[72px]" aria-hidden="true">
        <path fill="#4285F4" d="M9 0h45l9 9v54H9z" />
        <path fill="#1967D2" d="M54 0h9v21H42V0z" />
        <path fill="#FBBC04" d="M42 21h21v21H42z" />
        <path fill="#34A853" d="M9 42h33v21H9z" />
        <path fill="#188038" d="M42 42h21v21H42z" />
        <path fill="#EA4335" d="M9 0h33v21H9z" />
        <path fill="#fff" d="M27 31c4 0 7-2 7-5 0-3-2-5-6-5-3 0-6 1-8 3l3 4c1-1 3-2 5-2 1 0 2 1 2 2 0 2-2 2-5 2h-2v5h2c4 0 6 1 6 3 0 1-1 3-4 3-3 0-5-1-7-3l-3 4c2 3 6 5 10 5 6 0 10-3 10-8 0-4-3-7-7-8Zm18-9-7 5 3 4 4-3v18h6V22z" />
      </svg>
    );
  }

  if (type === "cloud") {
    return (
      <svg viewBox="0 0 90 66" className="h-[64px] w-[78px]" aria-hidden="true">
        <path fill="#EA4335" d="M29 22A25 25 0 0 1 72 9L61 20a11 11 0 0 0-20 6z" />
        <path fill="#4285F4" d="M71 9a25 25 0 0 1 6 19 19 19 0 0 1-5 37H48V52h24a7 7 0 0 0 0-14h-8a13 13 0 0 0-3-18z" />
        <path fill="#34A853" d="M48 65H23a23 23 0 0 1-8-44l7 12a10 10 0 0 0 1 19h25z" />
        <path fill="#FBBC04" d="M15 21a23 23 0 0 1 36 8L39 36a10 10 0 0 0-17-3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 82 82" className="h-[70px] w-[70px]" aria-hidden="true">
      <rect x="31" width="18" height="39" rx="9" fill="#36C5F0" />
      <rect x="0" y="31" width="39" height="18" rx="9" fill="#36C5F0" />
      <rect x="43" width="18" height="39" rx="9" transform="rotate(90 43 0)" fill="#2EB67D" />
      <rect x="43" y="31" width="39" height="18" rx="9" fill="#2EB67D" />
      <rect y="43" width="39" height="18" rx="9" transform="rotate(-90 0 43)" fill="#E01E5A" />
      <rect y="43" width="39" height="18" rx="9" fill="#E01E5A" />
      <rect x="31" y="43" width="18" height="39" rx="9" fill="#ECB22E" />
      <rect x="43" y="43" width="39" height="18" rx="9" transform="rotate(90 43 43)" fill="#ECB22E" />
    </svg>
  );
}

function IntegrationCard({ integration }) {
  return (
    <div className="relative z-10 flex w-[128px] shrink-0 flex-col items-center text-center">
      <div className="flex h-[96px] w-[96px] items-center justify-center rounded-[18px] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">
        <div className="scale-[0.78]">
          <IntegrationIcon type={integration.icon} />
        </div>
      </div>
      <h3 className="mt-4 text-[13px] font-bold leading-tight text-black">
        {integration.name}
      </h3>
      <p className="mt-1.5 text-[11px] font-semibold leading-tight text-[#858585]">
        {integration.description}
      </p>
    </div>
  );
}

function OrgaHub() {
  return (
    <div className="relative z-20 flex h-[128px] w-[128px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_15px_32px_rgba(15,23,42,0.18)]">
      <div className="flex scale-[0.78] items-end">
        <span className="text-[46px] font-extrabold leading-none tracking-[-2px] text-[#9B76E3]">
          ORG
        </span>
        <span className="relative mb-[2px] ml-[1px] h-[38px] w-[39px] overflow-hidden">
          <span className="absolute bottom-0 left-0 h-0 w-0 border-x-[19px] border-b-[34px] border-x-transparent border-b-[#9B76E3]" />
          <span className="absolute bottom-[10px] left-[5px] h-[4px] w-[29px] bg-[#86C4C9]" />
          <span className="absolute bottom-[19px] left-[10px] h-[4px] w-[19px] bg-[#62A6AD]" />
        </span>
      </div>
    </div>
  );
}

const benefits = [
  {
    label: "Enterprise-grade security",
    icon: <LockKeyhole className="h-7 w-7 shrink-0 text-[#7024EB]" strokeWidth={2.6} />,
  },
  {
    label: "Easy setup in minutes",
    icon: <RefreshCw className="h-7 w-7 shrink-0 text-[#7024EB]" strokeWidth={2.6} />,
  },
  {
    label: "99.9% uptime guaranteed",
    icon: <Zap className="h-7 w-7 shrink-0 text-[#7024EB]" strokeWidth={2.6} />,
  },
];

export default function IntegrationSection() {
  return (
    <section className="w-full bg-white px-4 pb-12 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[28px] border-[3px] border-[#AAEBB3] bg-[linear-gradient(270deg,#FFFFFF_0%,#F1FFE8_100%)] px-4 py-10 sm:px-8 lg:px-10">
        <div className="text-center">
          <h2 className="text-[30px] font-bold leading-[1.15] tracking-[-1px] text-[#121A30] sm:text-[38px] lg:text-[42px]">
            100+ Integrations. One Unified Workspace.
          </h2>
          <p className="mt-3 text-[24px] font-bold leading-tight tracking-[-0.5px] text-[#121A30] sm:text-[30px]">
            One Platform.{" "}
            <span className="text-[#43C96B]">Endless Productivity.</span>
          </p>
          <p className="mt-3 text-[15px] font-bold text-[#68758D] sm:text-[17px]">
            Connect your tools. Streamline your workflow.
          </p>
        </div>

        <div className="mt-10">
          <div className="relative hidden min-h-[175px] items-start justify-between lg:flex">
            <div className="absolute left-[6%] right-[6%] top-[47px] border-t border-dotted border-[#929292]" />
            <div className="absolute left-1/2 top-[47px] h-[49px] w-[22%] -translate-x-full border-b border-l border-dotted border-[#929292]" />
            <div className="absolute left-1/2 top-[47px] h-[49px] w-[22%] border-b border-r border-dotted border-[#929292]" />

            <IntegrationCard integration={integrations[0]} />
            <IntegrationCard integration={integrations[1]} />
            <IntegrationCard integration={integrations[2]} />
            <div className="mx-1 mt-8">
              <OrgaHub />
            </div>
            <IntegrationCard integration={integrations[3]} />
            <IntegrationCard integration={integrations[4]} />
            <IntegrationCard integration={integrations[5]} />
          </div>

          <div className="grid grid-cols-2 justify-items-center gap-x-3 gap-y-8 sm:grid-cols-3 lg:hidden">
            {integrations.slice(0, 3).map((integration) => (
              <IntegrationCard key={integration.name} integration={integration} />
            ))}
            <div className="col-span-2 my-1 sm:col-span-3">
              <OrgaHub />
            </div>
            {integrations.slice(3).map((integration) => (
              <IntegrationCard key={integration.name} integration={integration} />
            ))}
          </div>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {benefits.map(({ label, icon }) => (
            <div
              key={label}
              className="flex min-h-[64px] items-center justify-center gap-5 rounded-full bg-[#F7F7F8] px-5"
            >
              <span className="scale-90" aria-hidden="true">{icon}</span>
              <span className="text-[14px] font-bold text-black sm:text-[15px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
