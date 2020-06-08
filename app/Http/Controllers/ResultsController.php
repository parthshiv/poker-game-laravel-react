<?php

namespace App\Http\Controllers;
use App\Results;
use App\Players;
use Illuminate\Http\Request;
use DB;
class ResultsController extends Controller
{
    public function index()
    {
        /* SQL Query 
            SELECT players.iUserId,players.vUserName, results.bResult, COUNT(*) AS number_of_games, sum(results.bResult) as totalWins
            from results 
            left join players
            on players.iUserId = results.iFK_UserId  
            where results.bResult = 1
            GROUP BY players.vUserName
            ORDER BY results.iFK_UserId desc
         
        */        
         return Results::leftJoin('players', 'results.iFK_UserId', '=', 'players.iUserId')
        ->select(
            DB::raw('COUNT(*) AS totalGames'),
            DB::raw('sum(results.bResult) AS totalWins'),
            "players.vUserName"
            )
        ->groupBy('vUserName')
        ->orderBy('totalWins', 'DESC')        
        ->get();
          
    }
 
    
    public function store(Request $request)
    {   
        if($request){
            
            $this->validate($request, [
                    'vUserName' => 'required',
                    'playerInput' => 'required',
                ],
                [
                    'vUserName.required' => 'Player Name is required field',
                    'playerInput.required' => 'Player Card is required field',
                ]            
            );
            
            //print_r($request->input()->vUserName);
            $playerName = $request->input('vUserName');
            $playerMatchedCount = Players::where('vUserName', $playerName)->pluck('iUserId');
           // print_r($playerMatchedCount);
            // insert for existing player
            if(!empty($playerMatchedCount[0])){
                $results = new Results;
                $results->iFK_UserId = $playerMatchedCount[0];
                $results->iUserScore = $request->input('iUserScore');
                $results->iGeneratedScore = $request->input('iGeneratedScore');
                $results->bResult = $request->input('bResult');
                $results->save();            
                // $results = Results::create($results);            
                // return response()->json($results, 201);
            }
            else{
                // insert in players
                $player = new Players;
                $player->vUserName = $playerName;
                $player->save();
                
                // insert in results
                $results = new Results;
                $results->iFK_UserId = $player->id; // last inserted Id
                $results->iUserScore = $request->input('iUserScore');
                $results->iGeneratedScore = $request->input('iGeneratedScore');
                $results->bResult = $request->input('bResult');
                $results->save();
                
                // $results = Results::create($results);
            
                // return response()->json($results, 201);
                

                
            }

        
        }  
        
    }
 
    
 
   
}
