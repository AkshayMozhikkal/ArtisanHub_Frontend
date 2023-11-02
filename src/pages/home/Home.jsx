import React, { useEffect, useState } from "react";
import { Navbarr } from "../../components/navbar/navbar";
import { Footer } from "../../components/Footer/Footer";
import { CarouselWithContent } from "../../components/Carousel/Carousel";
import { PopularArtisan } from "../../components/Cards/PopularArtisans";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import Heart from "react-heart";
import { UserPosts } from "../../components/Posts/UserPosts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { WorkBaseURL, userBaseURL } from "../../constants/constants";
import NoPropic from "../../assets/images/static/default-user-icon-8.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [artisans, setArtisans] = useState([]);

  const triggerFunction = () => setTrigger((cur) => !cur);

  //API Call to fetch Shared Posts
  const fetchWorks = async () => {
    try {
      const response = await axios.get(WorkBaseURL);
      console.log(response, "vannath");
      setWorks(response.data);
    } catch (error) {
      console.log(error, "errorrruu");
    }
  };

  //API Call to fetch Artisans data
  const artisanFetch = async () => {
    try {
      const response = await axios.get(`${userBaseURL}artisans/`);
      console.log(response, "artisanss");
      setArtisans(response.data);
    } catch (error) {
      console.log(error, "artisanfetch error");
    }
  };

  // UseEffect
  useEffect(() => {
    fetchWorks();
  }, [trigger]);

  useEffect(() => {
    artisanFetch();
  }, []);

  return (
    <div>
      <Navbarr />
      <CarouselWithContent />
      <div className="flex justify-center mb-10 ">
        <p className="text-3xl underline underline-offset-[12px]  ">
          Popular Artisans
        </p>
      </div>
      <div className="flex gap-3  p-3 shadow-2xl rounded-lg border-zinc-950 overflow-x-scroll sm:mx-20">
        {artisans.map((artisan) => {
          return (
            <div className="w-80 h-80 mb-7 hover:scale-105 transition-transform ">
              <Card className="w-64 h-80 bg-white border-2 shadow-md  shadow-blue-100 hover:bg-blue-50">
                <CardHeader floated={false} className="h-44">
                  <img
                    src={
                      artisan.profile_image ? artisan.profile_image : NoPropic
                    }
                    className="h-auto w-auto"
                    alt="profile-picture"
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {artisan.first_name} {artisan.last_name}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-bold"
                    textGradient
                  >
                    <i class="fa fa-palette text-xs">{artisan.art}</i>
                  </Typography>
                  <Button
                    className="mt-2 bg-transparent rounded-full normal-case font-normal border-2 border-blue-100 text-blue-800"
                    onClick={() => {
                      artisan.id == user.id
                        ? navigate("/profile")
                        : navigate(`/user_profile/${artisan.id}`);
                    }}
                  >
                    Profile <i class="fas fa-sharp fa-light fa-user-plus"></i>
                  </Button>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="flex-col bg-white sm:mx-20 mt-20 h-auto max-h-[700px]">
        <div className="flex justify-center items-center mt-20">
          <p className="text-2xl">Recent Posts</p>
          
        </div>
        <div className="flex-col mt-10 bg-white shadow-2xl h-[700px] mx-20 overflow-y-scroll">
          {works.map((work) => {
            return (
              <div className="mx-20 my-16 flex-col ">
                <div className="cursor-pointer text-blue-700 -mb-7 ml-10" onClick={() => {
                      work.artist.id == user.id
                        ? navigate("/profile")
                        : navigate(`/user_profile/${work.artist.id}`);
                    }}>
                  <Avatar
                    variant="circular"
                    alt="user 1"
                    className="border-2 h-8 w-8 border-white hover:z-10 focus:z-10"
                    src={work.artist.profile_image}
                  />
                  {work.artist.username}
                </div>

                <UserPosts workData={work} trig={triggerFunction} />
              </div>
            );
          })}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Home;
