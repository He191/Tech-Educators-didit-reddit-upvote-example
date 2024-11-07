import { db } from "@/db";
import { auth } from "@/auth";
import ClickButton from "@/components/ClickButton";
// adding a comment

let cityN, HobbyN;
export default async function UserProfilePage() {
    
    const session = await auth();
    
    const users = (await db.query(`SELECT * FROM users WHERE id=$1`,
        [session.user.id]
    )).rows;
    
    cityN = users[0].city;
    HobbyN = users[0].hobby;

    
    async function editCity(cityNameState) {
        "use server";
        
        await db.query(`UPDATE users SET city=$1 WHERE id=$2`,
            [cityNameState,session.user.id]
        );

    }

    async function editHobby(hobbyState) {
        "use server";
        
        await db.query(`UPDATE users SET hobby=$1 WHERE id=$2`,
            [hobbyState,session.user.id]
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
