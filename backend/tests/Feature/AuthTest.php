<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    // use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $user = new User();
        $user->name = 'test';
        $user->email = 'test@sample.com';
        $user->password = 'password';
        $saveUser = $user->save();
        $this->assertTrue($saveUser);
    }
}
