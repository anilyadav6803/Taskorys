import { NextResponse } from "next/server";

export function GET(request) {

    const users = [{
        name    : "John Doe",
        age     : 30,
        address : "123 Main St",
        city    : "New York",
        state   : "NY",
        zip     : "10001"
    },
    {
        name    : "Jane Doe",
        age     : 25,
        address : "456 Main St",
        city    : "Los Angeles",
        state   : "CA",
        zip     : "90001"
    },
    {
        name    : "Bob Smith",
        age     : 35,
        address : "789 Main St",
        city    : "Chicago",
        state   : "IL",
        zip     : "60601"
    }];
    return NextResponse.json(users);
}

export function POST(request) {
    return new Response(JSON.stringify({ name: "John Doe" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export function DELETE(request) {
    return new Response(JSON.stringify({ name: "John Doe" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        message: "User deleted successfully",
    });
}

export  function PUT(request) {
    return new Response(JSON.stringify({ name: "John Doe" }), {
        status: 200,  statusText : "User updated successfully",
        headers: {
            "Content-Type": "application/json",
        },
    });
}