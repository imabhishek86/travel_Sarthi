import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCounter from '../components/common/StatCounter';
import ReviewCard from '../components/hotel-details/ReviewCard';
import FadeUp from '../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { icon: "🗺️", title: "Smart Destination Planning", desc: "Our intuitive tools help you map out the perfect itinerary based on your unique interests and budget." },
    { icon: "🏨", title: "Luxury Hotel Booking", desc: "Access exclusive deals at top-rated resorts and boutique hotels around the globe." },
    { icon: "💰", title: "Budget Travel Planning", desc: "Discover incredible experiences that won't break the bank with our smart budget optimizer." },
    { icon: "🤖", title: "AI Recommendations", desc: "Get personalized travel suggestions powered by advanced algorithms matching your past preferences." },
    { icon: "🔒", title: "Secure Booking", desc: "Book with confidence knowing your transactions and personal data are protected by bank-level security." },
    { icon: "🎧", title: "24/7 Support", desc: "Our dedicated travel experts are available around the clock to assist you anywhere in the world." }
  ];

  const team = [
    { name: "Sarah Jenkins", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Michael Chen", role: "Head of Operations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Elena Rodriguez", role: "Lead Travel Expert", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "David Kim", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
  ];

  const testimonials = [
    { id: 1, userName: "Emily Carter", userImage: "https://i.pravatar.cc/150?img=1", rating: 5, date: "October 12, 2023", text: "TravelSaarthi made planning our honeymoon completely stress-free. The AI recommendations were spot on, and the hotels were breathtaking!" },
    { id: 2, userName: "James Wilson", userImage: "https://i.pravatar.cc/150?img=11", rating: 5, date: "September 28, 2023", text: "As a solo backpacker, I was amazed by how easy it was to find budget-friendly packages that still offered premium experiences." },
    { id: 3, userName: "Anita Patel", userImage: "https://i.pravatar.cc/150?img=5", rating: 4, date: "August 15, 2023", text: "Excellent customer service. We had a flight delay and their 24/7 support team immediately helped us adjust our hotel reservations without any fees." }
  ];

  return (
    <div className="bg-white min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed"></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <FadeUp className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <span className="text-[#FF385C] font-bold tracking-widest uppercase text-sm mb-4 block">About Us</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
            Redefining How You <span className="text-[#FF385C]">Experience</span> the World
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            We are a smart tourism platform dedicated to crafting unforgettable journeys through innovative technology and expert local knowledge.
          </p>
          <Link to="/packages" className="inline-block px-8 py-4 bg-[#FF385C] text-white font-bold rounded-xl hover:bg-[#D70466] transition-all shadow-lg hover:-translate-y-1">
            Discover Our Packages
          </Link>
        </FadeUp>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <FadeUp className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Our Mission & Vision</h2>
            <div className="w-20 h-1.5 bg-[#FF385C] rounded-full"></div>
            <p className="text-lg text-gray-600 leading-relaxed pt-4 font-medium">
              Founded in 2023, TravelSaarthi was born out of a simple idea: travel planning shouldn't be a chore. It should be the exciting first step of your adventure. 
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              Our mission is to democratize premium travel by leveraging smart technology. We envision a world where anyone can access personalized, luxury travel experiences regardless of their budget or destination. We don't just book trips; we create seamless, end-to-end travel experiences that leave lasting memories.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-1 text-xl">Innovation</h4>
                <p className="text-sm text-gray-500 font-medium">Pioneering AI in tourism</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-1 text-xl">Authenticity</h4>
                <p className="text-sm text-gray-500 font-medium">Real local experiences</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Travel 1" className="rounded-3xl w-full h-64 object-cover shadow-lg transform translate-y-8" />
            <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Travel 2" className="rounded-3xl w-full h-64 object-cover shadow-lg" />
          </div>
        </FadeUp>
      </div>

      {/* Statistics Section */}
      <div className="bg-gray-900 text-white py-20 relative overflow-hidden rounded-3xl max-w-7xl mx-auto my-6 shadow-xl">
        <div className="absolute inset-0 bg-[#FF385C]/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-5xl font-extrabold text-[#FF385C] mb-2">
                <StatCounter end={50} suffix="k+" />
              </div>
              <div className="text-gray-300 font-bold tracking-wider uppercase text-xs">Happy Travelers</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#FF385C] mb-2">
                <StatCounter end={1200} suffix="+" />
              </div>
              <div className="text-gray-300 font-bold tracking-wider uppercase text-xs">Hotels Partnered</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#FF385C] mb-2">
                <StatCounter end={300} suffix="+" />
              </div>
              <div className="text-gray-300 font-bold tracking-wider uppercase text-xs">Packages Available</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#FF385C] mb-2">
                <StatCounter end={85} />
              </div>
              <div className="text-gray-300 font-bold tracking-wider uppercase text-xs">Destinations Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 my-12 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-sm">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Why Choose TravelSaarthi?</h2>
          <p className="text-lg text-gray-500 font-medium">We bring you the best tools and services to make your travel planning effortless and exciting.</p>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <StaggerItem key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-16 h-16 bg-[#FF385C]/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm font-medium">{feature.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Meet Our Experts</h2>
          <p className="text-lg text-gray-500 font-medium">The passionate people working behind the scenes to make your dream vacations a reality.</p>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <StaggerItem key={idx} className="group text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">{member.name}</h3>
              <p className="text-[#FF385C] font-semibold text-sm mt-0.5">{member.role}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-24 my-12 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-sm">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">What Our Travelers Say</h2>
          <p className="text-lg text-gray-500 font-medium">Don't just take our word for it. Here are some stories from our community.</p>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <ReviewCard review={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeUp className="bg-gradient-to-r from-primary to-purple-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10">Ready for your next adventure?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of happy travelers and let us help you plan the trip of a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/packages" className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
              Explore Packages
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </FadeUp>
      </div>

    </div>
  );
};

export default About;
