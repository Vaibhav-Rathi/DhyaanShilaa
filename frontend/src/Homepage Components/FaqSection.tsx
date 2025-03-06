import { useState } from "react";

export const FaqSection = () => {
  const [openFaqItem, setOpenFaqItem] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqItem(openFaqItem === index ? null : index);
  };

  const faqItems = [
    {
      number: "01",
      question: "Is this course offered at no expense?",
      answer:
        "The materials may be accessed at no cost through our marketplace to enable learners to evaluate the quality of education.",
    },
    {
      number: "02",
      question: "Who is the target audience for this course?",
      answer:
        "This course is designed for beginners to intermediate learners looking to enhance their skills in the subject area.",
    },
    {
      number: "03",
      question: "Does this course come with a certificate?",
      answer:
        "Yes, upon successful completion of the course, you will receive a certificate that you can add to your resume.",
    },
    {
      number: "04",
      question: "What is the duration of this course?",
      answer:
        "The course duration varies depending on the topic, but most courses range from 10-15 hours of content.",
    },
    {
      number: "05",
      question: "Do you provide job placement services after graduation?",
      answer:
        "We offer career guidance and networking opportunities, but we do not guarantee job placement after course completion.",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50 md:py-16">
      <div className="container mx-auto px-4 max-w-xl lg:max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              number={item.number}
              question={item.question}
              answer={item.answer}
              isOpen={openFaqItem === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const FaqItem = ({
  number,
  question,
  answer,
  isOpen,
  onClick,
}: {
  number: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <button
        className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 transition-colors text-left"
        onClick={onClick}
      >
        <div className="flex items-center">
          <span className="text-indigo-600 font-bold mr-3">{number}</span>
          <span className="font-medium text-gray-800 text-sm md:text-base">
            {question}
          </span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ${
          isOpen ? "max-h-40 p-4 bg-gray-50 text-sm md:text-base" : "max-h-0 p-0 overflow-hidden"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};