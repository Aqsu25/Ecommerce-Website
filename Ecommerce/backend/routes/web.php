<?php

use App\Http\Controllers\AIController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});



Route::post('/ai/ask', [AIController::class, 'askAI']);
Route::post('/ai/chat', [AIController::class, 'chat']);

require __DIR__ . '/auth.php';
