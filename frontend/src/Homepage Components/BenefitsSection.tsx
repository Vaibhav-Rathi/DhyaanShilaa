export const BenefitsSection = () => {
    const benefits = [
      {
        number: '1',
        title: 'Courses',
        description: 'High-quality courses designed to boost your career success with practical learning experiences.'
      },
      {
        number: '2',
        title: 'Lifetime Access',
        description: 'Enroll once and gain lifetime access to content, allowing you to learn at your own pace.'
      },
      {
        number: '3',
        title: 'Consultation Group',
        description: 'Join our community where students and instructors collaborate to solve queries and doubts.'
      },
      {
        number: '4',
        title: 'Certificates & Portfolio',
        description: 'Earn recognized certificates to enhance your professional profile and career prospects.'
      },
      {
        number: '5',
        title: 'Focused Learning',
        description: 'Structured courses with best-practice approaches for an effective learning experience.'
      },
      {
        number: '6',
        title: 'Experienced Instructors',
        description: 'Learn from industry experts who provide hands-on knowledge and career guidance.'
      },
    ];
  
    return (
      <section
        className="py-16 bg-gradient-to-br from-yellow-50 to-blue-50"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Benefits of Joining <span className="text-blue-600">DhyaanShilaa</span> E-Learning
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                number={benefit.number}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export const BenefitCard = ({ number, title, description }: any) => {
    return (
      <div className="relative bg-white p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
        <div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold shadow-lg"
          style={{ animation: 'pulse 2s infinite' }}
        >
          {number}
        </div>
  
        <h3 className="font-bold text-xl text-gray-900 mt-6 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
  
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `}
        </style>
      </div>
    );
  };
  