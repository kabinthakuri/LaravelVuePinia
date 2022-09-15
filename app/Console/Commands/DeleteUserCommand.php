<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DeleteUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:user {--name=} {--id=} {--email=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete user';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->option('name');
        $email = $this->option('email');
        $id = $this->option('id');
        \App\Models\User::when($name, function($query, $name){
            $query->whereName($name);
        })->when($email, function($query, $email){
            $query->whereEmail($email);
        })->when($id, function($query, $id){
            $query->whereId($id);
        })->delete();
        $this->info("User deleted successfully.");
    }
}
