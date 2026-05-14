import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Gallery from '../components/hotel-details/Gallery'; // Reusing gallery component
import PackageBookingSidebar from '../components/packages/PackageBookingSidebar';
import PackageService from '../services/package.service';

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackageDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await PackageService.getPackageById(id);
      const pkgData = response.data;
      
      const formattedPkg = {
        ...pkgData,
        days: pkgData.duration_days || pkgData.days,
        duration: pkgData.duration_days ? `${pkgData.duration_days} Days / ${pkgData.duration_days - 1} Nights` : (pkgData.duration || "7 Days / 6 Nights"),
        gallery: pkgData.images?.length > 0 ? pkgData.images : [
          pkgData.imageUrl || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        includes: pkgData.includes || ["Accommodation", "Breakfast", "Airport Transfers", "Sightseeing"],
        excludes: pkgData.excludes || ["Flights", "Personal Expenses", "Travel Insurance"],
        itinerary: pkgData.itinerary?.length > 0 ? pkgData.itinerary : [
          { day: 1, title: "Arrival", description: "Welcome and transfer to hotel." },
          { day: 2, title: "Sightseeing", description: "Full day tour of the main attractions." },
          { day: 3, title: "Departure", description: "Transfer to the airport." }
        ],
        rating: pkgData.rating || 4.5,
        reviewsCount: pkgData.reviewsCount || 120,
        imageUrl: pkgData.imageUrl || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      };

      setPkg(formattedPkg);
    } catch (err) {
      console.error('Failed to fetch package details:', err);
      setError('We could not find the package details you were looking for.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackageDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 mt-20 animate-pulse">
        <div className="h-[500px] bg-gray-200 rounded-3xl mb-12"></div>
        <div className="flex gap-10">
          <div className="w-2/3 space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="w-1/3 h-[500px] bg-gray-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 mt-20 text-center">
        <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Error Loading Package</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={fetchPackageDetails}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!pkg) return <div className="text-center py-20 mt-20">Package not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[70vh] bg-dark flex items-end pb-16">
        <div className="absolute inset-0">
          <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary px-4 py-1.5 rounded-lg text-sm font-bold text-white uppercase tracking-wider">
              {pkg.category}
            </span>
            <div className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-medium text-sm border border-white/30">
              ⭐ {pkg.rating} ({pkg.reviewsCount} Reviews)
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            {pkg.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {pkg.destination}
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {pkg.duration}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column */}
          <div className="w-full lg:w-2/3 space-y-10">
            
            {/* Overview Box */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-4">Tour Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {pkg.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                <div>
                  <h3 className="text-lg font-bold text-dark flex items-center gap-2 mb-4">
                    <span className="text-green-500 text-xl">✓</span> Included
                  </h3>
                  <ul className="space-y-3">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark flex items-center gap-2 mb-4">
                    <span className="text-red-500 text-xl">✗</span> Excluded
                  </h3>
                  <ul className="space-y-3">
                    {pkg.excludes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-8">Day-wise Itinerary</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
                {pkg.itinerary.map((day, idx) => (
                  <div key={idx} className="relative flex items-start md:justify-center">
                    <div className="absolute left-0 md:left-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow-md md:-translate-x-1/2 text-sm font-bold">
                      D{day.day}
                    </div>
                    <div className="pl-16 md:pl-0 w-full md:w-1/2 md:even:pr-12 md:odd:pl-12 md:even:text-right md:odd:ml-auto">
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-primary/30 transition-colors shadow-sm">
                        <h4 className="text-lg font-bold text-dark mb-2">{day.title}</h4>
                        <p className="text-gray-600 leading-relaxed text-sm">{day.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-6">Gallery</h2>
              <Gallery images={pkg.gallery} />
            </div>

          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3">
            <PackageBookingSidebar price={pkg.price} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
