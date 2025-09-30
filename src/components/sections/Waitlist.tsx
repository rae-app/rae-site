'use client';

import React, { useState, FormEvent } from 'react';
import { addToWaitlist } from '@/app/actions/waitlist';
import Button from '../ui/button/Button';
import Image from 'next/image';

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
    <section
      className="z-40 min-h-screen flex items-center justify-center"
      style={{
        maxWidth: '90vw',
        padding: '2vw 4vw'
      }}
    >
      <div className="w-full" style={{ maxWidth: '85vw' }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{
            gap: '8vw'
          }}
        >
          {/* Text Content */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            {/* Interested? only */}
            <div
              className="flex items-center justify-center lg:justify-start"
              style={{ marginBottom: '3vh' }}
            >
              <h1
                className="font-bold leading-tight"
                style={{
                  fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  color: '#353839',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)'
                }}
              >
                Interested?
              </h1>
            </div>

            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                color: '#353839',
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                marginBottom: '3vh'
              }}
            >
              JOIN THE WAITLIST
            </h2>

            <p
              className="font-semibold text-black leading-relaxed mx-auto lg:mx-0"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                color: '#353839',
                fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
                maxWidth: '50vw'
              }}
            >
              Be among the first to experience Rae - your desktop assistant.
              Get early access and exclusive updates.
            </p>
          </div>

          {/* Form */}
          <div className="order-2 lg:order-2">
            <form onSubmit={handleSubmit} style={{ gap: '2vh' }} className="flex flex-col">
              <div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20"
                style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}
              >
                <div style={{ gap: '2vh' }} className="flex flex-col">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-bold text-black"
                      style={{
                        fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                        marginBottom: '1vh'
                      }}
                    >
                      Name (optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      style={{
                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                        fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)'
                      }}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-bold text-black"
                      style={{
                        fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                        marginBottom: '1vh'
                      }}
                    >
                      Email address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      style={{
                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                        fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)'
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Status */}
                  {status === 'success' && (
                    <div
                      className="bg-green-50 border border-green-200 rounded-lg text-center"
                      style={{ padding: 'clamp(0.5rem, 1.5vw, 1rem)' }}
                    >
                      <p
                        className="text-green-800 font-semibold"
                        style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1rem)' }}
                      >
                        Successfully joined! We&apos;ll keep you posted with every Rae update.
                      </p>
                    </div>
                  )}

                  {status === 'error' && (
                    <div
                      className="bg-red-50 border border-red-200 rounded-lg text-center"
                      style={{ padding: 'clamp(0.5rem, 1.5vw, 1rem)' }}
                    >
                      <p
                        className="text-red-800 font-semibold"
                        style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1rem)' }}
                      >
                        Something went wrong. Please try again.
                      </p>
                    </div>
                  )}

                  {/* Surfer GIF before button */}
                  <div
                    className="flex justify-center items-center gap-4"
                    style={{
                      paddingLeft: 'clamp(10vw, 20vw, 15vw)',
                      marginBottom: '-7vh'
                    }}
                  >
                    <Image
                      src="/assets/images/surfer.gif"
                      alt="Surfer animation"
                      width={96}
                      height={96}
                      className="object-contain flex-shrink-0"
                      style={{
                        width: 'clamp(4rem, 8vw, 6rem)',
                        height: 'clamp(4rem, 8vw, 6rem)',
                        marginLeft: '-5rem'
                      }}
                      unoptimized
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

            <div
              className="text-center"
              style={{ marginTop: 'clamp(1rem, 3vh, 2rem)' }}
            >
              <p
                className="font-semibold text-black"
                style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.9rem)' }}
              >
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
