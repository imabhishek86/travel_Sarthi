<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        // Return only the authenticated user's bookings
        return response()->json($request->user()->bookings ?? Booking::where('user_id', $request->user()->id)->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bookable_id' => 'required|string',
            'bookable_type' => 'required|string|in:hotel,package',
            'booking_date' => 'required|date',
            'total_price' => 'required|numeric',
            'guests' => 'required|integer|min:1',
        ]);

        $booking = new Booking($validated);
        $booking->user_id = $request->user()->id;
        $booking->status = 'pending';
        $booking->payment_status = 'unpaid';
        $booking->save();

        return response()->json($booking, 201);
    }

    public function show(Request $request, $id)
    {
        $booking = Booking::where('user_id', $request->user()->id)->findOrFail($id);
        return response()->json($booking);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::where('user_id', $request->user()->id)->findOrFail($id);
        $booking->update($request->only(['status', 'payment_status']));
        return response()->json($booking);
    }

    public function destroy(Request $request, $id)
    {
        $booking = Booking::where('user_id', $request->user()->id)->findOrFail($id);
        $booking->delete();
        return response()->json(null, 204);
    }
}
