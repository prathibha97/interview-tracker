import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  CalendarCheck,
  Users,
  BarChart3,
  BriefcaseIcon,
  ClipboardCheck,
  MailIcon,
  MessageSquareQuoteIcon,
  ShieldCheckIcon,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      {/* Header/Navigation */}
      <header className='border-b shadow-sm bg-white'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center'>
            <BriefcaseIcon className='h-8 w-8 text-indigo-600 mr-2' />
            <h1 className='text-2xl font-bold text-gray-900'>InterviewPro</h1>
          </div>
          <nav className='hidden md:flex items-center space-x-8'>
            <Link
              href='#features'
              className='text-gray-600 hover:text-indigo-600 transition-colors'
            >
              Features
            </Link>
            <Link
              href='#benefits'
              className='text-gray-600 hover:text-indigo-600 transition-colors'
            >
              Benefits
            </Link>
            <Link
              href='#testimonials'
              className='text-gray-600 hover:text-indigo-600 transition-colors'
            >
              Testimonials
            </Link>
            <Link
              href='#pricing'
              className='text-gray-600 hover:text-indigo-600 transition-colors'
            >
              Pricing
            </Link>
          </nav>
          <div className='flex items-center space-x-4'>
            <Link
              href='/login'
              className='text-gray-700 hover:text-indigo-600 transition-colors font-medium'
            >
              Login
            </Link>
            <Button asChild size='sm'>
              <Link href='/register'>Sign up free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='py-20 md:py-28'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            Streamline Your Hiring Process
          </h1>
          <p className='text-xl text-gray-600 mb-10 max-w-3xl mx-auto'>
            A powerful interview management platform that helps you schedule,
            conduct, and evaluate interviews efficiently.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button size='lg' className='px-8'>
              <Link href='/register'>Get Started</Link>
            </Button>
            <Button size='lg' variant='outline' className='px-8'>
              <Link href='#demo'>Watch Demo</Link>
            </Button>
          </div>

          <div className='mt-16 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden max-w-5xl mx-auto'>
            <Image
              src='/images/dashboard-preview.svg'
              alt='Dashboard Preview'
              width={1200}
              height={700}
              className='w-full h-auto'
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Powerful Interview Management
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Our platform provides everything you need to optimize your
              recruitment process
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
              <div className='bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-5'>
                <CalendarCheck className='h-6 w-6 text-indigo-600' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>
                Interview Scheduling
              </h3>
              <p className='text-gray-600'>
                Easily schedule interviews with candidates and interviewers.
                Automatic notifications keep everyone informed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
              <div className='bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-5'>
                <Users className='h-6 w-6 text-indigo-600' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>
                Candidate Management
              </h3>
              <p className='text-gray-600'>
                Track candidates through your pipeline with detailed profiles
                and interview histories.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
              <div className='bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-5'>
                <ClipboardCheck className='h-6 w-6 text-indigo-600' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>
                Feedback Collection
              </h3>
              <p className='text-gray-600'>
                Structured interview feedback forms with automated reminders to
                ensure timely evaluations.
              </p>
            </div>

            {/* Feature 4 */}
            <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
              <div className='bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-5'>
                <MailIcon className='h-6 w-6 text-indigo-600' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>
                Automated Notifications
              </h3>
              <p className='text-gray-600'>
                Automatic emails for interview scheduling, updates, and feedback
                reminders.
              </p>
            </div>

            {/* Feature 5 */}
            <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
              <div className='bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-5'>
                <BarChart3 className='h-6 w-6 text-indigo-600' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>
                Recruitment Analytics
              </h3>
              <p className='text-gray-600'>
                Comprehensive reports and analytics to optimize your recruitment
                process and track key metrics.
              </p>
            </div>

            {/* Feature 6 */}
            <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
              <div className='bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-5'>
                <ShieldCheckIcon className='h-6 w-6 text-indigo-600' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Secure & Compliant</h3>
              <p className='text-gray-600'>
                Enterprise-grade security with role-based access controls and
                data protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              How It Works
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Simplify your recruitment workflow in three easy steps
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {/* Step 1 */}
            <div className='text-center'>
              <div className='bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-white font-bold text-lg'>1</span>
              </div>
              <h3 className='text-xl font-semibold mb-3'>
                Schedule Interviews
              </h3>
              <p className='text-gray-600'>
                Create interviews, select interviewers, and set up time slots.
                Automated emails notify all participants.
              </p>
            </div>

            {/* Step 2 */}
            <div className='text-center'>
              <div className='bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-white font-bold text-lg'>2</span>
              </div>
              <h3 className='text-xl font-semibold mb-3'>Conduct Interviews</h3>
              <p className='text-gray-600'>
                Track interview status, manage schedules, and update statuses as
                interviews are completed.
              </p>
            </div>

            {/* Step 3 */}
            <div className='text-center'>
              <div className='bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-white font-bold text-lg'>3</span>
              </div>
              <h3 className='text-xl font-semibold mb-3'>
                Collect & Analyze Feedback
              </h3>
              <p className='text-gray-600'>
                Gather structured feedback from interviewers and make
                data-driven hiring decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id='benefits' className='py-20 bg-indigo-50'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                Why Choose InterviewPro?
              </h2>

              <div className='space-y-4'>
                <div className='flex'>
                  <div className='flex-shrink-0 mr-4'>
                    <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 text-indigo-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Save Time & Resources
                    </h3>
                    <p className='text-gray-600 mt-1'>
                      Reduce administrative overhead by 70% with automated
                      scheduling and notifications.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='flex-shrink-0 mr-4'>
                    <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 text-indigo-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Improve Candidate Experience
                    </h3>
                    <p className='text-gray-600 mt-1'>
                      Professional communication and seamless scheduling create
                      a positive impression.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='flex-shrink-0 mr-4'>
                    <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 text-indigo-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Make Better Hiring Decisions
                    </h3>
                    <p className='text-gray-600 mt-1'>
                      Structured feedback collection and analytics help you
                      identify the best candidates.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='flex-shrink-0 mr-4'>
                    <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 text-indigo-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Scale Your Recruitment
                    </h3>
                    <p className='text-gray-600 mt-1'>
                      Handle more interviews without increasing your team size
                      or workload.
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <Button size='lg'>
                  <Link href='/register'>Start Free Trial</Link>
                </Button>
              </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100'>
              <Image
                src='/images/benefits-illustration.svg'
                alt='Benefits Illustration'
                width={600}
                height={400}
                className='w-full h-auto'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id='testimonials' className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              What Our Customers Say
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Join hundreds of companies that have transformed their hiring
              process
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {/* Testimonial 1 */}
            <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
              <div className='flex items-center mb-4'>
                <MessageSquareQuoteIcon className='h-10 w-10 text-indigo-600 mr-3' />
              </div>
              <p className='text-gray-600 mb-6'>
                "InterviewPro has streamlined our entire hiring process. We've
                cut our time-to-hire by 40% and improved our candidate
                experience dramatically."
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 relative rounded-full overflow-hidden mr-4'>
                  <Image
                    src='/images/testimonial-1.jpg'
                    alt='Sarah Johnson'
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h4 className='font-medium text-gray-900'>Sarah Johnson</h4>
                  <p className='text-gray-500 text-sm'>HR Director, TechCorp</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
              <div className='flex items-center mb-4'>
                <MessageSquareQuoteIcon className='h-10 w-10 text-indigo-600 mr-3' />
              </div>
              <p className='text-gray-600 mb-6'>
                "The automated email notifications and feedback collection have
                been game-changers for our recruitment team. We're more
                efficient and make better hiring decisions."
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 relative rounded-full overflow-hidden mr-4'>
                  <Image
                    src='/images/testimonial-2.jpg'
                    alt='Michael Chen'
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h4 className='font-medium text-gray-900'>Michael Chen</h4>
                  <p className='text-gray-500 text-sm'>
                    Talent Acquisition Lead, GrowthStartup
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
              <div className='flex items-center mb-4'>
                <MessageSquareQuoteIcon className='h-10 w-10 text-indigo-600 mr-3' />
              </div>
              <p className='text-gray-600 mb-6'>
                "As we scaled our team, InterviewPro helped us maintain a
                high-quality hiring process. The analytics give us insights we
                never had before."
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 relative rounded-full overflow-hidden mr-4'>
                  <Image
                    src='/images/testimonial-3.jpg'
                    alt='Alex Rodriguez'
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h4 className='font-medium text-gray-900'>Alex Rodriguez</h4>
                  <p className='text-gray-500 text-sm'>
                    COO, EnterpriseScale Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 bg-indigo-600'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-white mb-6'>
            Ready to Transform Your Hiring Process?
          </h2>
          <p className='text-xl text-indigo-100 mb-10 max-w-3xl mx-auto'>
            Join thousands of companies using InterviewPro to streamline their
            recruitment workflow and make better hiring decisions.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button
              size='lg'
              className='bg-white text-indigo-600 hover:bg-gray-100 px-8'
            >
              <Link href='/register'>Start Free Trial</Link>
            </Button>
            <Button
              size='lg'
              variant='default'
              className='text-white border-white px-8'
            >
              <Link href='/demo'>Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Product</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='#features'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href='#pricing'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href='/security'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href='/enterprise'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4'>Resources</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/blog'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href='/guides'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href='/help'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href='/webinars'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4'>Company</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/about'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/careers'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href='/legal'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Legal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4'>Connect</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='https://twitter.com/interviewpro'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://linkedin.com/company/interviewpro'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://facebook.com/interviewpro'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://instagram.com/interviewpro'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center mb-4 md:mb-0'>
              <BriefcaseIcon className='h-8 w-8 text-indigo-400 mr-2' />
              <span className='text-xl font-bold'>InterviewPro</span>
            </div>
            <div className='text-gray-400 text-sm'>
              © {new Date().getFullYear()} InterviewPro, Inc. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
