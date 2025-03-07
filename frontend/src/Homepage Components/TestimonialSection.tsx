const testimonials = [
  {
    quote:
      "The courses are well-structured, and the instructors explain concepts in a very simple way. It has helped me grow professionally.",
    name: "Rohan Sharma",
    role: "Software Engineer",
  },
  {
    quote:
      "Einfratech provided me with industry-relevant skills. The hands-on projects made learning more effective and practical.",
    name: "Priya Verma",
    role: "Data Analyst",
  },
  {
    quote:
      "After completing the full-stack development course, I landed a great job. The mentorship and guidance were excellent.",
    name: "Amit Khanna",
    role: "Full-Stack Developer",
  },
];

export const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl flex justify-center font-bold text-gray-900 mb-8 flex-wrap">
          What They Say About
          <div className="ml-2 mr-2 text-blue-500">Einfratech</div> Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial: { quote: string; name: string; role: string }, index: number) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
            >
              <p className="text-gray-700 italic mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center justify-center mt-4">
                <div>
                  <div className="font-semibold text-lg text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
