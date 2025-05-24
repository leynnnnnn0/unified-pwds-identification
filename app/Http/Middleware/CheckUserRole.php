<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user() || $request->user()->role !== $role) {
            if ($request->user()->role === 'api-user') {
                return redirect()->route('landing-page')->with('error', 'Unauthorized access.');
            } elseif ($request->user()->role === 'admin') {
                return redirect()->route('admin.dashboard.index')->with('error', 'Unauthorized access.');
            } else {
                return redirect()->route('dashboard')->with('error', 'Unauthorized access.');
            }
        }
        return $next($request);
    }
}
