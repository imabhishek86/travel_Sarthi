<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('reviewable_id') && $request->has('reviewable_type')) {
            return response()->json(Review::where('reviewable_id', $request->reviewable_id)
                ->where('reviewable_type', $request->reviewable_type)->get());
        }
        return response()->json(Review::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reviewable_id' => 'required|string',
            'reviewable_type' => 'required|string|in:hotel,package',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = new Review($validated);
        $review->user_id = $request->user()->id;
        $review->save();

        return response()->json($review, 201);
    }

    public function destroy(Request $request, $id)
    {
        $review = Review::where('user_id', $request->user()->id)->findOrFail($id);
        $review->delete();
        return response()->json(null, 204);
    }
}
