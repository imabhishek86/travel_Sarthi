<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiTripPlannerController extends Controller
{
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'destination' => 'required|string|max:255',
            'days' => 'required|integer|min:1|max:14',
            'travelers' => 'required|integer|min:1|max:20',
            'budget' => 'required|in:budget,mid,luxury',
        ]);

        $groqKey = config('services.groq.key');

        if (!$groqKey) {
            return response()->json(['error' => 'Groq API key not configured'], 500);
        }

        $budgetLabel = match ($validated['budget']) {
            'budget' => 'budget-friendly (hostels, street food, public transport)',
            'mid' => 'mid-range (3-4 star hotels, restaurants, private transport)',
            'luxury' => 'luxury (5 star resorts, fine dining, chauffeur driven)',
        };

        $prompt = "You are an expert Indian travel planner. Create a detailed {$validated['days']}-day travel itinerary for {$validated['destination']} for {$validated['travelers']} travelers on a {$budgetLabel} budget.

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  \"destination\": \"{$validated['destination']}\",
  \"days\": {$validated['days']},
  \"travelers\": {$validated['travelers']},
  \"itinerary\": [
    {
      \"day\": 1,
      \"title\": \"Day title\",
      \"activities\": [
        {\"time\": \"08:00\", \"activity\": \"Activity description\", \"icon\": \"sun|camera|food|compass\", \"cost\": 500}
      ]
    }
  ],
  \"estimatedCost\": {
    \"activities\": 5000,
    \"hotel\": 8000,
    \"transport\": 3000,
    \"total\": 16000
  },
  \"tips\": [\"tip1\", \"tip2\", \"tip3\", \"tip4\"]
}

Each day should have 5-6 activities. Costs should be in INR (₹). Include real places, restaurants, and experiences specific to {$validated['destination']}. Tips should be practical and location-specific.";

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $groqKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'llama-3.3-70b-versatile',
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a travel planning AI. Always respond with valid JSON only. No markdown formatting.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'temperature' => 0.7,
                'max_tokens' => 4000,
            ]);

            if ($response->failed()) {
                return response()->json(['error' => 'AI service temporarily unavailable'], 503);
            }

            $content = $response->json('choices.0.message.content');
            
            // Clean up potential markdown wrapping
            $content = preg_replace('/^```json\s*/i', '', trim($content));
            $content = preg_replace('/\s*```$/i', '', $content);

            $plan = json_decode($content, true);

            if (!$plan || !isset($plan['itinerary'])) {
                return response()->json(['error' => 'Failed to parse AI response'], 500);
            }

            return response()->json($plan);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'AI service error: ' . $e->getMessage()
            ], 500);
        }
    }
}
