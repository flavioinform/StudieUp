import { useFriendInfo } from "@/hooks/use-friend-info"

interface Props{

    friendUID:string
}

const FriendEmail = ({friendUID}:Props) => {

    const{friend}=useFriendInfo(friendUID)

  return friend.displayName
}
export default FriendEmail