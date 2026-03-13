<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIController extends Controller
{
    public function __construct()
    {
        set_time_limit(120);
    }

    public function askAI(Request $request)
    {
        $prompt = $request->prompt;

        $response = Http::timeout(120)
            ->retry(3, 1000)
            ->post('http://localhost:11434/api/generate', [
                "model" => "llama3",
                "prompt" => $prompt,
                "stream" => false,
                "keep_alive" => -1
            ]);

        $data = $response->json();

        return response()->json(
            ["response" => $data["response"] ?? "No response"]
        );
    }

    public function chat(Request $request)
    {
        $message = $request->message;

        $products = Product::select('title', 'price', 'description')->get();

        $productText = "";

        foreach ($products as $product) {
            $productText .= "
Title: {$product->title}
Price: {$product->price}
Description: {$product->description}

";
        }

        $prompt = "
You are an ecommerce shopping assistant.

Here are products from my handmade store:

$productText

Customer question:
$message

Recommend the best products from the list above.
";

        $response = Http::timeout(120)
            ->retry(3, 1000)
            ->post('http://localhost:11434/api/generate', [
                "model" => "llama3",
                "prompt" => $prompt,
                "stream" => false,
                "keep_alive" => -1
            ]);

        $data = $response->json();

        return response()->json(
            ["response" => $data["response"] ?? "No response"]
        );
    }
}
