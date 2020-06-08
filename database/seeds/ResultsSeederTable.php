<?php

use Illuminate\Database\Seeder;
use App\Results;

class ResultsSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
 
        // Create 50 product records
        for ($i = 0; $i < 10; $i++) {

            $iUserScore = $faker->numberBetween(1,9);
            $iGeneratedScore = $faker->numberBetween(1,9);
            if($iUserScore > $iGeneratedScore)
                $bResult = "1";
            else
                $bResult = "0";
            Results::create([
                'iFK_UserId' => $faker->numberBetween(1,10),
                'iUserScore' => $iUserScore,
                'iGeneratedScore' => $iGeneratedScore,                
                'bResult' => $bResult
            ]);
        }
    }
}
