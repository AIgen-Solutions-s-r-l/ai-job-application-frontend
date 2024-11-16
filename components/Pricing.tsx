import ButtonLead from "@/components/ButtonLead";

const plans = [
  {
    name: "Day Pass",
    price: "1.99",
    priceId: "day-pass",
    isFeatured: false,
    features: [
      { name: "Unlimited applications", available: true },
      { name: "AI Specific questions", available: true },
      { name: "AI Cover letters", available: true },
      { name: "AI Resumes", available: true },
      { name: "Support: Email", available: true },
    ],
  },
  {
    name: "Weekly Pass",
    price: "12.99",
    priceId: "weekly-pass",
    isFeatured: true,
    features: [
      { name: "Unlimited applications", available: true },
      { name: "AI Specific questions", available: true },
      { name: "AI Cover letters", available: true },
      { name: "AI Resumes", available: true },
      { name: "Support: Email", available: true },
    ],
  },
  {
    name: "Monthly Pass",
    price: "49.99",
    priceId: "monthly-pass",
    isFeatured: false,
    features: [
      { name: "Unlimited applications", available: true },
      { name: "AI Specific questions", available: true },
      { name: "AI Cover letters", available: true },
      { name: "AI Resumes", available: true },
      { name: "Priority support", available: true },
    ],
  },
];

const Pricing = () => {
  return (
    <section className="bg-base-200 overflow-hidden" id="pricing">
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <p className="font-medium text-primary mb-8">Flexible Pricing Plans</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            Choose the Pass That Suits You Best
          </h2>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <div key={plan.priceId} className="relative w-full max-w-2xl">
              {plan.isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className={`badge text-xs text-primary-content font-semibold border-0 bg-primary`}>
                    BEST VALUE
                  </span>
                </div>
              )}

              {plan.isFeatured && (
                <div className={`absolute -inset-[1px] rounded-[9px] bg-primary z-10`}></div>
              )}

              <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="text-lg lg:text-xl font-bold">{plan.name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <p className={`text-5xl tracking-tight font-extrabold`}>
                    ${plan.price}
                  </p>
                  <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-xs text-base-content/60 uppercase font-semibold">
                      / {plan.name.includes("Day") ? "Day" : plan.name.includes("Week") ? "7 Days" : "30 Days"}
                    </p>
                  </div>
                </div>
                {plan.features && (
                  <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 ${
                          feature.available ? "text-base-content" : "text-base-content/50"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`w-[18px] h-[18px] opacity-80 shrink-0 ${
                            feature.available ? "" : "text-base-content/50"
                          }`}
                        >
                          {feature.available ? (
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          ) : (
                            <path
                              fillRule="evenodd"
                              d="M9 2a7 7 0 100 14 7 7 0 000-14zM4 9a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          )}
                        </svg>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="space-y-2">
                  <ButtonLead extraStyle="!max-w-none !w-full" />
                  <p className="flex items-center justify-center gap-2 text-sm text-center text-base-content/80 font-medium relative">
                    One-time payment. No subscription ッ
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;