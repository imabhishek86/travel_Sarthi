<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DestinationController extends Controller
{
    public function index(Request $request)
    {
        $destinations = Destination::active()
            ->byCategory($request->category)
            ->search($request->search)
            ->orderBy('rating', 'desc')
            ->get();

        return response()->json($destinations);
    }

    public function show($id)
    {
        $destination = Destination::findOrFail($id);
        return response()->json($destination);
    }

    // Admin CRUD
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'category' => 'required|in:Beach,Mountain,Heritage,Nature,Adventure',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'best_time' => 'nullable|string',
            'attractions' => 'nullable|array',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $destination = Destination::create($validated);
        return response()->json($destination, 201);
    }

    public function update(Request $request, $id)
    {
        $destination = Destination::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'state' => 'sometimes|string|max:255',
            'category' => 'sometimes|in:Beach,Mountain,Heritage,Nature,Adventure',
            'description' => 'sometimes|string',
            'image' => 'nullable|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'best_time' => 'nullable|string',
            'attractions' => 'nullable|array',
            'is_active' => 'nullable|boolean',
        ]);

        $destination->update($validated);
        return response()->json($destination);
    }

    public function destroy($id)
    {
        $destination = Destination::findOrFail($id);
        $destination->delete();
        return response()->json(['message' => 'Destination deleted']);
    }
}
