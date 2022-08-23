<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function test_loginSuccess()
    {
        $loginData = [
            'email' => 'test@sample.com',
            'password' => 'password',
        ];

        $this->json('POST', 'login', $loginData)
            ->assertStatus(200);
    }

    public function test_loginFail_emailInvalid()
    {
        $loginData = [
            'email' => 'sample@sample.com',
            'password' => 'password',
        ];

        $this->json('POST', 'login', $loginData)
            ->assertStatus(500);
    }

    public function test_loginFail_passwordInvalid()
    {
        $loginData = [
            'email' => 'test@sample.com',
            'password' => 'passwordd',
        ];

        $this->json('POST', 'login', $loginData)
            ->assertStatus(500);
    }

    public function test_loginFail_emailBlank()
    {
        $loginData = [
            'email' => '',
            'password' => 'password',
        ];

        $this->json('POST', 'login', $loginData)
            ->assertStatus(422);
    }

    public function test_loginFail_passwordBlank()
    {
        $loginData = [
            'email' => 'test@sample.com',
            'password' => '',
        ];

        $this->json('POST', 'login', $loginData)
            ->assertStatus(422);
    }
}
