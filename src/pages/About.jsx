import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCounter from '../components/common/StatCounter';
import ReviewCard from '../components/hotel-details/ReviewCard';
import FadeUp from '../components/common/FadeUp';
import { StaggerContainer, StaggerItem } from '../components/common/StaggerContainer';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Compass, ShieldCheck, Moon, Heart, Star, Users, Info } from 'lucide-react';

const About = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { 
      icon: <Sparkles className="w-7 h-7 text-[#FF385C]" />, 
      title: "AI-Powered Trip Planner", 
      desc: "Instant personalized itineraries powered by advanced Groq LLM integration. Type your destination and budget to generate your complete roadmap." 
    },
    { 
      icon: <Compass className="w-7 h-7 text-blue-500" />, 
      title: "Attraction Discovery", 
      desc: "Instantly explore nearby attractions, ratings, maps, and local guides surrounding your chosen hotel or destination." 
    },
    { 
      icon: <ShieldCheck className="w-7 h-7 text-emerald-500" />, 
      title: "Dummy Razorpay Payment", 
      desc: "Book hotels, hostel stays, and tour packages securely through our fully functional mock Razorpay sandbox payment gateway." 
    },
    { 
      icon: <Moon className="w-7 h-7 text-purple-500" />, 
      title: "Curated Dark Theme", 
      desc: "Seamless responsive theme switcher with curated, premium HSL tailored dark-mode color palettes for maximum visual comfort." 
    },
    { 
      icon: <Users className="w-7 h-7 text-teal-500" />, 
      title: "Seeded Laravel Backend", 
      desc: "Connected directly to a robust Laravel 11 API + MySQL engine, pre-seeded with test users, packages, rooms, and live reviews." 
    },
    { 
      icon: <Star className="w-7 h-7 text-yellow-500" />, 
      title: "Verified Guest Reviews", 
      desc: "Read real stories, honest experiences, and detailed reviews written by verified travelers from our vibrant community." 
    }
  ];

  const team = [
    { name: "Atul Rathore", role: "Lead Fullstack Developer", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Sarah Jenkins", role: "Co-Founder & CEO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Michael Chen", role: "Product Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Elena Rodriguez", role: "UX Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
  ];

  const testimonials = [
    { id: 1, userName: "Emily Carter", userImage: "https://i.pravatar.cc/150?img=1", rating: 5, date: "October 12, 2023", text: "TravelSarthi made planning our honeymoon completely stress-free. The AI recommendations were spot on, and the hotels were breathtaking!" },
    { id: 2, userName: "James Wilson", userImage: "https://i.pravatar.cc/150?img=11", rating: 5, date: "September 28, 2023", text: "As a solo backpacker, I was amazed by how easy it was to find budget-friendly packages that still offered premium experiences." },
    { id: 3, userName: "Anita Patel", userImage: "https://i.pravatar.cc/150?img=5", rating: 5, date: "August 15, 2023", text: "Excellent customer service. We had a flight delay and their 24/7 support team immediately helped us adjust our hotel reservations without any fees." }
  ];

  return (
    <div className={`min-h-screen pb-20 pt-24 transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Hero Section */}
      <div className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed"></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </div>
        <FadeUp className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-[#FF385C] font-bold tracking-widest uppercase text-sm mb-4 block">About Travel Sarthi</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md tracking-tight leading-tight">
            Redefining Travel Planning <br />
            With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] to-purple-500">Smart Technology</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            We bridge state-of-the-art AI orchestration with a reliable full-stack Laravel database to bring you direct stay reservations, attraction guides, and mock checkout sandboxes.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/packages" className="px-6 py-3.5 bg-[#FF385C] text-white font-bold rounded-xl hover:bg-[#D70466] transition-all shadow-lg hover:-translate-y-0.5">
              Explore Packages
            </Link>
            <Link to="/" className="px-6 py-3.5 bg-white/10 text-white hover:bg-white/20 font-bold rounded-xl backdrop-blur-md transition-all border border-white/20">
              Browse Stays
            </Link>
          </div>
        </FadeUp>
      </div>

      {/* Our Mission & Value */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <FadeUp className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Our Mission & Ecosystem</h2>
            <div className="w-20 h-1.5 bg-[#FF385C] rounded-full"></div>
            <p className={`text-base md:text-lg leading-relaxed pt-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Travel Sarthi was created to solve a common friction point in modern tourism: fragmented planning. By uniting rich search capability with instant AI-driven path itineraries and full-blown mock checkout workflows, we provide travelers and developers with a powerful, immersive travel preview platform.
            </p>
            <p className={`text-base md:text-lg leading-relaxed font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Connecting seamlessly to our seeded backend, you gain access to ready-made users, detailed reviews, realistic coupons, and structured pricing models. It is designed to look premium, react instantly, and execute flawlessly.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-6">
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className="font-extrabold mb-1 text-lg">AI Driven</h4>
                <p className="text-xs text-gray-500 font-bold">Groq LLM Orchestration</p>
              </div>
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className="font-extrabold mb-1 text-lg">Robust Backend</h4>
                <p className="text-xs text-gray-500 font-bold">Laravel 11 & MySQL API</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Planning" className="rounded-3xl w-full h-64 object-cover shadow-lg transform translate-y-8" />
            <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Travelers" className="rounded-3xl w-full h-64 object-cover shadow-lg" />
          </div>
        </FadeUp>
      </div>

      {/* Statistics Section */}
      <div className={`max-w-7xl mx-auto my-6 shadow-xl rounded-3xl py-16 relative overflow-hidden ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-900 text-white'}`}>
        <div className="absolute inset-0 bg-[#FF385C]/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#FF385C] mb-2">
                <StatCounter end={50} suffix="k+" />
              </div>
              <div className="text-gray-300 font-bold tracking-wider uppercase text-xs">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#FF385C] mb-2">
                <StatCounter end={1200} suffix="+" />
              </div>
              <div className="text-gray-300 font-bold tracking-wider uppercase text-xs">Hotels Partnered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#FF385C] mb-2">
                <StatCounter end={300} suffix="+" />
              </div>
              <div className="text-gray-300 font-bold tracking-wider uppercase text-xs">Packages Available</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#FF385C] mb-2">
                <StatCounter end={85} />
              </div>
              <div className="text-gray-300 font-bold tracking-wider uppercase text-xs">Destinations Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features Overview */}
      <div className={`py-24 my-12 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border ${isDarkMode ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50 border-gray-150'}`}>
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Our Premium Core Features</h2>
          <p className={`text-base font-medium mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Explore the powerful components driving our complete travel experience dashboard.
          </p>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <StaggerItem key={idx} className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl group ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-extrabold mb-3 tracking-tight">{feature.title}</h3>
              <p className={`leading-relaxed text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Meet Our Innovators</h2>
          <p className={`text-base font-medium mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            The talented developers and designers crafting state-of-the-art software systems.
          </p>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <StaggerItem key={idx} className="group text-center">
              <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden shadow-md border-4 border-white/10">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-extrabold tracking-tight">{member.name}</h3>
              <p className="text-[#FF385C] font-bold text-xs uppercase mt-1 tracking-wider">{member.role}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Testimonials */}
      <div className={`py-24 my-12 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border ${isDarkMode ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50 border-gray-150'}`}>
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Voices of Our Community</h2>
          <p className={`text-base font-medium mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Read inspiring stories from backpackers and families travel-planning with Travel Sarthi.
          </p>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id} className={`${isDarkMode ? 'dark-card' : ''}`}>
              <ReviewCard review={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeUp className="bg-gradient-to-r from-[#FF385C] to-purple-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 tracking-tight leading-tight">Ready to Unleash Your Next Journey?</h2>
          <p className="text-base md:text-lg text-white/95 mb-10 max-w-2xl mx-auto relative z-10 font-medium">
            Plan your complete visual timeline, choose luxury accommodations, and try out our sandbox booking engine today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/packages" className="px-8 py-4 bg-white text-[#FF385C] font-extrabold rounded-xl hover:bg-gray-50 transition-colors shadow-lg text-sm">
              Explore Packages
            </Link>
            <Link to="/ai-planner" className="px-8 py-4 bg-transparent border-2 border-white text-white font-extrabold rounded-xl hover:bg-white/10 transition-colors text-sm">
              Start AI Trip Planner
            </Link>
          </div>
        </FadeUp>
      </div>

    </div>
  );
};

export default About;
