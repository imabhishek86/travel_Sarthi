import React, { useEffect, useState } from 'react';
import PackageCard from '../../components/PackageCard';
import PackageCardSkeleton from '../../components/PackageCardSkeleton';
import EmptyState from '../../components/EmptyState';
import api from '../../services/api';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data } = await api.get('/favorites');
      setFavorites(data);
    } catch (error) {
      console.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="border-b border-gray-200 pb-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Wishlists</h1>
        <p className="text-lg text-gray-500 mt-1 font-medium">Explore and plan your saved stays and favorite experiences.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <PackageCardSkeleton key={i} />)}
        </div>
      ) : favorites.length === 0 ? (
        <EmptyState 
          icon={Heart} 
          title="No favorites yet" 
          subtitle="You haven't saved any packages to your favorites. Browse our collection to find your next adventure!"
          actionLabel="Browse Packages"
          onAction={() => window.location.href = '/packages'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(pkg => (
            <PackageCard key={pkg.id} pkg={{...pkg, is_favorited: true}} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
