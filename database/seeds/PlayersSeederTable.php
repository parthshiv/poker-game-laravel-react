<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Players;

class PlayersSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        for ($i = 0; $i < 10; $i++) {            
            Players::create([        	
                'vUserName' => $faker->username(10),        	
            ]);
        }
    }
}
