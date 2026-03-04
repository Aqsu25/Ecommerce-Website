<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($productId)
    {
        $product = Product::findOrFail($productId);
        $comments = Comment::where('product_id', $product->id)->with('user')->orderBy('created_at', 'ASC')->get();
        return response()->json([
            'status' => 200,
            'data' => $comments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $productId)
    {
        $product = Product::findOrFail($productId);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => "Product Not Found!",
                'data' => []
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'comment' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        $comment = Comment::create(
            [
                'comment' => $request->comment,
                'user_id' => auth()->id(),
                'product_id' => $product->id,
                'status' => 'active',
            ]
        );
        return response()->json([
            'status' => 200,
            'message' => "Comment Added Successfully!",
            'data' => $comment,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment == null) {
            return response()->json([
                'status' => 404,
                'message' => "Comment Not Found!",
                'data' => []
            ], 404);
        }
        $comment->delete();
        return response()->json([
            'status' => 200,
            'message' => "Comment Deleted Successfully!",

        ], 200);
    }
}
