import { LockKeyhole, RefreshCw, Zap } from "lucide-react";

const integrations = [
  {
    name: "Google Drive",
    description: "Document Storage",
    icon: "/integration-drive.svg",
  },
  {
    name: "Google Meet",
    description: "Team Meetings",
    icon: "/Vector.png",
  },
  {
    name: "Gmail",
    description: "Email Notifications",
    icon: "/integration-gmail.svg",
  },
  {
    name: "Google Calendar",
    description: "Leave & Meeting Sync",
    icon: "/integration-calendar.svg",
  },
  {
    name: "Google Cloud",
    description: "Cloud Infrastructure",
    icon: "/integration-cloud.svg",
  },
  {
    name: "Slack",
    description: "Team Communication",
    icon: "/integration-slack.svg",
  },
];

function IntegrationCard({ integration }) {
  return (
    <div className="relative z-10 flex w-[90px] sm:w-[128px] shrink-0 flex-col items-center text-center">
      <div className="flex h-[72px] w-[72px] sm:h-[96px] sm:w-[96px] items-center justify-center rounded-[16px] sm:rounded-[18px] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">
        <img
          src={integration.icon}
          alt={`${integration.name} logo`}
          className="h-[42px] w-[48px] sm:h-[58px] sm:w-[66px] object-contain"
        />
      </div>
      <h3 className="mt-3 sm:mt-4 text-[11px] sm:text-[13px] font-bold leading-tight text-black">
        {integration.name}
      </h3>
      <p className="mt-1 sm:mt-1.5 text-[9px] sm:text-[11px] font-semibold leading-tight text-[#858585]">
        {integration.description}
      </p>
    </div>
  );
}

function OrgaHub() {
  return (
    <div className="relative z-20 flex h-[100px] w-[100px] sm:h-[128px] sm:w-[128px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_15px_32px_rgba(15,23,42,0.18)]">
      <img src="/Orga Logo (1).svg" alt="ORGA" className="w-[72px] sm:w-[92px]" />
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

          <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-6 sm:gap-x-3 sm:gap-y-8 lg:hidden">
            {integrations.slice(0, 3).map((integration) => (
              <IntegrationCard key={integration.name} integration={integration} />
            ))}
            <div className="col-span-3 my-1 flex justify-center">
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
