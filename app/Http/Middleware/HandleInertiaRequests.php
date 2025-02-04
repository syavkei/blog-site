<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = Auth::user();

        if ($user) {
            $user->with('roles');

            $user = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles,
                'permissions' => $user->getAllPermissions(),
            ];
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'message' => collect(Arr::only($request->session()->all(), ['success', 'error']))->mapWithKeys(function ($body, $type) {
                return [
                    'type' => $type,
                    'body' => $body
                ];
            }),
        ];
    }
}
