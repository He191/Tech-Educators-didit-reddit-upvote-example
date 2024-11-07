"use client"
import { useState } from "react";

export default function ClickButton({ buttonName , onClickFunction , dataName }) {
    const [dataNameState, setDataNameState] = useState(dataName);
    const [isEdit, setIsEdit] = useState(1);

    function onClickFN() {
        setIsEdit(0);
    }

    function onClickSaveFN() {
        onClickFunction(dataNameState);
        setIsEdit(1);
    }

    return (
        <>
            <div className="flex flex-row justify-start items-center space-x-4">
                <label htmlFor="city" className="text-gray-700 font-medium">{buttonName}:</label>
                
                {isEdit ? (
                    <>
                        <p>{dataNameState}</p>
                        <button
                            onClick={onClickFN}
                            className="bg-gray-500 text-white font-semibold rounded-lg w-32 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150"
                        >
                            Edit
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={dataNameState}
                            onChange={(e) => setDataNameState(e.target.value)}
                            style={{ width: `${dataNameState.length+2 || 1}ch` }}
                            className="text-gray-900 px-1 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            onClick={onClickSaveFN}
                            className="bg-gray-500 text-white font-semibold rounded-lg w-32 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150"
                        >
                            Save
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
