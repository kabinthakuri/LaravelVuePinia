<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class createUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:user {name} {email} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'create a new user';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('name');
        $email = $this->argument('email');
        $password = bcrypt($this->argument('password'));
        \App\Models\User::create([
            "email" => $email,
            "name" => $name,
            "password" => $password
        ]);
        $this->info("successfull created user with email: " . $email);
    }
}
