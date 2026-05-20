<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('payment_id')->nullable()->after('status');
            $table->string('payment_method')->nullable()->after('payment_id');
            $table->string('razorpay_order_id')->nullable()->after('payment_method');
            $table->string('razorpay_signature')->nullable()->after('razorpay_order_id');
            $table->string('booking_type')->default('package')->after('razorpay_signature'); // package, hotel, transport
            $table->foreignId('destination_id')->nullable()->after('package_id')->constrained()->nullOnDelete();
            $table->string('transport_type')->nullable()->after('booking_type'); // flight, bus, taxi
            $table->string('transport_details')->nullable()->after('transport_type');
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'payment_id', 'payment_method', 'razorpay_order_id',
                'razorpay_signature', 'booking_type', 'destination_id',
                'transport_type', 'transport_details'
            ]);
        });
    }
};
