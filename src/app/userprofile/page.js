import { db } from "@/db";
import { auth } from "@/auth";
import ClickButton from "@/components/ClickButton";

let cityN, HobbyN;
export default async function UserProfilePage() {
    
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("You need to login");
    }
    
    const users = (await db.query(`SELECT * FROM users WHERE id=$1`,
        [userId]
    )).rows;
    
    cityN = users[0].city;
    HobbyN = users[0].hobby;

    
    async function editCity(cityNameState) {
        "use server";
        
        await db.query(`UPDATE users SET city=$1 WHERE id=$2`,
            [cityNameState,userId]
        );

    }

    async function editHobby(hobbyState) {
        "use server";
        
        await db.query(`UPDATE users SET hobby=$1 WHERE id=$2`,
            [hobbyState,userId]
        );

    }

    return (
        <>
            <div className="">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6 mt-24">Welcome {session.user.name}</h1>
                <ClickButton   buttonName="City" onClickFunction = {editCity} dataName={cityN} />
                <br />
                <ClickButton   buttonName="Hobby" onClickFunction = {editHobby} dataName={HobbyN} />
            </div >

        </>
    );
}
