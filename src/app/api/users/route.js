import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { User } from "@/models/users";
import bcryptjs from "bcryptjs";


connectDb();
export async function GET(request) {
  var users = [];
  try {
    users = await User.find({} , { password: 0 }); // Exclude password field
    
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
  const { name, email, password } = await request.json();
  const user = new User({
    name,
    email,
    password,
  });

  try {
    user.password = await bcryptjs.hash(user.password, parseInt(process.env.BCRYPT_SALT));

    const createdUser = await user.save();

    // Convert to plain object and remove the password
    const userResponse = createdUser.toObject();
    delete userResponse.password;

    return NextResponse.json(userResponse, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user" },
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
