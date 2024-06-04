/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


function Chapter({ chapter, }: any) {
    let {  _id } = chapter;

    return (
        <>
            <div className="font-semibold">
                <h1>{chapter.title}</h1>
                <div
                    data-modal-target={`edit-chapter${_id}`}
                    data-modal-toggle={`edit-chapter${_id}`}
                    className="cursor-pointer bg-blue-400 text-center rounded-md text-white"
                >
                    Edit
                </div>
            </div>
        </>
    );
}

export default Chapter;