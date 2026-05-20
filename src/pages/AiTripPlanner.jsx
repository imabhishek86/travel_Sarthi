import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Calendar, Users, Loader2, ChevronRight, Star, Clock, IndianRupee, Compass, Sun, Utensils, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { aiService } from '../services/payment.service';
import { destinationService } from '../services/destination.service';
import toast from 'react-hot-toast';

const IconMap = ({ icon }) => {
  const cls = "w-4 h-4";
  if (icon === 'sun') return <Sun className={cls + " text-amber-500"} />;
  if (icon === 'camera') return <Camera className={cls + " text-blue-500"} />;
  if (icon === 'food') return <Utensils className={cls + " text-green-500"} />;
  return <Compass className={cls + " text-purple-500"} />;
};

const AiTripPlanner = () => {
  const { isDarkMode } = useTheme();
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState('mid');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [expandedDay, setExpandedDay] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data } = await destinationService.getAll();
        setDestinations(data || []);
      } catch (err) {
        console.error('Failed to fetch destinations', err);
      }
    };
    fetchDestinations();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;
    setLoading(true);
    setPlan(null);
    setError('');

    try {
      const { data } = await aiService.generateTripPlan({
        destination,
        days,
        travelers,
        budget,
      });
      setPlan(data);
      setExpandedDay(1);
    } catch (err) {
      console.error('AI Plan generation failed:', err);
      setError(err.response?.data?.error || 'Failed to generate trip plan. Please try again.');
      toast.error('Failed to generate plan');
    } finally {
      setLoading(false);
    }
  };

  const bg = isDarkMode ? 'bg-gray-950' : 'bg-gray-50';
  const card = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100';
  const text = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const textSub = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const input = isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400';

  return (
    <div className={`min-h-screen ${bg} pb-20 pt-6`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF385C] to-[#FF6B6B] text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" /> AI-Powered Trip Planner
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold ${text} mb-3`}>Plan Your Dream Trip in Seconds</h1>
          <p className={`${textSub} max-w-xl mx-auto text-base`}>
            Powered by AI — tell us where you want to go and we'll create a personalized day-by-day itinerary with real activities, costs, and local tips.
          </p>
        </div>

        {/* Quick Picks from backend */}
        {destinations.length > 0 && (
          <div className="mb-8">
            <h3 className={`text-sm font-bold ${textSub} uppercase tracking-wider mb-3`}>Popular Destinations</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {destinations.slice(0, 6).map(d => (
                <button key={d.id} onClick={() => setDestination(d.name)}
                  className={`relative rounded-xl overflow-hidden aspect-square group border-2 transition-all ${destination === d.name ? 'border-[#FF385C] ring-2 ring-[#FF385C]/30 scale-105' : isDarkMode ? 'border-gray-800 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'}`}>
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-bold">{d.name}</p>
                    <p className="text-white/70 text-[10px]">{d.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleGenerate} className={`${card} border rounded-2xl p-6 shadow-lg mb-10`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className={`block text-sm font-bold ${text} mb-1.5`}><MapPin className="inline w-4 h-4 mr-1 text-[#FF385C]" />Destination</label>
              <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Goa, Manali..."
                className={`w-full px-4 py-3 rounded-xl ${input} border font-medium text-sm focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] outline-none transition`} required />
            </div>
            <div>
              <label className={`block text-sm font-bold ${text} mb-1.5`}><Calendar className="inline w-4 h-4 mr-1 text-[#FF385C]" />Days</label>
              <select value={days} onChange={e => setDays(+e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${input} border font-medium text-sm focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] outline-none transition`}>
                {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} {n===1?'Day':'Days'}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-bold ${text} mb-1.5`}><Users className="inline w-4 h-4 mr-1 text-[#FF385C]" />Travelers</label>
              <select value={travelers} onChange={e => setTravelers(+e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${input} border font-medium text-sm focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] outline-none transition`}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1?'Person':'People'}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-bold ${text} mb-1.5`}><IndianRupee className="inline w-4 h-4 mr-1 text-[#FF385C]" />Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${input} border font-medium text-sm focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] outline-none transition`}>
                <option value="budget">Budget</option>
                <option value="mid">Mid-Range</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading || !destination.trim()}
            className="w-full sm:w-auto bg-gradient-to-r from-[#FF385C] to-[#FF6B6B] hover:from-[#D70466] hover:to-[#FF385C] text-white font-bold py-3.5 px-10 rounded-xl transition-all shadow-lg shadow-[#FF385C]/20 disabled:opacity-50 flex items-center justify-center gap-2 mx-auto text-base">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Plan...</> : <><Sparkles className="w-5 h-5" /> Generate Trip Plan</>}
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className={`${card} border rounded-2xl p-10 text-center`}>
            <div className="ai-glow w-16 h-16 rounded-full bg-gradient-to-r from-[#FF385C] to-[#FF6B6B] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <p className={`${text} font-bold text-lg`}>AI is crafting your perfect trip...</p>
            <p className={`${textSub} text-sm mt-1`}>Analyzing destinations, weather, local events & more</p>
            <div className="mt-6 max-w-md mx-auto space-y-3">
              {['Finding best attractions', 'Optimizing daily schedule', 'Calculating costs'].map((t, i) => (
                <div key={i} className="ai-shimmer rounded-lg h-8" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className={`${card} border border-red-300 rounded-2xl p-6 text-center`}>
            <p className="text-red-500 font-bold mb-2">⚠️ {error}</p>
            <p className={textSub}>Please try again or choose a different destination.</p>
          </div>
        )}

        {/* Results */}
        {plan && !loading && (
          <div className="space-y-6">
            <div className={`${card} border rounded-2xl p-6`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                  <h2 className={`text-2xl font-extrabold ${text}`}>Your {plan.destination} Itinerary</h2>
                  <p className={`${textSub} text-sm`}>{plan.days} days · {plan.travelers} travelers · {budget === 'budget' ? 'Budget' : budget === 'mid' ? 'Mid-Range' : 'Luxury'}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs ${textSub} font-semibold uppercase`}>Estimated Total</p>
                  <p className="text-2xl font-extrabold text-[#FF385C]">₹{(plan.estimatedCost?.total || 0).toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {(plan.itinerary || []).map(d => (
                  <button key={d.day} onClick={() => setExpandedDay(d.day)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${expandedDay === d.day ? 'bg-[#FF385C] text-white shadow-md' : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    Day {d.day}
                  </button>
                ))}
              </div>

              {(plan.itinerary || []).filter(d => d.day === expandedDay).map(day => (
                <div key={day.day}>
                  <h3 className={`text-lg font-bold ${text} mb-4`}>{day.title}</h3>
                  <div className="space-y-3">
                    {(day.activities || []).map((a, i) => (
                      <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}>
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
                          <IconMap icon={a.icon} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm ${text}`}>{a.activity}</p>
                          <p className={`text-xs ${textSub} mt-0.5`}>{a.time}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-[#FF385C]">{a.cost > 0 ? `₹${a.cost}` : 'Free'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            {plan.estimatedCost && (
              <div className={`${card} border rounded-2xl p-6`}>
                <h3 className={`text-lg font-bold ${text} mb-4`}>💰 Cost Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Activities & Experiences', val: plan.estimatedCost.activities },
                    { label: 'Hotel / Stay', val: plan.estimatedCost.hotel },
                    { label: 'Local Transport', val: plan.estimatedCost.transport },
                  ].map(r => (
                    <div key={r.label} className={`flex justify-between py-2 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                      <span className={textSub}>{r.label}</span>
                      <span className={`font-bold ${text}`}>₹{(r.val || 0).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2">
                    <span className={`font-bold text-lg ${text}`}>Total (per person)</span>
                    <span className="font-extrabold text-xl text-[#FF385C]">₹{(plan.estimatedCost.total || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tips */}
            {plan.tips && plan.tips.length > 0 && (
              <div className={`${card} border rounded-2xl p-6`}>
                <h3 className={`text-lg font-bold ${text} mb-4`}>💡 Travel Tips</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {plan.tips.map((tip, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-amber-50'}`}>
                      <span className="text-amber-500 text-lg">✦</span>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <Link to="/packages" className="inline-flex items-center gap-2 bg-[#FF385C] hover:bg-[#D70466] text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg">
                Browse Matching Packages <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiTripPlanner;
