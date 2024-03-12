"use server";

import { getUserByEmail } from "@/data/user";

async function getCollectionData(
    userEmail: string | null,
    wallets: string | null
  ) {
    // // console.log("__________Inside getCollectionData_____________");
    // // console.log("user session", userEmail, typeof userEmail);
    // // console.log(wallets, typeof wallets);
  
  
    // if (userEmail == null) {
    //   // No session
    //   }
    // } else {
    //   const user = await getUserByEmail(userEmail);
    //   if (user == null) {
    //     return {null: null};
    //   }

    //   //get address activity using wallets
    // }
  }
  
  export default getCollectionData;
  