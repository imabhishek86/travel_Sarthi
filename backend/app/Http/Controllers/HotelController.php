<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index(Request $request)
    {
        $query = Hotel::query()->with('rooms');
        if ($request->has('available') && $request->available == 'true') {
            $query->whereHas('rooms', function ($q) {
                $q->where('availability', true);
            });
        }
        
        $hotels = $query->get()->map(function ($hotel) {
            return $this->formatHotel($hotel);
        });

        return response()->json($hotels);
    }

    public function show($id)
    {
        $hotel = Hotel::with(['rooms', 'reviews.user'])->findOrFail($id);
        
        $formattedReviews = $hotel->reviews->map(function ($r) {
            return [
                'id' => $r->id,
                'userName' => $r->user->name ?? 'Guest Traveler',
                'userImage' => $r->user->avatar ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
                'date' => $r->created_at ? $r->created_at->diffForHumans() : 'Recently',
                'rating' => $r->rating,
                'text' => $r->comment ?? 'Wonderful experience and stay.',
                'title' => $r->title ?? 'Great Stay!'
            ];
        });

        $hotelData = $this->formatHotel($hotel);
        $hotelData['reviews'] = $formattedReviews;
        
        return response()->json($hotelData);
    }

    private function formatHotel($hotel)
    {
        // Calculate starting price
        $cheapestRoom = $hotel->rooms->where('availability', true)->min('price');
        $price = $cheapestRoom ? (float)$cheapestRoom : 120.00;

        // Extract city from location (e.g. "Malé, Maldives" -> "Malé")
        $locationParts = explode(',', $hotel->location);
        $city = trim($locationParts[0] ?? $hotel->location);

        // Map type based on name keywords
        $nameLower = strtolower($hotel->name);
        $type = 'Luxury Stay';
        if (str_contains($nameLower, 'resort')) {
            $type = 'Resort';
        } elseif (str_contains($nameLower, 'villa')) {
            $type = 'Villa';
        } elseif (str_contains($nameLower, 'lodge')) {
            $type = 'Ski Lodge';
        } elseif (str_contains($nameLower, 'boutique')) {
            $type = 'Boutique Hotel';
        } elseif (str_contains($nameLower, 'camp')) {
            $type = 'Desert Camp';
        } elseif (str_contains($nameLower, 'retreat')) {
            $type = 'Retreat';
        }

        // Distinct amenities based on hotel type
        $amenities = ['Free WiFi', 'Air Conditioning', 'Room Service', 'Spa', 'Fitness Center', 'Bar'];
        if ($type === 'Resort') {
            $amenities = ['Ocean View', 'Private Beach', 'Infinity Pool', 'Free WiFi', 'All Inclusive'];
        } elseif ($type === 'Villa') {
            $amenities = ['Private Pool', 'Kitchen', 'Free WiFi', 'Garden', 'Chef Service'];
        } elseif ($type === 'Ski Lodge') {
            $amenities = ['Fireplace', 'Mountain View', 'Hot Tub', 'Ski-in/Ski-out', 'Free WiFi'];
        } elseif ($type === 'Desert Camp') {
            $amenities = ['Desert View', 'Outdoor Dining', 'Campfire', 'Guided Tour', 'Breakfast Included'];
        }

        // Distinct description
        $description = $hotel->description ?? "Welcome to {$hotel->name}, located in the heart of {$hotel->location}. Experience top-tier hospitality, premium accommodations, and custom-tailored amenities designed to ensure a deeply relaxing and unforgettable stay.";

        // Nearby attractions based on city
        $nearbyAttractions = [
            [
                'name' => 'City Center & Markets',
                'distance' => '1.5 km',
                'image' => 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            ],
            [
                'name' => 'Scenic Viewpoint',
                'distance' => '3.2 km',
                'image' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            ],
            [
                'name' => 'Historical Landmark',
                'distance' => '4.8 km',
                'image' => 'https://images.unsplash.com/photo-1564507592937-25994a9015b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            ]
        ];

        return [
            'id' => $hotel->id,
            'name' => $hotel->name,
            'location' => $hotel->location,
            'rating' => (float)$hotel->rating,
            'image' => $hotel->image,
            'imageUrl' => $hotel->image, // Both keys so frontend never breaks
            'city' => $city,
            'type' => $type,
            'price' => $price,
            'price_per_night' => $price,
            'amenities' => $amenities,
            'description' => $description,
            'nearbyAttractions' => $nearbyAttractions,
            'rooms' => $hotel->rooms,
            'created_at' => $hotel->created_at,
            'updated_at' => $hotel->updated_at,
        ];
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'location' => 'required|string',
            'rating' => 'numeric|min:0|max:5',
            'image' => 'nullable|string',
        ]);
        $hotel = Hotel::create($validated);
        return response()->json($hotel, 201);
    }

    public function update(Request $request, $id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->update($request->all());
        return response()->json($hotel);
    }

    public function destroy($id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->delete();

        return response()->json(null, 204);
    }

    public function uploadImages(Request $request, $id)
    {
        $request->validate([
            'images' => 'required|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        $hotel = Hotel::findOrFail($id);
        $uploadedUrls = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('hotels', 'public');
                $uploadedUrls[] = asset('storage/' . $path);
            }
        }

        $existingImages = $hotel->images ? json_decode($hotel->images, true) : [];
        $mergedImages = array_merge($existingImages, $uploadedUrls);
        
        $hotel->update(['images' => json_encode($mergedImages)]);

        return response()->json(['urls' => $uploadedUrls, 'all_images' => $mergedImages]);
    }
}
