import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

await connectDB();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { groupName, selectedUsers } = reqBody;
    console.log(groupName);
    const loggedId = await getDataFromToken(request);
    const loggedUser = await User.findOne({
      _id: loggedId,
    });
    
    // Push the logged-in user into selectedUsers with isAdmin: true
    selectedUsers.push({ username: loggedUser.username, id: loggedId, isAdmin: true });

    const responses = await Promise.all(
      selectedUsers.map(async (item) => {
        // Determine if the current item is the logged-in user
        const isAdmin = item.id === loggedId;
        
        return User.updateOne(
          { _id: item.id },
          {
            $push: {
              groups: {
                groupName: groupName,
                members: selectedUsers,
                isAdmin: isAdmin // Set isAdmin field based on if the current user is logged-in user
              },
            },
          }
        );
      })
    );
    console.log(responses);
    const unacknowledged = responses.some((response) => !response.acknowledged);
    if (unacknowledged) {
      throw new Error(
        "Some update operations were not acknowledged by the server"
      );
    }

    return NextResponse.json({ message: "Groups updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
