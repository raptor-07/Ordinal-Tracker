"use server";

import { getUserByEmail } from "@/data/user";

async function getCollectionData(
    userEmail: string | null,
    wallets: string | null
  ) {
    // console.log("__________Inside getCollectionData_____________");
    // console.log("user session", userEmail, typeof userEmail);
    // console.log(wallets, typeof wallets);
  
    let walletArr: string[] | null = null;
  
    if (wallets != null) {
      walletArr = wallets.split(',');
    }
  
    if (userEmail == null) {
      // No session
      if (walletArr != null) {
        walletArr.forEach((wallet) => {
          console.log(wallet);
        });
      }
    } else {
      const user = await getUserByEmail(userEmail);
      if (user == null) {
        return {null: null};
      }

      //get address activity using wallets
    }
  }
  
  export default getCollectionData;
  