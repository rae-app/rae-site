'use client';

import React, { useState, FormEvent } from 'react';
import { addToWaitlist } from '@/app/actions/waitlist';
import Button from '../ui/button/Button';
import Card from '../ui/Card';

interface WaitlistFormData {
  email: string;
  name?: string;
}

const Waitlist: React.FC = () => {
  const [formData, setFormData] = useState<WaitlistFormData>({ email: '', name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !formData.email.trim()) return;
    
    setIsSubmitting(true);
    setStatus('idle');
    
    try {
      await addToWaitlist(formData);
      setFormData({ email: '', name: '' });
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof WaitlistFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (status !== 'idle') setStatus('idle'); // Reset status on input change
  };

  return (
    <section className="max-w-[1400px]  z-40 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            {/* Interested? only */}
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl text-black leading-tight">
                Interested?
              </h1>
            </div>

            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-black leading-tight mb-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
              JOIN THE WAITLIST
            </h2>
            {/* <div className='bg-black rounded-lg px-2 py-1 text-white ' >2655 people joined</div> */}
            <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-semibold text-black leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
              Be among the first to experience Rae - your desktop assistant.
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
                      className="w-full px-4 py-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50 text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Status */}
                  {status === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <p className="text-green-800 font-semibold text-sm">
                        Successfully joined! We&apos;ll keep you posted with every Rae update.
                      </p>
                    </div>
                  )}
                  
                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                      <p className="text-red-800 font-semibold text-sm">
                        Something went wrong. Please try again.
                      </p>
                    </div>
                  )}

                  {/* Surfer GIF before button */}
                  <div className="flex justify-center items-center gap-4 pl-40 -mb-14">
                    <img
                      src="/assets/images/surfer.gif"
                      alt="Surfer animation"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.email.trim()}
                      className="ml-auto"
                    >
                      {isSubmitting ? "JOINING..." : "JOIN WAITLIST"}
                    </Button>
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
