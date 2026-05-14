<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Favorite::where('user_id', $request->user()->id)->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'favorable_id' => 'required|string',
            'favorable_type' => 'required|string|in:hotel,package',
        ]);

        $favorite = Favorite::firstOrCreate([
            'user_id' => $request->user()->id,
            'favorable_id' => $validated['favorable_id'],
            'favorable_type' => $validated['favorable_type'],
        ]);

        return response()->json($favorite, 201);
    }

    public function destroy(Request $request, $id)
    {
        $favorite = Favorite::where('user_id', $request->user()->id)->findOrFail($id);
        $favorite->delete();
        return response()->json(null, 204);
    }
}
