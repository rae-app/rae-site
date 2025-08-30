'use client';

import React, { useState, FormEvent } from 'react';

interface WaitlistFormData {
  email: string;
  name?: string;
}

const Waitlist: React.FC = () => {
  const [formData, setFormData] = useState<WaitlistFormData>({ email: '', name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !formData.email.trim()) return;
    
    setIsSubmitting(true);
    
    // TODO: Add Supabase + Resend Logic
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof WaitlistFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="max-w-[1400px]  min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl text-black leading-tight mb-2">
              Interested?
            </h1>
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-black leading-tight mb-6">
              JOIN THE WAITLIST
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-semibold text-black leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Be among the first to experience Rae - your invisible desktop assistant. 
              Get early access and exclusive updates.
            </p>
          </div>

          {/* Form */}
          <div className="order-2 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-black mb-2">
                      Name (optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50 text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-black mb-2">
                      Email address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50 text-sm sm:text-base"
                      placeholder="your.mail@example.com"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.email.trim()}
                      className="w-full sm:w-auto bg-gradient-to-r from-[#FC1D21FF] to-[#FF3B3EFF] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:from-[#921012FF] hover:to-[#921012FF] focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      {isSubmitting ? "JOINING..." : "JOIN WAITLIST"}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm font-semibold text-black">
                We respect your privacy. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
