<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spot;

class SpotController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Spot::create($request->all());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Spot $spot)
    {
        $inputs = $request->all();
        $inputs['order'] = $spot->order;
        $spot->update($inputs);
        return $spot;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Spot $spot)
    {
        $spot->delete();
    }

    public function order(Request $request)
    {
        $spots = $request->all();
        $data = array();
        foreach ($spots as $index => $spot) {
            $spot['order'] = $index;
            unset($spot['created_at']);
            unset($spot['updated_at']);
            array_push($data, $spot);
        }
        return Spot::upsert($data, ['id'], ['order']);
    }
}
