import { NextResponse } from "next/server";

export const getresponseMessage = (statuscode, message, successStatus) => {
    return NextResponse.json(
        {
            message: message,
            success: successStatus,
        },
        {
            status: statuscode,
        }
    );
};