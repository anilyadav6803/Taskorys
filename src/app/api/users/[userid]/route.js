import { NextResponse } from "next/server";

import { User } from "@/models/users";

export async function GET(request, { params }) {
  const { userid } = params;
  try {
    const user = await User.findById(userid);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch user",
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

export async function PUT(request, { params }) {
  const { userid } = params;
  const { name, password } = await request.json();

  try {
    const user = await User.findById(userid);
    user.name = name;
    user.password = password;

    const updatedUser = await user.save();

    return NextResponse.json(updatedUser, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update user",
      },
      { status: 500 }
    );
  }
}
