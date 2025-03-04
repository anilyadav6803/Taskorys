import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { User } from "@/models/users";

connectDb();
export async function GET(request) {
  var users = [];
  try {
    users = await User.find();
    
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch users",
      },
      { status: 500 }
    );
    
  }
  return NextResponse.json(users);
}

export async function POST(request) {
  //fetch user details from request
  const { name, email, password } = await request.json();
  const user = new User({
    name,
    email,
    password,
  });

  //create  user model with user model
  try {
    // Save the object in DB
    const createdUser = await user.save();
    return NextResponse.json(createdUser, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create user",
      },
      { status: 500 }
    );
  }
  
}

export async function DELETE(request, { params }) {
    const { userid } = params;
  
    try {
      await User.deleteOne({ _id: userid }); // Use `id`, not `user_id`
      return NextResponse.json(
        {
          message: "User deleted successfully",
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "Failed to delete user",
        },
        { status: 500 }
      );
    }
  }
  


export function PUT(request) {
  return new Response(JSON.stringify({ name: "John Doe" }), {
    status: 200,
    statusText: "User updated successfully",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
