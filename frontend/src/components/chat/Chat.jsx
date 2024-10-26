// import React from "react";
// import { useSelector } from "react-redux";

// const Chat = ({ chat }) => {
//   const { user } = useSelector((store) => store.user);
//   console.log("chat data",chat)

//   return (
//     <div className="p-2">
//       {user._id !== chat?.sender?._id ? (
//         <div className="flex flex-row gap-2 items-center mb-4">
//           <div className="user border-2 w-[50px] h-[50px] border-purple-900 rounded-full bg-white">
//             <img
//               src={chat?.sender?.avatar?.url}
//               className="w-full h-full object-cover rounded-full"
//               alt="User Image"
//             />
//           </div>
//           <div className="message md:max-w-[70%] max-w-[50%] bg-white p-3  rounded-md break-words">
//             <h6 className="text-violet-900 text-md">{chat?.sender?.name}</h6>
//             <p>{typeof chat?.content === 'string' ? chat.content : 'Invalid message'}</p>
//           </div>
//         </div>
//       ) : (

//         <div className="flex flex-row-reverse gap-2 items-center mb-4">
//           <div className="user border-2 w-[50px] h-[50px] border-purple-900 rounded-full bg-white">
//             <img
//               src={chat?.sender.avatar?.url}
//               className="w-full h-full object-cover rounded-full"
//               alt="User Image"
//             />
//           </div>
//           <div className="message md:max-w-[70%] max-w-[50%] bg-violet-100 p-3 rounded-md break-words text-right">
//             <h6 className="text-violet-900 text-md">{chat?.sender?.name}</h6>
//             <p>{chat?.content}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;

import React from "react";
import { useSelector } from "react-redux";

const Chat = ({ chat }) => {
  const { user } = useSelector((store) => store.user);

  // Log the chat data to understand its structure

  // Check if chat is undefined or if content is an object
  if (!chat || typeof chat !== 'object') {
    return <div className="error-message">Invalid chat data</div>; // Render an error message
  }

  const senderAvatarUrl = chat?.sender?.avatar?.url;
  const senderName = chat?.sender?.name;
  const messageContent = chat?.content;

  // Ensure the sender's avatar URL and content are valid before rendering
  return (
    <div className="p-2">
      {user._id !== chat?.sender?._id ? (
        <div className="flex flex-row gap-2 items-center mb-4">
          <div className="user border-2 w-[50px] h-[50px] border-purple-900 rounded-full bg-white">
            {senderAvatarUrl && (
              <img
                src={senderAvatarUrl}
                className="w-full h-full object-cover rounded-full"
                alt="User Image"
              />
            )}
          </div>
          <div className="message md:max-w-[70%] max-w-[50%] bg-white p-3 rounded-md break-words">
            <h6 className="text-violet-900 text-md">{senderName}</h6>
            <p>{messageContent}</p> {/* Ensure content is a string */}
          </div>
        </div>
      ) : (
        <div className="flex flex-row-reverse gap-2 items-center mb-4">
          <div className="user border-2 w-[50px] h-[50px] border-purple-900 rounded-full bg-white">
            {senderAvatarUrl && (
              <img
                src={senderAvatarUrl}
                className="w-full h-full object-cover rounded-full"
                alt="User Image"
              />
            )}
          </div>
          <div className="message md:max-w-[70%] max-w-[50%] bg-violet-100 p-3 rounded-md break-words text-right">
            <h6 className="text-violet-900 text-md">{senderName}</h6>
            <p>{messageContent}</p> {/* Ensure content is a string */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

