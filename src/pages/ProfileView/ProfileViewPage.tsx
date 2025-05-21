import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import useAuth from "../../hooks/useAuth";


export function Component() {
    const { user } = useAuth();
    const { name, email, avatar, bio } = user || {};
  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-500">{email}</p>
      </CardHeader>
      <CardContent>
        <p>{bio || "No bio provided."}</p>
      </CardContent>
      {/* <CardFooter className="flex justify-end">
        <Button>Edit Profile</Button>
      </CardFooter> */}
    </Card>
  )
}

Component.displayName = "ProfileView"