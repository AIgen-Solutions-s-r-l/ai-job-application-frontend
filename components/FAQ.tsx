"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

// FAQ component is a list of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList array below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "How many applications can the bot submit per day?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Each bot can submit up to 250 applications per day, which is the maximum allowed by LinkedIn.
      </div>
    ),
  },
  {
    question: "Is there a risk of my account getting banned?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        The bot is designed to behave like a human and minimize detection risks. However, LinkedIn does not officially support automation tools, and there is always a risk. We do not take responsibility for any account bans or restrictions, and the user assumes full responsibility.
      </div>
    ),
  },
  {
    question: "Are AI features like resumes, cover letters, and asked questions available for all applications?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Yes, all passes include access to AI-generated resumes, cover letters, and responses to specific job questions for every application.
      </div>
    ),
  },
  {
    question: "What happens if I have an active pass and purchase another pass?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        If you already have an active pass and purchase a new one, the new pass will be added to your current period. For example, if you have 3 days left on a 7-day pass and buy a 30-day pass, you will have 33 days of total access.
      </div>
    ),
  },
  {
    question: "Which platforms does the bot support?",
    answer: (
      <p>
        Currently, the bot only supports LinkedIn. We&apos;re continuously working to add support for more platforms in the future.
      </p>
    ),
  },
  {
    question: "Can I get a refund?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Yes, you can request a refund as long as no bot has been created or executed any applications. Once the bot is set up and running, refunds are no longer available.
      </div>
    ),
  },
  {
    question: "What kind of support can I expect?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        All passes come with email support. Users with the Monthly Pass receive priority support for faster responses.
      </div>
    ),
  },
  {
    question: "How do the passes work?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        You pay for a Day, Weekly, or Monthly Pass, which gives you unlimited applications for the duration of that period. Passes are not subscriptions, and they do not automatically renew. You can purchase a new pass once your current one expires.
      </div>
    ),
  },
  {
    question: "I have more questions, how can I reach you?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Feel free to reach out via email or through our community channels. We’re happy to assist with any further inquiries.
      </div>
    ),
  },
];
const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;