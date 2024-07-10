import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { CircleUserRound, Menu } from 'lucide-react';
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {

    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500"></Menu>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                {
                    isAuthenticated ?
                        <span className="flex items-center font-bold gap-2 hover:text-orange-500 cursor-pointer">
                            <CircleUserRound className="text-orange-500" />
                            {user?.email}
                        </span> : (<SheetTitle>
                            <span>
                                Welcome to Food App
                            </span>
                        </SheetTitle>)
                }

                <Separator />
                <SheetDescription className="flex flex-col gap-4">
                    {
                        isAuthenticated ? <MobileNavLinks /> : (<Button className="flex-1 font-bold bg-orange-500">Log In</Button>)
                    }

                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav