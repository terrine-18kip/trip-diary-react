<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\User;
use Exception;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trips = Trip::all();
        return $trips;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $inputs = $request->all();
        $inputs['uniqid'] = uniqid();
        $trip = Trip::create($inputs);
        $trip->users()->sync($request->user_id);
        return $trip;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Trip $trip)
    {
        $trip->users;
        $trip->plans;
        foreach ($trip->plans as $plan) {
            $plan->spots;
        }
        return $trip;
    }

    public function find($uniqid)
    {
        $trip = Trip::where('uniqid', $uniqid)->first();
        $trip->users;
        $trip->plans;
        foreach ($trip->plans as $plan) {
            $plan->spots;
        }
        return $trip;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Trip $trip)
    {
        $trip->update($request->all());
        return $trip;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Trip $trip)
    {
        $trip->delete();
    }

    public function add_member(Request $request, Trip $trip)
    {
        $trip = Trip::find($request->trip_id);
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            throw new Exception('ユーザーが存在しません');
        }
        $trip->users()->syncWithoutDetaching($user->id);
        $trip->users;
        return $trip;
    }

    public function remove_member(Request $request, Trip $trip)
    {
        $trip = Trip::find($request->trip_id);
        $user = User::find($request->user_id);
        $trip->users()->detach($user->id);
        $trip->users;
        return $trip;
    }
}
