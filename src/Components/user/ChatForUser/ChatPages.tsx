// import { useState } from "react";
// import Chatbox from "../components/Chatbox";
// import MyChats from "../components/MyChats";
// import SideDrawer from "../components/miscellaneous/SideDrawer";
// import { Box } from "@chakra-ui/layout";
// import { User } from "../types"; // Import User type if available

// interface ChatpageProps {
//     // Define props here if needed
// }

// const Chatpage: React.FC<ChatpageProps> = () => {
//     const [fetchAgain, setFetchAgain] = useState<boolean>(false); // Specify boolean type for fetchAgain state
//     const { user } = ChatState(); // Make sure to import ChatState and define its return type

//     return (
//         <div style={{ width: "100%" }}>
//             {user && <SideDrawer />}
//             <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
//                 {user && <MyChats fetchAgain={fetchAgain} />}
//                 {user && (
//                     <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//                 )}
//             </Box>
//         </div>
//     );
// };

// export default Chatpage;