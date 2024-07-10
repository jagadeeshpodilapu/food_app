const Footer = () => {
    return (
        <div className=" w-full bg-orange-500 py-10 flex-1  justify-between">
            <div className="container mx-auto flex flex-col  md:flex-row justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tighter">
                    FoodApp.com
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <span className="hover:text-2xl cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-2xl cursor-pointer">Terms of Service</span>
                </span> 
            </div>
        </div>
    );
};

export default Footer;
