import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";



const HomePage = () => {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchValues.searchQuery}`
        })
    }



    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-4xl font-bold tracking-tight text-orange-600">
                    Takeway Today
                </h1>
                <span className="text-xl">Food is just a click away!</span>
                <SearchBar onSubmit={handleSearchSubmit} placeHolder="Search by City or Town" searchQuery={""} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="text-3xl font-bold tracking-tighter">
                        Order takeaway even faster!
                    </span>
                    <span>
                        Download the Food App for faster ordering and persionalised
                        recommandations
                    </span>
                    <img src={appDownloadImage} />
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default HomePage;
