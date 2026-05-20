<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('state');
            $table->string('category'); // Beach, Mountain, Heritage, Nature, Adventure
            $table->text('description');
            $table->string('image')->nullable();
            $table->decimal('rating', 2, 1)->default(4.5);
            $table->string('best_time')->nullable(); // e.g. "Oct - Mar"
            $table->json('attractions')->nullable(); // Array of nearby attractions
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('destinations');
    }
};
